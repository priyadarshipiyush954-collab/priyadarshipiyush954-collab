import React, { useRef, useEffect } from 'react';

interface Pixel {
  x: number;
  y: number;
  cx: number;
  cy: number;
  startX: number;
  startY: number;
  color: string;
  size: number;
  delay: number;
}

const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

export const PixelAvatar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const stateRef = useRef<'assembling' | 'assembled' | 'scattering' | 'reassembling'>('assembling');
  const hoverStartTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = '/assets/avatar.jpg';

    img.onload = () => {
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const SIZE = 200;
      offCanvas.width = SIZE;
      offCanvas.height = SIZE;

      // Scale to cover
      const scale = Math.max(SIZE / img.width, SIZE / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const dx = (SIZE - w) / 2;
      const dy = (SIZE - h) / 2;

      offCtx.drawImage(img, dx, dy, w, h);
      const imgData = offCtx.getImageData(0, 0, SIZE, SIZE).data;

      const pixels: Pixel[] = [];
      const PIXEL_SIZE = 4;

      for (let y = 0; y < SIZE; y += PIXEL_SIZE) {
        for (let x = 0; x < SIZE; x += PIXEL_SIZE) {
          const cx = x + PIXEL_SIZE / 2;
          const cy = y + PIXEL_SIZE / 2;
          const dist = Math.sqrt((cx - SIZE / 2) ** 2 + (cy - SIZE / 2) ** 2);

          // Only keep pixels inside a circular area
          if (dist > SIZE / 2) continue;

          const i = (y * SIZE + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          if (a > 0) {
            const angle = Math.random() * Math.PI * 2;
            const distance = SIZE + Math.random() * SIZE;
            const startX = SIZE / 2 + Math.cos(angle) * distance;
            const startY = SIZE / 2 + Math.sin(angle) * distance;

            pixels.push({
              x, y,
              cx: startX, cy: startY,
              startX, startY,
              color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
              size: PIXEL_SIZE,
              delay: Math.random() * 800, // random delays up to 800ms
            });
          }
        }
      }

      pixelsRef.current = pixels;
      startTimeRef.current = performance.now();
      stateRef.current = 'assembling';

      const render = (time: number) => {
        ctx.clearRect(0, 0, SIZE, SIZE);
        let allFinished = true;

        if (stateRef.current === 'assembling') {
          const elapsed = time - startTimeRef.current;
          const DURATION = 1500;

          pixelsRef.current.forEach(p => {
            if (elapsed < p.delay) {
              allFinished = false;
              p.cx = p.startX;
              p.cy = p.startY;
            } else {
              const progress = Math.min((elapsed - p.delay) / DURATION, 1);
              if (progress < 1) allFinished = false;
              const eased = easeOutCubic(progress);
              p.cx = p.startX + (p.x - p.startX) * eased;
              p.cy = p.startY + (p.y - p.startY) * eased;
            }

            ctx.fillStyle = p.color;
            if (elapsed > p.delay && elapsed < p.delay + DURATION) {
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 5;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillRect(p.cx, p.cy, p.size, p.size);
          });

          if (allFinished) stateRef.current = 'assembled';
          
        } else if (stateRef.current === 'assembled') {
          pixelsRef.current.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 0;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          });
          
        } else if (stateRef.current === 'scattering') {
          const elapsed = time - hoverStartTimeRef.current;
          const DURATION = 300;

          pixelsRef.current.forEach(p => {
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = easeOutCubic(progress);
            p.cx = p.x + (p.startX - p.x) * eased;
            p.cy = p.y + (p.startY - p.y) * eased;

            ctx.fillStyle = p.color;
            ctx.fillRect(p.cx, p.cy, p.size, p.size);
          });

          if (elapsed >= DURATION) {
            stateRef.current = 'reassembling';
            hoverStartTimeRef.current = time;
            pixelsRef.current.forEach(p => {
              p.startX = p.cx;
              p.startY = p.cy;
            });
          }
          
        } else if (stateRef.current === 'reassembling') {
          const elapsed = time - hoverStartTimeRef.current;
          const DURATION = 800;

          pixelsRef.current.forEach(p => {
            const progress = Math.min(elapsed / DURATION, 1);
            if (progress < 1) allFinished = false;
            const eased = easeOutCubic(progress);

            p.cx = p.startX + (p.x - p.startX) * eased;
            p.cy = p.startY + (p.y - p.startY) * eased;

            ctx.fillStyle = p.color;
            ctx.fillRect(p.cx, p.cy, p.size, p.size);
          });

          if (allFinished) stateRef.current = 'assembled';
        }

        animRef.current = requestAnimationFrame(render);
      };

      animRef.current = requestAnimationFrame(render);
    };

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (stateRef.current === 'assembled') {
      stateRef.current = 'scattering';
      hoverStartTimeRef.current = performance.now();
      pixelsRef.current.forEach(p => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 30; // scatter distance
        p.startX = p.x + Math.cos(angle) * distance;
        p.startY = p.y + Math.sin(angle) * distance;
      });
    }
  };

  return (
    <div className={`relative w-[200px] h-[200px] rounded-full p-2 group ${className}`}>
      {/* Neon glowing circular border */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.5)] animate-pulse pointer-events-none" />
      
      {/* Canvas container with drop-shadow effect */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden bg-slate-900/60 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] cursor-pointer"
        onMouseEnter={handleMouseEnter}
      >
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
};
