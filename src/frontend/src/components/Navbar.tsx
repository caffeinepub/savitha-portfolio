import { Menu, Wind, X } from "lucide-react";
import { useState } from "react";
import { SiInstagram, SiLinkedin } from "react-icons/si";

interface NavbarProps {
  scrollTo: (index: number) => void;
  currentSection: number;
}

const navItems = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Resume", index: 2 },
  { label: "Contact", index: 3 },
];

export function Navbar({ scrollTo, currentSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (index: number) => {
    scrollTo(index);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="glass-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.logo.button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            flexShrink: 0,
            background: "none",
            border: "none",
            padding: 0,
          }}
          onClick={() => handleNav(0)}
        >
          <Wind
            size={22}
            color="#a855f7"
            style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.8))" }}
          />
          <span
            className="neon-text-purple"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
            }}
          >
            My Sky of Wings
          </span>
        </button>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              data-ocid={`nav.${item.label.toLowerCase()}.link`}
              onClick={() => handleNav(item.index)}
              style={{
                background:
                  currentSection === item.index
                    ? "rgba(168, 85, 247, 0.2)"
                    : "transparent",
                border:
                  currentSection === item.index
                    ? "1px solid rgba(168, 85, 247, 0.4)"
                    : "1px solid transparent",
                borderRadius: "8px",
                color:
                  currentSection === item.index
                    ? "#d8b4fe"
                    : "rgba(255,255,255,0.7)",
                padding: "0.35rem 0.85rem",
                fontSize: "0.87rem",
                fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontWeight: currentSection === item.index ? 600 : 400,
                textShadow:
                  currentSection === item.index
                    ? "0 0 10px rgba(168,85,247,0.5)"
                    : "none",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
          }}
        >
          <a
            data-ocid="nav.linkedin.link"
            href="https://www.linkedin.com/in/prithivi-raj-51157b393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(168, 85, 247, 0.8)",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              filter: "drop-shadow(0 0 4px rgba(168,85,247,0.4))",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#a855f7";
              (e.currentTarget as HTMLElement).style.filter =
                "drop-shadow(0 0 8px rgba(168,85,247,0.8))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(168, 85, 247, 0.8)";
              (e.currentTarget as HTMLElement).style.filter =
                "drop-shadow(0 0 4px rgba(168,85,247,0.4))";
            }}
          >
            <SiLinkedin size={18} />
          </a>
          <a
            data-ocid="nav.instagram.link"
            href="https://www.instagram.com/prithivishaw_3?igsh=cHZleXVuNDd5Zm9u"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(236, 72, 153, 0.8)",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              filter: "drop-shadow(0 0 4px rgba(236,72,153,0.4))",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ec4899";
              (e.currentTarget as HTMLElement).style.filter =
                "drop-shadow(0 0 8px rgba(236,72,153,0.8))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(236, 72, 153, 0.8)";
              (e.currentTarget as HTMLElement).style.filter =
                "drop-shadow(0 0 4px rgba(236,72,153,0.4))";
            }}
          >
            <SiInstagram size={18} />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            data-ocid="nav.menu.toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(216, 180, 254, 0.8)",
              display: "flex",
              alignItems: "center",
              padding: "0.25rem",
            }}
            className="md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(26, 0, 51, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.3)",
            padding: "0.75rem 1.5rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              data-ocid={`nav.mobile.${item.label.toLowerCase()}.link`}
              onClick={() => handleNav(item.index)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color:
                  currentSection === item.index
                    ? "#d8b4fe"
                    : "rgba(255,255,255,0.7)",
                padding: "0.6rem 0",
                fontSize: "0.95rem",
                fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
                borderBottom: "1px solid rgba(168, 85, 247, 0.1)",
                fontWeight: currentSection === item.index ? 600 : 400,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
