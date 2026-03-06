import { RefreshCw, User } from "lucide-react";
import { useGetVisitors } from "../hooks/useQueries";

export function AdminSection() {
  const {
    data: visitors = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetVisitors();

  return (
    <section
      data-ocid="admin.section"
      className="glass-card glow-card-pulse"
      style={{ padding: "2rem", width: "100%", color: "#fff" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <h2
            className="neon-pulse-purple"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              margin: "0 0 0.2rem",
            }}
          >
            Admin Panel
          </h2>
          <p
            style={{
              color: "rgba(216, 180, 254, 0.5)",
              fontSize: "0.78rem",
              margin: 0,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Visitors who have accessed this portfolio
          </p>
        </div>
        <button
          data-ocid="admin.refresh_button"
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="sky-button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
          }}
        >
          <RefreshCw
            size={13}
            style={{
              animation: isFetching ? "spin 0.8s linear infinite" : "none",
            }}
          />
          Refresh
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.5), transparent)",
          marginBottom: "1.25rem",
        }}
      />

      {/* Count badge */}
      <div style={{ marginBottom: "1.25rem" }}>
        <span
          style={{
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "999px",
            padding: "0.3rem 0.85rem",
            color: "#d8b4fe",
            fontSize: "0.82rem",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {visitors.length} {visitors.length === 1 ? "visitor" : "visitors"}{" "}
          total
        </span>
      </div>

      {isLoading ? (
        <div
          data-ocid="admin.loading_state"
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: 48,
                borderRadius: 12,
                background: "rgba(168,85,247,0.07)",
              }}
            />
          ))}
        </div>
      ) : visitors.length === 0 ? (
        <div
          data-ocid="admin.empty_state"
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "rgba(216, 180, 254, 0.4)",
            fontFamily: "Outfit, sans-serif",
            fontSize: "0.9rem",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>👁️</div>
          <p style={{ margin: 0 }}>No visitors yet. Be the first!</p>
        </div>
      ) : (
        <div
          data-ocid="admin.list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            maxHeight: "320px",
            overflowY: "auto",
            paddingRight: "0.25rem",
          }}
        >
          {visitors.map((username: string, idx: number) => (
            <div
              key={`visitor-${username}`}
              data-ocid={`admin.item.${idx + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                background: "rgba(168, 85, 247, 0.08)",
                border: "1px solid rgba(168, 85, 247, 0.18)",
                borderRadius: "12px",
                padding: "0.65rem 1rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(168, 85, 247, 0.14)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(168, 85, 247, 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(168, 85, 247, 0.08)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(168, 85, 247, 0.18)";
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(168, 85, 247, 0.2)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={14} color="#a855f7" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: "#e9d5ff",
                    fontSize: "0.9rem",
                    margin: 0,
                    fontFamily: "Outfit, sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {username}
                </p>
              </div>

              <span
                style={{
                  color: "rgba(216, 180, 254, 0.4)",
                  fontSize: "0.7rem",
                  fontFamily: "Outfit, sans-serif",
                  flexShrink: 0,
                }}
              >
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
