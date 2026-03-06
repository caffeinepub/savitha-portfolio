import { Sparkles, Wind } from "lucide-react";
import { useState } from "react";
import { useRecordVisitor } from "../hooks/useQueries";
import { SkyBackground } from "./SkyBackground";

interface LandingPageProps {
  onUsernameSubmit: (username: string) => void;
}

export function LandingPage({ onUsernameSubmit }: LandingPageProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const recordVisitor = useRecordVisitor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter your name to continue");
      return;
    }
    localStorage.setItem("sky_portfolio_username", trimmed);
    try {
      await recordVisitor.mutateAsync(trimmed);
    } catch {
      // Non-blocking: continue even if recording fails
    }
    onUsernameSubmit(trimmed);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1a0033 0%, #2d0045 40%, #1f003a 70%, #3d0030 100%)",
        zIndex: 200,
        padding: "1rem",
      }}
    >
      <SkyBackground />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "440px",
          textAlign: "center",
        }}
      >
        {/* Wing logo */}
        <div className="float-gentle" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              boxShadow:
                "0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)",
              margin: "0 auto",
            }}
          >
            <Wind
              size={36}
              color="#a855f7"
              style={{ filter: "drop-shadow(0 0 10px rgba(168,85,247,0.8))" }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className="neon-pulse-purple"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
            fontWeight: 700,
            margin: "0 0 0.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          My Sky of Wings
        </h1>

        <p
          className="neon-pulse-pink"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1rem",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          Dream • Create • Soar
        </p>

        {/* Card */}
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles
              size={16}
              color="#ec4899"
              style={{ filter: "drop-shadow(0 0 4px rgba(236,72,153,0.6))" }}
            />
            <h2
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "1rem",
                fontWeight: 600,
                margin: 0,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Welcome, Traveller
            </h2>
          </div>

          <p
            style={{
              color: "rgba(216, 180, 254, 0.7)",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
              fontFamily: "Outfit, sans-serif",
              lineHeight: 1.6,
            }}
          >
            Enter your name to step into the sky
          </p>

          <form onSubmit={handleSubmit}>
            <input
              data-ocid="landing.input"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Your name..."
              className="glass-input"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                fontSize: "1rem",
                fontFamily: "Outfit, sans-serif",
                marginBottom: "0.75rem",
                boxSizing: "border-box",
              }}
            />

            {error && (
              <p
                data-ocid="landing.error_state"
                style={{
                  color: "#f87171",
                  fontSize: "0.8rem",
                  marginBottom: "0.75rem",
                  fontFamily: "Outfit, sans-serif",
                  margin: "0 0 0.75rem",
                }}
              >
                {error}
              </p>
            )}

            <button
              data-ocid="landing.submit_button"
              type="submit"
              disabled={recordVisitor.isPending}
              className="sky-button"
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {recordVisitor.isPending ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="sky-spinner"
                    style={{ width: 16, height: 16, borderWidth: 2 }}
                  />
                  Entering...
                </span>
              ) : (
                "✦ Enter the Sky ✦"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p
          style={{
            color: "rgba(168, 85, 247, 0.4)",
            fontSize: "0.72rem",
            marginTop: "1.5rem",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Portfolio of PRITHIVIRAJ R
        </p>
      </div>
    </div>
  );
}
