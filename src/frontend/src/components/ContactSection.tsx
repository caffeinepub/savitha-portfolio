import { Check, Instagram, Linkedin, Pencil, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetContact, useUpdateContact } from "../hooks/useQueries";
import { PasswordModal } from "./PasswordModal";

export function ContactSection() {
  const { data: contact, isLoading } = useGetContact();
  const updateContact = useUpdateContact();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [display, setDisplay] = useState({
    instagram: "",
    linkedin: "",
    phone: "",
  });
  const [editValues, setEditValues] = useState({
    instagram: "",
    linkedin: "",
    phone: "",
  });

  useEffect(() => {
    if (contact) {
      setDisplay({
        instagram: contact.instagram || "",
        linkedin: contact.linkedin || "",
        phone: contact.phone || "",
      });
    }
  }, [contact]);

  const handleEditClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setEditValues({ ...display });
    setIsEditing(true);
  };

  const handleSave = () => {
    setDisplay({ ...editValues });
    setIsEditing(false);
    updateContact.mutate(
      {
        instagram: editValues.instagram,
        linkedin: editValues.linkedin,
        phone: editValues.phone,
      },
      {
        onSuccess: () => toast.success("Contact details saved!"),
        onError: () => toast.error("Failed to save contact details."),
      },
    );
  };

  const handleCancel = () => {
    setEditValues({ ...display });
    setIsEditing(false);
  };

  const formatLinkedIn = (val: string) => {
    if (!val) return "#";
    if (val.startsWith("http")) return val;
    return `https://${val}`;
  };

  const formatInstagram = (val: string) => {
    if (!val) return "#";
    if (val.startsWith("http")) return val;
    const handle = val.startsWith("@") ? val.slice(1) : val;
    return `https://instagram.com/${handle}`;
  };

  const contactFields = [
    {
      key: "instagram" as const,
      label: "Instagram ID",
      icon: <Instagram size={16} color="#ec4899" />,
      placeholder: "@your_handle",
      type: "text",
      href: display.instagram ? formatInstagram(display.instagram) : null,
    },
    {
      key: "linkedin" as const,
      label: "LinkedIn ID",
      icon: <Linkedin size={16} color="#a855f7" />,
      placeholder: "linkedin.com/in/your-profile",
      type: "url",
      href: display.linkedin ? formatLinkedIn(display.linkedin) : null,
    },
    {
      key: "phone" as const,
      label: "Phone Number",
      icon: <Phone size={16} color="#d946ef" />,
      placeholder: "+91 98765 43210",
      type: "tel",
      href: display.phone ? `tel:${display.phone}` : null,
    },
  ];

  return (
    <section
      data-ocid="contact.section"
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
          Contact
        </h2>

        {!isEditing && (
          <button
            type="button"
            data-ocid="contact.edit_button"
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
              data-ocid="contact.save_button"
              onClick={handleSave}
              disabled={updateContact.isPending}
              className="sky-button"
              style={{
                fontSize: "0.78rem",
                padding: "0.35rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {updateContact.isPending ? (
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
              data-ocid="contact.cancel_button"
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
          marginBottom: "1.5rem",
        }}
      />

      {isLoading ? (
        <div
          data-ocid="contact.loading_state"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(168,85,247,0.1)",
                }}
              />
              <div
                style={{
                  height: 14,
                  flex: 1,
                  borderRadius: 6,
                  background: "rgba(168,85,247,0.1)",
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {contactFields.map((field) => (
            <div
              key={field.key}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: "rgba(168, 85, 247, 0.1)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                }}
              >
                {field.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: "rgba(216, 180, 254, 0.5)",
                    fontSize: "0.66rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    margin: "0 0 0.2rem",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {field.label}
                </p>

                {isEditing ? (
                  <input
                    data-ocid={`contact.${field.key}.input`}
                    type={field.type}
                    value={editValues[field.key]}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="glass-input"
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "10px",
                      fontSize: "0.88rem",
                      fontFamily: "Outfit, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                ) : field.href && display[field.key] ? (
                  <a
                    href={field.href}
                    target={field.key !== "phone" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      color: "#d8b4fe",
                      fontSize: "0.9rem",
                      fontFamily: "Outfit, sans-serif",
                      textDecoration: "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {display[field.key]}
                  </a>
                ) : (
                  <span
                    style={{
                      color: "rgba(216, 180, 254, 0.35)",
                      fontSize: "0.88rem",
                      fontFamily: "Outfit, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    Not set · tap Edit to add
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showPasswordModal && (
        <PasswordModal
          title="Edit Contact Details"
          onSuccess={handlePasswordSuccess}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </section>
  );
}
