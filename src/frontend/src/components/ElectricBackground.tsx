import { useMemo } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  animation: number;
}

export function ElectricBackground() {
  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.round((i * 37 + 7) % 100),
      y: Math.round((i * 53 + 11) % 100),
      size: (i % 3) + 1,
      delay: (i * 0.4) % 4,
      duration: 2 + (i % 4) * 0.8,
      animation: (i % 4) + 1,
    }));
  }, []);

  const lightningBolts = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i * 17 + 5) % 100,
      y: (i * 23 + 8) % 100,
      delay: i * 0.9,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0, 50, 120, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 100, 200, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(0, 30, 80, 0.2) 0%, transparent 60%)",
        }}
      />

      {/* Animated arc lines across screen */}
      {([0, 1, 2, 3] as const).map((i) => (
        <div
          key={`arc-${i}`}
          className="absolute"
          style={{
            top: `${15 + i * 22}%`,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, ${0.03 + i * 0.01}) 20%, rgba(0, 212, 255, ${0.08 + i * 0.02}) 50%, rgba(0, 212, 255, ${0.03 + i * 0.01}) 80%, transparent 100%)`,
            animation: `arc-pulse ${2.5 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* Spark particles */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size + 1}px`,
            height: `${spark.size + 1}px`,
            background:
              spark.id % 3 === 0
                ? "rgba(0, 212, 255, 0.8)"
                : spark.id % 3 === 1
                  ? "rgba(0, 160, 220, 0.6)"
                  : "rgba(100, 220, 255, 0.7)",
            boxShadow: `0 0 ${spark.size * 3}px rgba(0, 212, 255, 0.8)`,
            animation: `spark-${spark.animation} ${spark.duration}s ease-in-out infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}

      {/* Lightning bolt decorations */}
      {lightningBolts.map((bolt) => (
        <div
          key={bolt.id}
          className="absolute select-none"
          style={{
            left: `${bolt.x}%`,
            top: `${bolt.y}%`,
            fontSize: "1.2rem",
            opacity: 0.15,
            color: "#00d4ff",
            filter: "blur(0.5px)",
            textShadow: "0 0 8px #00d4ff",
            animation: `lightning-flicker ${3 + bolt.delay}s ease-in-out infinite`,
            animationDelay: `${bolt.delay}s`,
          }}
        >
          ⚡
        </div>
      ))}

      {/* Corner glow accents */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 100, 200, 0.12) 0%, transparent 70%)",
          animation: "electric-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 120, 220, 0.1) 0%, transparent 70%)",
          animation: "electric-pulse 5s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
    </div>
  );
}
