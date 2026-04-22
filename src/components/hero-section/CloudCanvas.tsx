'use client';

import { useRef, useEffect } from 'react';

function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

function smoothNoise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}

function fractalNoise(x: number, octaves = 4): number {
  let v = 0,
    amp = 0.5,
    freq = 1,
    max = 0;
  for (let o = 0; o < octaves; o++) {
    v += smoothNoise(x * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return v / max;
}

interface Puff {
  ox: number;
  oy: number;
  r: number;
  phase: number;
  type: 'shadow' | 'core' | 'bright' | 'edge';
}

interface Cloud {
  x: number;
  y: number;
  scale: number;
  baseAlpha: number;
  speed: number;
  direction: 1 | -1;
  puffs: Puff[];
  seed: number;
}

function r(seed: number, n: number): number {
  return hash(seed * 137.5 + n * 31.7);
}

function buildCloud(seed: number): Puff[] {
  const puffs: Puff[] = [];

  for (let i = 0; i < 5; i++) {
    puffs.push({
      ox: (r(seed, i) - 0.5) * 1.2,
      oy: (r(seed, i + 30) - 0.5) * 0.45 + 0.15,
      r: 0.55 + r(seed, i + 60) * 0.3,
      phase: r(seed, i + 90) * 100,
      type: 'shadow',
    });
  }

  for (let i = 0; i < 6; i++) {
    puffs.push({
      ox: (r(seed, i + 200) - 0.5) * 0.9,
      oy: (r(seed, i + 230) - 0.5) * 0.38,
      r: 0.55 + r(seed, i + 260) * 0.3,
      phase: r(seed, i + 290) * 100,
      type: 'core',
    });
  }

  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2 + r(seed, i + 400) * 0.7;
    const dist = 0.5 + r(seed, i + 430) * 0.5;
    puffs.push({
      ox: Math.cos(angle) * dist,
      oy: Math.sin(angle) * dist * 0.35,
      r: 0.28 + r(seed, i + 460) * 0.22,
      phase: r(seed, i + 490) * 100,
      type: 'core',
    });
  }

  for (let i = 0; i < 16; i++) {
    const angle = r(seed, i + 600) * Math.PI * 2;
    const dist = 0.8 + r(seed, i + 630) * 0.55;
    puffs.push({
      ox: Math.cos(angle) * dist * 1.1,
      oy: Math.sin(angle) * dist * 0.35,
      r: 0.22 + r(seed, i + 660) * 0.2,
      phase: r(seed, i + 690) * 100,
      type: 'edge',
    });
  }

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 1.6 - 0.3 + r(seed, i + 800) * 0.5;
    const dist = 0.45 + r(seed, i + 830) * 0.4;
    puffs.push({
      ox: Math.cos(angle) * dist,
      oy: -Math.abs(Math.sin(angle)) * dist * 0.5,
      r: 0.18 + r(seed, i + 860) * 0.16,
      phase: r(seed, i + 890) * 100,
      type: 'bright',
    });
  }

  return puffs;
}

