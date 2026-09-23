import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  colorMix: number;
};

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return undefined;

    const section = canvas.closest<HTMLElement>('.signal-field, .particle-page-hero');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const points: Point[] = [];
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let running = false;
    let visible = false;
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerStrength = 0;
    let lastTime = performance.now();

    const buildPoints = () => {
      points.length = 0;
      const spacing = width < 640 ? 24 : 30;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let row = -1; row < rows; row += 1) {
        for (let column = -1; column < columns; column += 1) {
          const seed = Math.sin(column * 91.7 + row * 37.3) * 43758.5453;
          const random = seed - Math.floor(seed);

          if (random < 0.2) continue;

          points.push({
            x: column * spacing + (random - 0.5) * spacing * 0.5,
            y: row * spacing + (Math.sin(seed * 0.01) * 0.5) * spacing,
            size: 0.8 + random * (width < 640 ? 2.2 : 3.4),
            phase: random * Math.PI * 2,
            speed: 0.45 + random * 0.75,
            colorMix: Math.sin(seed * 0.017) * 0.5 + 0.5,
          });
        }
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildPoints();
    };

    const draw = (time: number) => {
      if (!visible) {
        running = false;
        return;
      }

      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      pointerStrength += ((pointerX > -500 ? 1 : 0) - pointerStrength) * Math.min(1, delta * 0.01);
      const bounds = section?.getBoundingClientRect();
      const scrollProgress = bounds
        ? Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)))
        : 0.5;
      const clock = reducedMotion ? 0.8 : time * 0.00045;

      context.clearRect(0, 0, width, height);

      for (const point of points) {
        const waveX = Math.sin(point.y * 0.012 + clock * point.speed * 3 + point.phase) * 11;
        const waveY = Math.cos(point.x * 0.009 - clock * point.speed * 2 + point.phase) * 8;
        const scrollBend = Math.sin(point.x * 0.006 + scrollProgress * Math.PI * 2) * 18 * (scrollProgress - 0.5);
        let x = point.x + waveX;
        let y = point.y + waveY + scrollBend;
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = Math.min(width, height) * 0.2;

        if (distance < radius && distance > 0.01) {
          const force = (1 - distance / radius) * pointerStrength;
          x += (dx / distance) * force * 48;
          y += (dy / distance) * force * 48;
        }

        const centerDistance = Math.abs(x - width * 0.5) / Math.max(1, width * 0.5);
        const alpha = 0.22 + (1 - centerDistance) * 0.58;
        const pulse = 0.72 + Math.sin(clock * 5 * point.speed + point.phase) * 0.28;
        const gold = [255, 179, 15];
        const blue = [72, 174, 232];
        const mix = point.colorMix * 0.72 + scrollProgress * 0.28;
        const red = Math.round(blue[0] + (gold[0] - blue[0]) * mix);
        const green = Math.round(blue[1] + (gold[1] - blue[1]) * mix);
        const colorBlue = Math.round(blue[2] + (gold[2] - blue[2]) * mix);

        context.beginPath();
        context.arc(x, y, point.size * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${red}, ${green}, ${colorBlue}, ${alpha * pulse})`;
        context.fill();
      }

      if (!reducedMotion) {
        frame = window.requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      start();
    };

    const handlePointerLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: '20% 0px' },
    );

    resize();
    observer.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-field-canvas" aria-hidden="true" />;
}
