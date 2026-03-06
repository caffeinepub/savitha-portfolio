import { Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddProject,
  useDeleteProject,
  useGetProjects,
} from "../hooks/useQueries";
import type { Project } from "../hooks/useQueries";
import { PasswordModal } from "./PasswordModal";

type ProtectedAction =
  | { type: "add" }
  | { type: "delete"; projectId: string; index: number };

export function ProjectsSection() {
  const { data: projects = [], isLoading } = useGetProjects();
  const addProject = useAddProject();
  const deleteProject = useDeleteProject();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<ProtectedAction | null>(
    null,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddClick = () => {
    setPendingAction({ type: "add" });
    setShowPasswordModal(true);
  };

  const handleDeleteClick = (projectId: string, index: number) => {
    setPendingAction({ type: "delete", projectId, index });
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = async () => {
    setShowPasswordModal(false);

    if (!pendingAction) return;

    if (pendingAction.type === "add") {
      setNewTitle("");
      setNewDescription("");
      setShowAddModal(true);
    } else if (pendingAction.type === "delete") {
      try {
        await deleteProject.mutateAsync(pendingAction.projectId);
        toast.success("Project deleted.");
      } catch {
        toast.error("Failed to delete project.");
      }
    }

    setPendingAction(null);
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimTitle = newTitle.trim();
    const trimDesc = newDescription.trim();
    if (!trimTitle) {
      toast.error("Please enter a project title.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addProject.mutateAsync({
        title: trimTitle,
        description: trimDesc,
        fileBlobKey: null,
      });
      toast.success("Project added!");
      setShowAddModal(false);
      setNewTitle("");
      setNewDescription("");
    } catch {
      toast.error("Failed to add project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-ocid="projects.section"
      style={{ width: "100%", color: "#fff" }}
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
        <h2
          className="neon-pulse-purple"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Project Work
        </h2>
        <button
          data-ocid="projects.add_button"
          type="button"
          onClick={handleAddClick}
          className="sky-button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
          }}
        >
          <Plus size={15} />
          Add Project
        </button>
      </div>

      {/* Projects grid */}
      {isLoading ? (
        <div
          data-ocid="projects.loading_state"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "1.25rem",
                height: 140,
                background: "rgba(168,85,247,0.05)",
              }}
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          data-ocid="projects.empty_state"
          className="glass-card"
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.75rem",
              filter: "grayscale(0.3)",
            }}
          >
            🚀
          </div>
          <p
            style={{
              color: "rgba(216, 180, 254, 0.6)",
              fontSize: "0.9rem",
              fontFamily: "Outfit, sans-serif",
              margin: 0,
            }}
          >
            No projects yet. Add your first project!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {projects.map((project: Project, idx: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx + 1}
              onDelete={() => handleDeleteClick(project.id, idx + 1)}
              isDeleting={
                deleteProject.isPending &&
                pendingAction?.type === "delete" &&
                pendingAction.projectId === project.id
              }
            />
          ))}
        </div>
      )}

      {/* Add project modal */}
      {showAddModal && (
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
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            padding: "1rem",
          }}
          onClick={(e) =>
            e.target === e.currentTarget && setShowAddModal(false)
          }
          onKeyDown={(e) => e.key === "Escape" && setShowAddModal(false)}
        >
          <div
            data-ocid="projects.modal"
            className="glass-card"
            style={{ padding: "1.75rem", width: "100%", maxWidth: "480px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <h3
                style={{
                  color: "#d8b4fe",
                  fontSize: "1.1rem",
                  fontFamily: "Playfair Display, serif",
                  margin: 0,
                }}
              >
                New Project
              </h3>
              <button
                data-ocid="projects.close_button"
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <X size={13} />
              </button>
            </div>

            <form onSubmit={handleSubmitProject}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="project-title"
                  style={{
                    color: "rgba(216,180,254,0.7)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Title *
                </label>
                <input
                  id="project-title"
                  data-ocid="projects.title.input"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Project title..."
                  className="glass-input"
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontFamily: "Outfit, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label
                  htmlFor="project-description"
                  style={{
                    color: "rgba(216,180,254,0.7)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Description
                </label>
                <textarea
                  id="project-description"
                  data-ocid="projects.description.textarea"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your project..."
                  rows={4}
                  className="glass-input"
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    resize: "vertical",
                    fontFamily: "Outfit, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  data-ocid="projects.submit_button"
                  type="submit"
                  disabled={isSubmitting}
                  className="sky-button"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    fontSize: "0.88rem",
                  }}
                >
                  {isSubmitting ? (
                    <span
                      className="sky-spinner"
                      style={{ width: 14, height: 14 }}
                    />
                  ) : (
                    <Plus size={14} />
                  )}
                  Add Project
                </button>
                <button
                  data-ocid="projects.cancel_button"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="sky-button-pink"
                  style={{ fontSize: "0.88rem" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.zip,.png,.jpg,.jpeg"
        style={{ display: "none" }}
      />

      {showPasswordModal && (
        <PasswordModal
          title={
            pendingAction?.type === "add" ? "Add New Project" : "Delete Project"
          }
          onSuccess={handlePasswordSuccess}
          onClose={() => {
            setShowPasswordModal(false);
            setPendingAction(null);
          }}
        />
      )}
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onDelete: () => void;
  isDeleting: boolean;
}

function ProjectCard({
  project,
  index,
  onDelete,
  isDeleting,
}: ProjectCardProps) {
  return (
    <div
      data-ocid={`projects.item.${index}`}
      className="glass-card"
      style={{
        padding: "1.25rem",
        position: "relative",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 20px rgba(168,85,247,0.3), 0 8px 32px rgba(0,0,0,0.5)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: "0.6rem",
        }}
      >
        <h3
          style={{
            color: "#d8b4fe",
            fontSize: "0.95rem",
            fontWeight: 600,
            margin: 0,
            fontFamily: "Outfit, sans-serif",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        <button
          data-ocid={`projects.delete_button.${index}`}
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "0.25rem 0.4rem",
            cursor: "pointer",
            color: "rgba(248, 113, 113, 0.8)",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          {isDeleting ? (
            <span className="sky-spinner" style={{ width: 12, height: 12 }} />
          ) : (
            <Trash2 size={13} />
          )}
        </button>
      </div>

      {project.description && (
        <p
          style={{
            color: "rgba(216, 180, 254, 0.6)",
            fontSize: "0.82rem",
            margin: 0,
            lineHeight: 1.6,
            fontFamily: "Outfit, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          borderRadius: "0 0 20px 20px",
          background: "linear-gradient(90deg, #a855f7, #ec4899)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
