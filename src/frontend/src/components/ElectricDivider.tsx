interface ElectricDividerProps {
  className?: string;
}

export function ElectricDivider({ className = "" }: ElectricDividerProps) {
  return (
    <div className={`relative flex items-center py-2 ${className}`}>
      {/* Left spark dot */}
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: "#00d4ff",
          boxShadow: "0 0 6px #00d4ff, 0 0 12px rgba(0, 212, 255, 0.5)",
        }}
      />
      {/* Arc line */}
      <div className="electric-divider flex-1 mx-2" />
      {/* Right spark dot */}
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: "#00d4ff",
          boxShadow: "0 0 6px #00d4ff, 0 0 12px rgba(0, 212, 255, 0.5)",
        }}
      />
    </div>
  );
}