function drawCloud(ctx: CanvasRenderingContext2D, cloud: Cloud, t: number) {
  const S = cloud.scale;
  const a = cloud.baseAlpha;

  for (const puff of cloud.puffs) {
    if (puff.type !== 'shadow') continue;
    const morph = fractalNoise(puff.phase + t * 0.00012) * 0.15 + 0.92;
    const radius = puff.r * S * morph;
    const px =
      cloud.x + puff.ox * S + smoothNoise(puff.phase + t * 0.00006) * 4;
    const py =
      cloud.y + puff.oy * S + smoothNoise(puff.phase + 50 + t * 0.00004) * 2;

    const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
    grad.addColorStop(0, `rgba(180,190,210,${a * 0.2})`);
    grad.addColorStop(0.45, `rgba(200,210,225,${a * 0.08})`);
    grad.addColorStop(1, 'rgba(210,220,235,0)');
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  for (const puff of cloud.puffs) {
    if (puff.type !== 'edge') continue;
    const morph = fractalNoise(puff.phase + t * 0.00012) * 0.15 + 0.92;
    const radius = puff.r * S * morph;
    const px =
      cloud.x + puff.ox * S + smoothNoise(puff.phase + t * 0.00006) * 6;
    const py =
      cloud.y + puff.oy * S + smoothNoise(puff.phase + 50 + t * 0.00004) * 3;

    const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
    grad.addColorStop(0, `rgba(255,255,255,${a * 0.18})`);
    grad.addColorStop(0.5, `rgba(255,255,255,${a * 0.06})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  for (const puff of cloud.puffs) {
    if (puff.type !== 'core') continue;
    const morph = fractalNoise(puff.phase + t * 0.00012) * 0.15 + 0.92;
    const radius = puff.r * S * morph;
    const px =
      cloud.x + puff.ox * S + smoothNoise(puff.phase + t * 0.00006) * 4;
    const py =
      cloud.y + puff.oy * S + smoothNoise(puff.phase + 50 + t * 0.00004) * 2;

    const grad = ctx.createRadialGradient(
      px,
      py - radius * 0.18,
      0,
      px,
      py + radius * 0.12,
      radius,
    );
    grad.addColorStop(0, `rgba(255,255,255,${a * 0.7})`);
    grad.addColorStop(0.25, `rgba(252,253,255,${a * 0.48})`);
    grad.addColorStop(0.55, `rgba(240,246,255,${a * 0.24})`);
    grad.addColorStop(0.8, `rgba(228,238,255,${a * 0.06})`);
    grad.addColorStop(1, 'rgba(215,228,248,0)');
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  for (const puff of cloud.puffs) {
    if (puff.type !== 'bright') continue;
    const morph = fractalNoise(puff.phase + t * 0.00012) * 0.12 + 0.94;
    const radius = puff.r * S * morph;
    const px =
      cloud.x + puff.ox * S + smoothNoise(puff.phase + t * 0.00006) * 3;
    const py =
      cloud.y + puff.oy * S + smoothNoise(puff.phase + 50 + t * 0.00004) * 2;

    const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
    grad.addColorStop(0, `rgba(255,255,255,${a * 0.95})`);
    grad.addColorStop(0.45, `rgba(255,255,255,${a * 0.55})`);
    grad.addColorStop(0.8, `rgba(248,252,255,${a * 0.16})`);
    grad.addColorStop(1, 'rgba(248,252,255,0)');
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

function initClouds(W: number, H: number): Cloud[] {
  const clouds: Cloud[] = [];
  const cloudH = H * 0.6;

  const farDefs = [
    {
      xFrac: 0.1,
      yFrac: 0.08,
      scale: 85,
      alpha: 0.2,
      speed: 0.04,
      dir: 1 as const,
      seed: 1,
    },
    {
      xFrac: 0.38,
      yFrac: 0.2,
      scale: 75,
      alpha: 0.17,
      speed: 0.03,
      dir: -1 as const,
      seed: 2,
    },
    {
      xFrac: 0.65,
      yFrac: 0.04,
      scale: 90,
      alpha: 0.18,
      speed: 0.05,
      dir: 1 as const,
      seed: 3,
    },
    {
      xFrac: 0.88,
      yFrac: 0.14,
      scale: 78,
      alpha: 0.16,
      speed: 0.04,
      dir: -1 as const,
      seed: 10,
    },
  ];
  for (const d of farDefs) {
    clouds.push({
      x: d.xFrac * W,
      y: d.yFrac * cloudH,
      scale: d.scale,
      baseAlpha: d.alpha,
      speed: d.speed,
      direction: d.dir,
      puffs: buildCloud(d.seed),
      seed: d.seed,
    });
  }

  const midDefs = [
    {
      xFrac: 0.05,
      yFrac: 0.06,
      scale: 130,
      alpha: 0.28,
      speed: 0.08,
      dir: -1 as const,
      seed: 4,
    },
    {
      xFrac: 0.3,
      yFrac: 0.18,
      scale: 115,
      alpha: 0.25,
      speed: 0.06,
      dir: 1 as const,
      seed: 5,
    },
    {
      xFrac: 0.58,
      yFrac: 0.02,
      scale: 140,
      alpha: 0.26,
      speed: 0.09,
      dir: -1 as const,
      seed: 6,
    },
    {
      xFrac: 0.82,
      yFrac: 0.12,
      scale: 120,
      alpha: 0.24,
      speed: 0.07,
      dir: 1 as const,
      seed: 11,
    },
  ];
  for (const d of midDefs) {
    clouds.push({
      x: d.xFrac * W,
      y: d.yFrac * cloudH,
      scale: d.scale,
      baseAlpha: d.alpha,
      speed: d.speed,
      direction: d.dir,
      puffs: buildCloud(d.seed),
      seed: d.seed,
    });
  }

  const nearDefs = [
    {
      xFrac: 0.12,
      yFrac: 0.04,
      scale: 180,
      alpha: 0.38,
      speed: 0.13,
      dir: 1 as const,
      seed: 7,
    },
    {
      xFrac: 0.42,
      yFrac: 0.14,
      scale: 160,
      alpha: 0.34,
      speed: 0.1,
      dir: -1 as const,
      seed: 8,
    },
    {
      xFrac: 0.72,
      yFrac: 0.0,
      scale: 195,
      alpha: 0.36,
      speed: 0.14,
      dir: 1 as const,
      seed: 9,
    },
    {
      xFrac: 0.92,
      yFrac: 0.1,
      scale: 170,
      alpha: 0.32,
      speed: 0.11,
      dir: -1 as const,
      seed: 12,
    },
  ];
  for (const d of nearDefs) {
    clouds.push({
      x: d.xFrac * W,
      y: d.yFrac * cloudH,
      scale: d.scale,
      baseAlpha: d.alpha,
      speed: d.speed,
      direction: d.dir,
      puffs: buildCloud(d.seed),
      seed: d.seed,
    });
  }

  return clouds;
}

export default function CloudCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = (t: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      const margin = 900;

      ctx.clearRect(0, 0, W, H);

      for (const cloud of cloudsRef.current) {
        cloud.x += cloud.speed * cloud.direction;
        if (cloud.direction === 1 && cloud.x - margin > W) cloud.x = -margin;
        else if (cloud.direction === -1 && cloud.x + margin < 0)
          cloud.x = W + margin;
        drawCloud(ctx, cloud, t);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const W = rect?.width ?? window.innerWidth;
      const H = rect?.height ?? 500;
      canvas.width = W;
      canvas.height = H;
      cloudsRef.current = initClouds(W, H);
    };

    resize();
    rafRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        className ?? 'absolute inset-0 w-full h-full pointer-events-none z-[1]'
      }
    />
  );
}
