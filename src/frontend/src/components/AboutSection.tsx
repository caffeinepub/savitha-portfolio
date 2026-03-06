import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAbout, useUpdateAbout } from "../hooks/useQueries";
import { PasswordModal } from "./PasswordModal";

const DEFAULT_ABOUT =
  "PRITHIVIRAJ R is an enthusiastic and forward-thinking B.Tech student specializing in Artificial Intelligence and Data Science (2024–2025) at Priyadarshini Engineering College. He is deeply passionate about technology and constantly explores new innovations in the fields of Artificial Intelligence, Web Development, and Animation. His academic journey reflects his curiosity and determination to understand how intelligent systems and modern web technologies can shape the future of the digital world. From the beginning of his college life, he has shown a strong interest in building websites, designing user-friendly interfaces, and learning how frontend and backend systems work together. He enjoys creating visually attractive and technically strong projects that combine creativity with logic. Along with web development, he is also interested in animation and digital creativity, where he aims to bring ideas to life through motion and design. As a student of Artificial Intelligence and Data Science, he is actively learning various AI tools, modern programming concepts, and emerging technologies that are transforming industries worldwide. He believes that continuous learning is the key to success in the technology field. By exploring AI tools, development frameworks, and new software platforms, he is preparing himself to become a skilled and future-ready technology professional. His dream is to become a highly skilled Web Developer and Creative Technologist, capable of building innovative, smart, and impactful digital solutions. He aims to develop projects that are not only technically strong but also meaningful and useful for society. He is motivated to improve his problem-solving skills, creativity, and technical expertise every day.";

export function AboutSection() {
  const { data: backendAbout, isLoading } = useGetAbout();
  const updateAbout = useUpdateAbout();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [localText, setLocalText] = useState<string | null>(null);

  const displayText =
    localText ?? (backendAbout?.trim() ? backendAbout : DEFAULT_ABOUT);

  const handleEditClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setEditText(displayText);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      toast.error("About text cannot be empty.");
      return;
    }
    setLocalText(trimmed);
    setIsEditing(false);
    updateAbout.mutate(trimmed, {
      onSuccess: () => toast.success("About Me saved!"),
      onError: () => toast.error("Failed to save. Please try again."),
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section
      data-ocid="about.section"
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
        <h2
          className="neon-pulse-purple"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          About Me
        </h2>

        {!isEditing && (
          <button
            type="button"
            data-ocid="about.edit_button"
            onClick={handleEditClick}
            className="sky-button"
            style={{
              fontSize: "0.78rem",
              padding: "0.35rem 0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Pencil size={12} />
            Edit
          </button>
        )}

        {isEditing && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              data-ocid="about.save_button"
              onClick={handleSave}
              disabled={updateAbout.isPending}
              className="sky-button"
              style={{
                fontSize: "0.78rem",
                padding: "0.35rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {updateAbout.isPending ? (
                <span
                  className="sky-spinner"
                  style={{ width: 12, height: 12 }}
                />
              ) : (
                <Check size={12} />
              )}
              Save
            </button>
            <button
              type="button"
              data-ocid="about.cancel_button"
              onClick={handleCancel}
              className="sky-button-pink"
              style={{
                fontSize: "0.78rem",
                padding: "0.35rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <X size={12} />
              Cancel
            </button>
          </div>
        )}
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

      {/* Content */}
      {isLoading ? (
        <div
          data-ocid="about.loading_state"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {[100, 95, 88, 92, 80].map((w) => (
            <div
              key={`skeleton-${w}`}
              style={{
                height: 14,
                width: `${w}%`,
                borderRadius: 6,
                background: "rgba(168,85,247,0.1)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : isEditing ? (
        <textarea
          data-ocid="about.textarea"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          rows={8}
          className="glass-input"
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            borderRadius: "12px",
            fontSize: "0.87rem",
            lineHeight: 1.75,
            resize: "vertical",
            fontFamily: "Outfit, sans-serif",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <p
          style={{
            color: "rgba(240, 220, 255, 0.9)",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            margin: 0,
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {displayText}
        </p>
      )}

      {showPasswordModal && (
        <PasswordModal
          title="Edit About Me"
          onSuccess={handlePasswordSuccess}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </section>
  );
}
