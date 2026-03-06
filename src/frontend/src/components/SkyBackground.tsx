import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  swayDuration: number;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export function SkyBackground() {
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 8,
      size: 8 + Math.random() * 8,
      swayDuration: 2 + Math.random() * 3,
    })),
  );

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      color:
        i % 3 === 0
          ? "rgba(168, 85, 247, 0.7)"
          : i % 3 === 1
            ? "rgba(236, 72, 153, 0.7)"
            : "rgba(255, 255, 255, 0.5)",
    })),
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Gradient sky mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 10%, rgba(236, 72, 153, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, rgba(217, 70, 239, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Cherry blossom petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `-${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
          }}
        >
          <div
            className="petal-inner"
            style={{
              width: "100%",
              height: "100%",
              animationDuration: `${petal.swayDuration}s`,
            }}
          />
        </div>
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
