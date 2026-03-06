import { Lock, X } from "lucide-react";
import { useState } from "react";

const CORRECT_PASSWORD = "SNOWBEE";

interface PasswordModalProps {
  onSuccess: () => void;
  onClose: () => void;
  title?: string;
}

export function PasswordModal({
  onSuccess,
  onClose,
  title = "Protected Action",
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: custom styled modal overlay requires div wrapper
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        data-ocid="password.modal"
        style={{
          background: "rgba(26, 0, 51, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: "20px",
          padding: "2rem",
          width: "100%",
          maxWidth: "380px",
          boxShadow:
            "0 0 40px rgba(168, 85, 247, 0.3), 0 20px 60px rgba(0,0,0,0.6)",
          transform: shake ? "translateX(0)" : undefined,
          animation: shake ? "shake 0.4s ease" : undefined,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(168, 85, 247, 0.2)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lock size={16} color="#a855f7" />
            </div>
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.7rem",
                  margin: 0,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Authentication Required
              </p>
              <h3
                style={{
                  color: "#d8b4fe",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  margin: 0,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            data-ocid="password.close_button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
              transition: "all 0.2s ease",
            }}
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="modal-password"
              style={{
                display: "block",
                color: "rgba(216, 180, 254, 0.8)",
                fontSize: "0.8rem",
                marginBottom: "0.5rem",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Enter Password
            </label>
            <input
              id="modal-password"
              data-ocid="password.input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.06)",
                border: error
                  ? "1px solid rgba(239, 68, 68, 0.6)"
                  : "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "1rem",
                fontFamily: "Outfit, sans-serif",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
                letterSpacing: "0.2em",
              }}
            />
            {error && (
              <p
                data-ocid="password.error_state"
                style={{
                  color: "#f87171",
                  fontSize: "0.78rem",
                  marginTop: "0.4rem",
                  margin: "0.4rem 0 0",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            data-ocid="password.confirm_button"
            type="submit"
            className="sky-button"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            🔓 Unlock
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
