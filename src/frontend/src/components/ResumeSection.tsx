import { Download, Eye, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useGetResume, useSetResume } from "../hooks/useQueries";
import { PasswordModal } from "./PasswordModal";

export function ResumeSection() {
  const { data: resume, isLoading } = useGetResume();
  const setResume = useSetResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localResumeData, setLocalResumeData] = useState<{
    dataUrl: string;
    filename: string;
  } | null>(null);

  const hasResume = !!(resume?.blobKey || localResumeData);
  const resumeFilename =
    localResumeData?.filename ?? resume?.filename ?? "Resume.pdf";

  const handleUploadClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.onerror = () => reject(new Error("Read failed"));
        reader.readAsDataURL(file);
      });

      setLocalResumeData({ dataUrl, filename: file.name });
      await setResume.mutateAsync({ blobKey: dataUrl, filename: file.name });
      toast.success("Resume uploaded successfully!");
    } catch {
      toast.error("Failed to upload resume.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleDownload = () => {
    const url = localResumeData?.dataUrl ?? resume?.blobKey;
    if (!url) {
      toast.error("No resume uploaded yet.");
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleView = () => {
    const url = localResumeData?.dataUrl ?? resume?.blobKey;
    if (!url) {
      toast.error("No resume uploaded yet.");
      return;
    }
    window.open(url, "_blank");
  };

  const SKILLS = [
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "AI Tools",
    "Data Science",
  ];

  return (
    <section
      data-ocid="resume.section"
      className="glass-card glow-card-pulse"
      style={{ padding: "2rem", width: "100%", color: "#fff" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h2
          className="neon-pulse-purple"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Resume
        </h2>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.5), transparent)",
          marginBottom: "1.5rem",
        }}
      />

      {isLoading ? (
        <div
          data-ocid="resume.loading_state"
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[80, 60, 90].map((w) => (
            <div
              key={`skeleton-${w}`}
              style={{
                height: 16,
                width: `${w}%`,
                borderRadius: 8,
                background: "rgba(168,85,247,0.1)",
              }}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Info grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <InfoRow
              label="Education"
              value="B.Tech – Artificial Intelligence & Data Science"
            />
            <InfoRow
              label="College"
              value="Priyadarshini Engineering College"
            />
            <InfoRow
              label="Goal"
              value="Become Web Developer & Creative Technologist"
            />
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                color: "rgba(216, 180, 254, 0.5)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Skills
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SKILLS.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <button
              data-ocid="resume.view_button"
              type="button"
              onClick={handleView}
              className="sky-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                opacity: hasResume ? 1 : 0.5,
              }}
            >
              <Eye size={15} />
              View Resume
            </button>

            <button
              data-ocid="resume.download_button"
              type="button"
              onClick={handleDownload}
              className="sky-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                opacity: hasResume ? 1 : 0.5,
              }}
            >
              <Download size={15} />
              Download Resume
            </button>

            <button
              data-ocid="resume.upload_button"
              type="button"
              onClick={handleUploadClick}
              disabled={isUploading || setResume.isPending}
              className="sky-button-pink"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              {isUploading || setResume.isPending ? (
                <span
                  className="sky-spinner"
                  style={{ width: 14, height: 14 }}
                />
              ) : (
                <Upload size={15} />
              )}
              Upload New Resume
            </button>
          </div>

          {/* File status */}
          {hasResume ? (
            <p
              style={{
                marginTop: "1rem",
                color: "rgba(168, 85, 247, 0.6)",
                fontSize: "0.75rem",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              📄 {resumeFilename} · Ready
            </p>
          ) : (
            <p
              style={{
                marginTop: "1rem",
                color: "rgba(216, 180, 254, 0.3)",
                fontSize: "0.75rem",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              No resume uploaded yet. Click "Upload New Resume" to add your CV.
            </p>
          )}
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showPasswordModal && (
        <PasswordModal
          title="Upload Resume"
          onSuccess={handlePasswordSuccess}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(168, 85, 247, 0.07)",
        border: "1px solid rgba(168, 85, 247, 0.2)",
        borderRadius: "12px",
        padding: "0.75rem 1rem",
      }}
    >
      <p
        style={{
          color: "rgba(216, 180, 254, 0.5)",
          fontSize: "0.68rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          margin: "0 0 0.25rem",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {label}
      </p>
      <p
        style={{
          color: "rgba(240, 220, 255, 0.9)",
          fontSize: "0.88rem",
          margin: 0,
          fontFamily: "Outfit, sans-serif",
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    </div>
  );
}
