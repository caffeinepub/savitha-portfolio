import { Camera, Wind } from "lucide-react";
import { useRef, useState } from "react";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import { toast } from "sonner";
import { useGetProfilePhoto, useSetProfilePhoto } from "../hooks/useQueries";
import { PasswordModal } from "./PasswordModal";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/prithivi-raj-51157b393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
const INSTAGRAM_URL =
  "https://www.instagram.com/prithivishaw_3?igsh=cHZleXVuNDd5Zm9u";

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "5+", label: "Certifications" },
  { value: "1K+", label: "Followers" },
  { value: "100%", label: "Passion" },
];

const NAME_LETTERS = "PRITHIVIRAJ"
  .split("")
  .map((letter, pos) => ({ letter, id: `name-${pos}` }));

export function HomeSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"upload" | "edit" | null>(
    null,
  );
  const [localPhoto, setLocalPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: profilePhotoKey } = useGetProfilePhoto();
  const setProfilePhoto = useSetProfilePhoto();

  const displayPhoto = localPhoto ?? null;

  const triggerProtectedAction = (action: "upload" | "edit") => {
    setPendingAction(action);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    if (pendingAction === "upload" || pendingAction === "edit") {
      fileInputRef.current?.click();
    }
    setPendingAction(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    setIsUploading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.onerror = () => reject(new Error("Read failed"));
        reader.readAsDataURL(file);
      });
      setLocalPhoto(dataUrl);
      // Use dataUrl as the blob key for now (local storage approach)
      await setProfilePhoto.mutateAsync(dataUrl);
      toast.success("Profile photo updated!");
    } catch {
      toast.error("Failed to update photo.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const photoSrc =
    displayPhoto ??
    (typeof profilePhotoKey === "string" ? profilePhotoKey : null);

  return (
    <div
      data-ocid="home.section"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Glowing heading */}
      <div>
        <h1
          className="neon-pulse-purple"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            fontWeight: 700,
            margin: "0 0 0.5rem",
            lineHeight: 1.25,
          }}
        >
          Welcome to My Sky of Wings
        </h1>
        <p
          className="neon-pulse-pink"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Dream • Create • Soar
        </p>
      </div>

      {/* Profile photo with neon ring */}
      <div style={{ position: "relative", width: 200, height: 200 }}>
        {/* Outer spinning gradient ring */}
        <div
          className="profile-ring-outer"
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, #a855f7 0deg, #ec4899 120deg, #d946ef 240deg, #a855f7 360deg)",
            zIndex: 1,
          }}
        />
        {/* Inner counter-spin ring */}
        <div
          className="profile-ring-inner"
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background:
              "conic-gradient(from 180deg, rgba(168,85,247,0.4) 0deg, transparent 120deg, rgba(236,72,153,0.4) 240deg, transparent 360deg)",
            zIndex: 2,
          }}
        />
        {/* Glow halo */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            boxShadow:
              "0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.2), 0 0 90px rgba(236,72,153,0.15)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Photo container */}
        <button
          type="button"
          data-ocid="home.profile_photo.upload_button"
          onClick={() => triggerProtectedAction("upload")}
          disabled={isUploading}
          title="Click to upload profile photo"
          style={{
            position: "absolute",
            inset: 2,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(26, 0, 51, 0.8)",
            cursor: "pointer",
            background: "transparent",
            padding: 0,
            zIndex: 3,
          }}
          className="group"
        >
          {photoSrc ? (
            <img
              src={photoSrc}
              alt="PRITHIVIRAJ"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1a0033 0%, #2d0045 100%)",
              }}
            >
              <Wind
                size={40}
                color="#a855f7"
                style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.8))" }}
              />
              <span
                style={{
                  color: "rgba(168,85,247,0.5)",
                  fontSize: "0.55rem",
                  marginTop: 4,
                  letterSpacing: "0.1em",
                }}
              >
                PRITHIVIRAJ
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div
            className="opacity-0 group-hover:opacity-100"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(26, 0, 51, 0.7)",
              transition: "opacity 0.3s ease",
              borderRadius: "50%",
            }}
          >
            {isUploading ? (
              <div className="sky-spinner" />
            ) : (
              <Camera
                size={28}
                color="#a855f7"
                style={{ filter: "drop-shadow(0 0 4px rgba(168,85,247,0.8))" }}
              />
            )}
          </div>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Name */}
      <div>
        <h2
          style={{
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontWeight: 900,
            letterSpacing: "0.2em",
            margin: "0 0 0.25rem",
            display: "inline-flex",
            gap: "0.02em",
          }}
        >
          {NAME_LETTERS.map(({ letter, id }, i) => (
            <span
              key={id}
              className="float-gentle"
              style={{
                animationDelay: `${i * 100}ms`,
                display: "inline-block",
                background:
                  "linear-gradient(180deg, #d8b4fe 0%, #f9a8d4 60%, #d8b4fe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 6px rgba(168,85,247,0.5))",
              }}
            >
              {letter}
            </span>
          ))}
        </h2>
        <p
          style={{
            color: "rgba(216, 180, 254, 0.6)",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          AI & Data Science • Web Developer
        </p>
      </div>

      {/* Photo upload/edit buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          data-ocid="home.photo.upload_button"
          type="button"
          onClick={() => triggerProtectedAction("upload")}
          className="sky-button"
          style={{ fontSize: "0.82rem", padding: "0.45rem 1rem" }}
        >
          📸 Upload Photo
        </button>
        <button
          data-ocid="home.photo.edit_button"
          type="button"
          onClick={() => triggerProtectedAction("edit")}
          className="sky-button-pink"
          style={{ fontSize: "0.82rem", padding: "0.45rem 1rem" }}
        >
          ✏️ Edit Photo
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="glass-card stat-card"
            style={{
              padding: "0.8rem 1.1rem",
              textAlign: "center",
              minWidth: 90,
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #d8b4fe, #f9a8d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                color: "rgba(216, 180, 254, 0.6)",
                fontSize: "0.68rem",
                marginTop: "0.25rem",
                letterSpacing: "0.1em",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Follow Me */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            color: "rgba(216, 180, 254, 0.5)",
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Follow Me
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            data-ocid="home.linkedin.link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sky-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              fontSize: "0.85rem",
              padding: "0.6rem 1.25rem",
            }}
          >
            <SiLinkedin size={16} />
            LinkedIn
          </a>
          <a
            data-ocid="home.instagram.link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sky-button-pink"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              fontSize: "0.85rem",
              padding: "0.6rem 1.25rem",
            }}
          >
            <SiInstagram size={16} />
            Instagram
          </a>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal
          title="Upload / Edit Profile Photo"
          onSuccess={handlePasswordSuccess}
          onClose={() => {
            setShowPasswordModal(false);
            setPendingAction(null);
          }}
        />
      )}
    </div>
  );
}
