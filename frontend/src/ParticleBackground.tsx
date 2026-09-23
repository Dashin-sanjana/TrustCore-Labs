import { useEffect, useRef } from 'react';

const particleImageUrl = '/hero.png';

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageSize;
  uniform vec2 u_imageCenter;
  uniform vec2 u_mouse;
  uniform float u_displayScale;
  uniform float u_spacing;
  uniform float u_mouseStrength;

  void main() {
    vec2 screenPosition = gl_FragCoord.xy;
    vec2 fromMouse = screenPosition - u_mouse;
    float mouseDistance = length(fromMouse);
    float mouseRadius = min(u_resolution.x, u_resolution.y) * 0.15;
    float influence = (1.0 - smoothstep(0.0, mouseRadius, mouseDistance)) * u_mouseStrength;
    vec2 direction = fromMouse / max(mouseDistance, 0.001);
    vec2 warpedPosition = screenPosition - direction * influence * mouseRadius * 0.3;
    vec2 cellCenter = (floor(warpedPosition / u_spacing) + 0.5) * u_spacing;
    float distanceFromCenter = length(warpedPosition - cellCenter);
    float particleShape = 1.0 - smoothstep(u_spacing * 0.2, u_spacing * 0.42, distanceFromCenter);

    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageSize.x / u_imageSize.y;
    vec2 displaySize;

    if (screenAspect > imageAspect) {
      displaySize = vec2(u_displayScale * imageAspect / screenAspect, u_displayScale);
    } else {
      displaySize = vec2(u_displayScale, u_displayScale * screenAspect / imageAspect);
    }

    vec2 displayOrigin = u_imageCenter - displaySize * 0.5;
    vec2 imageUv = (cellCenter / u_resolution - displayOrigin) / displaySize;
    float insideImage =
      step(0.0, imageUv.x) * step(imageUv.x, 1.0) *
      step(0.0, imageUv.y) * step(imageUv.y, 1.0);
    vec3 sourceColor = texture2D(u_image, imageUv).rgb;
    float luminance = dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));
    float imageMask = (1.0 - smoothstep(0.48, 0.8, luminance)) * insideImage;

    vec3 graphite = vec3(0.34, 0.39, 0.42);
    vec3 silver = vec3(0.72, 0.76, 0.78);
    vec3 particleColor = mix(graphite, silver, smoothstep(0.16, 0.72, luminance));
    float opacity = particleShape * imageMask * (0.56 + (1.0 - luminance) * 0.42);

    gl_FragColor = vec4(particleColor * opacity, opacity);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Particle shader compilation failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();

  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Particle shader linking failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

type ParticleBackgroundProps = {
  className?: string;
};

