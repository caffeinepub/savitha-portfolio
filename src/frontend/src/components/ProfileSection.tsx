import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useFileUpload } from "../hooks/useFileUpload";
import { useSetProfilePhoto } from "../hooks/useQueries";

interface ProfileSectionProps {
  profilePhotoUrl: string;
  onPhotoUpdate?: (url: string) => void;
}

export function ProfileSection({
  profilePhotoUrl,
  onPhotoUpdate,
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPhoto, setLocalPhoto] = useState<string>(profilePhotoUrl);
  const { uploadAsDataUrl, isUploading } = useFileUpload();
  const setProfilePhoto = useSetProfilePhoto();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const dataUrl = await uploadAsDataUrl(file);
    if (dataUrl) {
      setLocalPhoto(dataUrl);
      onPhotoUpdate?.(dataUrl);
      setProfilePhoto.mutate(dataUrl, {
        onSuccess: () => toast.success("Profile photo updated!"),
        onError: () => toast.error("Failed to save photo to backend."),
      });
    }
  };

  const photoSrc = localPhoto || profilePhotoUrl;

  return (
    <div className="flex flex-col items-center" style={{ gap: "1.25rem" }}>
      {/* Profile photo with electric ring */}
      <div
        style={{
          position: "relative",
          width: "140px",
          height: "140px",
          flexShrink: 0,
        }}
      >
        {/* Spinning outer ring */}
        <div
          className="ring-spin"
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0, 212, 255, 0.9) 60deg, rgba(0, 212, 255, 0.2) 120deg, transparent 180deg, rgba(0, 212, 255, 0.7) 240deg, transparent 360deg)",
          }}
        />
        {/* Glow halo */}
        <div
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            boxShadow:
              "0 0 20px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 212, 255, 0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Photo container */}
        <button
          type="button"
          className="group"
          onClick={handlePhotoClick}
          disabled={isUploading}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(0, 212, 255, 0.6)",
            boxShadow: "0 0 18px rgba(0, 212, 255, 0.4)",
            cursor: "pointer",
            background: "transparent",
            padding: 0,
          }}
          data-ocid="home.profile_photo.upload_button"
          title="Click to upload profile photo"
        >
          {photoSrc ? (
            <img
              src={photoSrc}
              alt="SAVITHA"
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
                background: "linear-gradient(135deg, #020c1e 0%, #040f1f 100%)",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#00d4ff",
                  textShadow: "0 0 12px #00d4ff, 0 0 25px rgba(0,212,255,0.5)",
                  lineHeight: 1,
                }}
              >
                S
              </div>
              <div
                style={{
                  fontSize: "0.55rem",
                  marginTop: "4px",
                  color: "rgba(0, 212, 255, 0.55)",
                  letterSpacing: "0.12em",
                }}
              >
                SAVITHA
              </div>
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
              background: "rgba(0, 15, 40, 0.75)",
              transition: "opacity 0.3s ease",
              borderRadius: "50%",
            }}
          >
            {isUploading ? (
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "2px solid transparent",
                  borderTopColor: "#00d4ff",
                  borderRightColor: "rgba(0, 212, 255, 0.3)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            ) : (
              <Camera
                size={24}
                style={{
                  color: "#00d4ff",
                  filter: "drop-shadow(0 0 4px #00d4ff)",
                }}
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
      <div className="text-center">
        <h2
          style={{
            fontSize: "clamp(2.4rem, 8vw, 3.5rem)",
            fontWeight: 900,
            color: "#00d4ff",
            textShadow:
              "0 0 10px #00d4ff, 0 0 25px #00d4ff, 0 0 55px rgba(0, 212, 255, 0.6), 0 0 100px rgba(0, 212, 255, 0.3)",
            letterSpacing: "0.28em",
            margin: 0,
            lineHeight: 1,
            display: "inline-flex",
            gap: "0.02em",
          }}
        >
          {(
            [
              ["S", 0],
              ["A", 1],
              ["V", 2],
              ["I", 3],
              ["T", 4],
              ["H", 5],
              ["A", 6],
            ] as [string, number][]
          ).map(([letter, pos]) => (
            <span
              key={`savitha-${pos}`}
              className="float"
              style={{
                animationDelay: `${pos * 120}ms`,
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          ))}
        </h2>
        <p
          className="float-subtle"
          style={{
            marginTop: "0.5rem",
            fontSize: "0.7rem",
            color: "rgba(0, 212, 255, 0.55)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          Portfolio · Developer · Creator
        </p>
      </div>
    </div>
  );
}
