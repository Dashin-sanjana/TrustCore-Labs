import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Dot = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  depth: number;
  velocityX: number;
  velocityY: number;
  phase: number;
  pulseSpeed: number;
  accent: boolean;
  glow: boolean;
};

const fract = (value: number) => value - Math.floor(value);
const random = (seed: number) => fract(Math.sin(seed * 78.233) * 43758.5453);

export function BoonDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const firstSection = document.querySelector<HTMLElement>('.delivery-core')
      ?? document.querySelector<HTMLElement>('.page-main');
    const lastSection = document.querySelector<HTMLElement>('.delivery-core')
      ?? document.querySelector<HTMLElement>('.page-main');

    if (!canvas || !context || !firstSection || !lastSection) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const debugDots = false;
    const dots: Dot[] = [];
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let running = false;
    let active = false;
    let elapsed = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const buildDots = () => {
      dots.length = 0;
      const count = debugDots ? 100 : width < 640 ? 78 : width < 1024 ? 145 : 260;

      for (let index = 0; index < count; index += 1) {
        const layerSeed = random(index + 13);
        const depth = layerSeed < 0.56 ? 0.25 : layerSeed < 0.9 ? 0.58 : 1;
        const glow = random(index + 179) > 0.972;

        dots.push({
          x: random(index + 29) * width,
          y: random(index + 53) * height,
          size: debugDots ? 4 : 0.55 + random(index + 79) * (0.8 + depth * 1.65) + (glow ? 0.65 : 0),
          opacity: debugDots ? 1 : 0.13 + random(index + 101) * (0.22 + depth * 0.38),
          depth,
          velocityX: (random(index + 127) - 0.5) * (0.8 + depth * 1.1),
          velocityY: (random(index + 151) - 0.5) * (0.65 + depth * 0.9),
          phase: random(index + 197) * Math.PI * 2,
          pulseSpeed: 0.16 + random(index + 223) * 0.34,
          accent: random(index + 251) > (depth > 0.8 ? 0.78 : 0.91),
          glow,
        });
      }
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };

    const updateActiveRange = () => {
      const firstBounds = firstSection.getBoundingClientRect();
      const lastBounds = lastSection.getBoundingClientRect();
      const visibleBoundary = Math.max(0, Math.min(height, lastBounds.bottom));
      canvas.style.clipPath = `inset(0 0 ${Math.max(0, height - visibleBoundary)}px 0)`;
      active = firstBounds.top < height && lastBounds.bottom > 0;
      canvas.classList.toggle('is-active', active);

      const nextScrollY = window.scrollY;
      scrollVelocity += ((nextScrollY - lastScrollY) - scrollVelocity) * 0.18;
      lastScrollY = nextScrollY;
      if (active && !document.hidden) start();
    };

    const getSurfaceTone = () => {
      const center = document.elementFromPoint(width * 0.5, height * 0.5) as HTMLElement | null;
      return Boolean(center?.closest('.home-work, .home-final-cta, .metric-strip'));
    };

    const draw = (time: number) => {
      if (!active || document.hidden) {
        running = false;
        return;
      }

      const delta = Math.min(0.04, (time - lastTime) / 1000);
      lastTime = time;
      if (!reducedMotion.matches) elapsed += delta;
      scrollVelocity *= 0.91;
      pointerX += (pointerTargetX - pointerX) * 0.04;
      pointerY += (pointerTargetY - pointerY) * 0.04;
      const lightSurface = getSurfaceTone();

      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const pulse = reducedMotion.matches ? 0 : Math.sin(elapsed * dot.pulseSpeed + dot.phase);
        const driftX = reducedMotion.matches ? 0 : dot.velocityX * elapsed * 3.2;
        const driftY = reducedMotion.matches ? 0 : dot.velocityY * elapsed * 2.7;
        const scrollOffset = scrollVelocity * dot.depth * 0.48;
        dot.y += scrollOffset;

        const x = (dot.x + driftX - pointerX * dot.depth * 8 + width * 3) % width;
        const y = (dot.y + driftY - pointerY * dot.depth * 6 + height * 3) % height;
        const alpha = dot.opacity * (0.86 + pulse * 0.14);
        const radius = dot.size * (0.96 + pulse * 0.04);

        if (dot.glow && !debugDots) {
          const glow = context.createRadialGradient(x, y, 0, x, y, radius * 5);
          const glowColor = dot.accent ? '255, 179, 15' : lightSurface ? '8, 25, 39' : '232, 240, 244';
          glow.addColorStop(0, `rgba(${glowColor}, ${alpha * 0.32})`);
          glow.addColorStop(1, `rgba(${glowColor}, 0)`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, radius * 5, 0, Math.PI * 2);
          context.fill();
        }

        const baseColor = debugDots
          ? '255, 255, 255'
          : dot.accent
            ? '255, 179, 15'
            : lightSurface
              ? '8, 25, 39'
              : '226, 235, 240';
        context.fillStyle = `rgba(${baseColor}, ${alpha})`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion.matches) {
        frame = window.requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    function start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(draw);
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (width < 768) return;
      pointerTargetX = (event.clientX / width - 0.5) * 2;
      pointerTargetY = (event.clientY / height - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        running = false;
      } else {
        updateActiveRange();
      }
    };

    const handleMotionChange = () => start();

    resize();
    updateActiveRange();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateActiveRange, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateActiveRange);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return createPortal(
    <canvas ref={canvasRef} className="boon-dot-field" aria-hidden="true" />,
    document.body,
  );
}