export function ParticleBackground({ className = '' }: ParticleBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!canvas || !gl) {
      canvas?.classList.add('particle-background--fallback');
      return undefined;
    }

    const program = createProgram(gl);

    if (!program) {
      canvas.classList.add('particle-background--fallback');
      return undefined;
    }

    const positionBuffer = gl.createBuffer();
    const texture = gl.createTexture();

    if (!positionBuffer || !texture) {
      canvas.classList.add('particle-background--fallback');
      return undefined;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const imageSizeLocation = gl.getUniformLocation(program, 'u_imageSize');
    const imageCenterLocation = gl.getUniformLocation(program, 'u_imageCenter');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const displayScaleLocation = gl.getUniformLocation(program, 'u_displayScale');
    const spacingLocation = gl.getUniformLocation(program, 'u_spacing');
    const strengthLocation = gl.getUniformLocation(program, 'u_mouseStrength');
    const imageLocation = gl.getUniformLocation(program, 'u_image');
    const image = new Image();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pixelRatio = 1;
    let spacing = 4;
    let displayScale = 0.94;
    let imageCenterX = 0.72;
    let imageCenterY = 0.5;
    let viewportWidth = 1;
    let viewportHeight = 1;
    let animationFrame = 0;
    let resizeTimer = 0;
    let textureReady = false;
    let currentMouseX = -10_000;
    let currentMouseY = -10_000;
    let targetMouseX = -10_000;
    let targetMouseY = -10_000;
    let interactionStrength = 0;
    let pointerActive = false;
    let running = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      viewportWidth = Math.max(1, Math.round(bounds.width));
      viewportHeight = Math.max(1, Math.round(bounds.height));

      const isPortrait = viewportHeight > viewportWidth;
      const isShortLandscape = !isPortrait && viewportHeight <= 520;

      pixelRatio = Math.min(window.devicePixelRatio || 1, viewportWidth <= 720 ? 1.25 : 1.5);

      if (viewportWidth <= 360 && isPortrait) {
        spacing = 5;
        displayScale = 1.7;
        imageCenterX = 0.76;
        imageCenterY = 0.43;
      } else if (viewportWidth <= 480 && isPortrait) {
        spacing = 5;
        displayScale = 1.55;
        imageCenterX = 0.76;
        imageCenterY = 0.44;
      } else if (viewportWidth <= 720 && isPortrait) {
        spacing = 4.75;
        displayScale = 0.96;
        imageCenterX = 0.75;
        imageCenterY = 0.44;
      } else if (isShortLandscape) {
        spacing = 5.5;
        displayScale = 0.82;
        imageCenterX = 0.76;
        imageCenterY = 0.52;
      } else if (viewportWidth <= 980) {
        spacing = 4.5;
        displayScale = 0.9;
        imageCenterX = 0.7;
        imageCenterY = 0.46;
      } else {
        spacing = 3;
        displayScale = 0.94;
        imageCenterX = 0.72;
        imageCenterY = 0.5;
      }

      canvas.width = Math.round(viewportWidth * pixelRatio);
      canvas.height = Math.round(viewportHeight * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      if (!textureReady) {
        running = false;
        return;
      }

      if (reducedMotion) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
        interactionStrength = pointerActive ? 0.72 : 0;
      } else {
        currentMouseX += (targetMouseX - currentMouseX) * 0.22;
        currentMouseY += (targetMouseY - currentMouseY) * 0.22;
        interactionStrength += ((pointerActive ? 1 : 0) - interactionStrength) * 0.2;
      }


      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(imageSizeLocation, image.naturalWidth, image.naturalHeight);
      gl.uniform2f(imageCenterLocation, imageCenterX, imageCenterY);
      gl.uniform2f(mouseLocation, currentMouseX * pixelRatio, (viewportHeight - currentMouseY) * pixelRatio);
      gl.uniform1f(displayScaleLocation, displayScale);
      gl.uniform1f(spacingLocation, spacing * pixelRatio);
      gl.uniform1f(strengthLocation, interactionStrength);
      gl.uniform1i(imageLocation, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      const mouseStillMoving =
        Math.abs(targetMouseX - currentMouseX) > 0.1 || Math.abs(targetMouseY - currentMouseY) > 0.1;
      const strengthStillChanging = Math.abs((pointerActive ? 1 : 0) - interactionStrength) > 0.002;

      if (!document.hidden && !reducedMotion && (mouseStillMoving || strengthStillChanging)) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const requestRender = () => {
      if (running || document.hidden) return;
      running = true;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetMouseX = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
      targetMouseY = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
      pointerActive = true;

      if (currentMouseX < -1_000 || reducedMotion) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
      }

      requestRender();
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      requestRender();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        pointerActive = false;
        requestRender();
      }
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        requestRender();
      }, 160);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        running = false;
      } else {
        requestRender();
      }
    };

    const handleImageLoad = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      textureReady = true;
      resize();
      requestRender();
    };

    const handleImageError = () => canvas.classList.add('particle-background--fallback');

    resize();
    image.addEventListener('load', handleImageLoad);
    image.addEventListener('error', handleImageError);
    image.src = particleImageUrl;

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerEnd, { passive: true });
    window.addEventListener('pointercancel', handlePointerEnd, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimer);
      image.removeEventListener('load', handleImageLoad);
      image.removeEventListener('error', handleImageError);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas className={`particle-background ${className}`.trim()} ref={canvasRef} aria-hidden="true" />;
}
