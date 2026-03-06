import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { AboutSection } from "./AboutSection";
import { AdminSection } from "./AdminSection";
import { ContactSection } from "./ContactSection";
import { HomeSection } from "./HomeSection";
import { Navbar } from "./Navbar";
import { ProjectsSection } from "./ProjectsSection";
import { ResumeSection } from "./ResumeSection";
import { SkyBackground } from "./SkyBackground";

interface HomePageProps {
  username: string;
}

const TOTAL_SLIDES = 6;

export function HomePage({ username }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;

  // Scroll to a specific slide by index
  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>("[data-slide]");
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Track the visible slide via scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideHeight = container.clientHeight;
      if (slideHeight === 0) return;
      const idx = Math.round(container.scrollTop / slideHeight);
      setCurrentSlide(Math.max(0, Math.min(TOTAL_SLIDES - 1, idx)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(135deg, #1a0033 0%, #2d0045 40%, #1f003a 70%, #3d0030 100%)",
      }}
      data-ocid="home.page"
    >
      <SkyBackground />
      <Navbar scrollTo={scrollToSlide} currentSection={currentSlide} />

      {/* Main swipe scroll container */}
      <div
        ref={containerRef}
        className="portfolio-scroll-container"
        style={{ zIndex: 10 }}
        data-ocid="home.swipe_container"
      >
        {/* Slide 1: Home / Hero */}
        <div
          data-slide="0"
          data-ocid="home.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <HomeSection />
          </div>
          <SwipeHint />
        </div>

        {/* Slide 2: About */}
        <div
          data-slide="1"
          data-ocid="about.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <div style={{ width: "100%", maxWidth: "680px" }}>
              <AboutSection />
            </div>
          </div>
          <SwipeHint />
        </div>

        {/* Slide 3: Resume */}
        <div
          data-slide="2"
          data-ocid="resume.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <div style={{ width: "100%", maxWidth: "680px" }}>
              <ResumeSection />
            </div>
          </div>
          <SwipeHint />
        </div>

        {/* Slide 4: Contact */}
        <div
          data-slide="3"
          data-ocid="contact.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <div style={{ width: "100%", maxWidth: "680px" }}>
              <ContactSection />
            </div>
          </div>
          <SwipeHint />
        </div>

        {/* Slide 5: Projects */}
        <div
          data-slide="4"
          data-ocid="projects.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <div style={{ width: "100%", maxWidth: "880px" }}>
              <ProjectsSection />
            </div>
          </div>
          <SwipeHint />
        </div>

        {/* Slide 6: Admin */}
        <div
          data-slide="5"
          data-ocid="admin.section"
          className="portfolio-slide"
        >
          <div className="portfolio-slide-inner">
            <div style={{ width: "100%", maxWidth: "680px" }}>
              <AdminSection />
            </div>
          </div>

          {/* Footer on last slide */}
          <footer
            data-ocid="footer.section"
            style={{
              flexShrink: 0,
              textAlign: "center",
              paddingBottom: "1.5rem",
              paddingTop: "0.5rem",
            }}
          >
            <p
              style={{
                color: "rgba(168, 85, 247, 0.5)",
                letterSpacing: "0.08em",
                fontSize: "0.72rem",
                fontFamily: "Outfit, sans-serif",
                textShadow: "0 0 8px rgba(168, 85, 247, 0.3)",
              }}
            >
              © {currentYear} My Sky of Wings | All Rights Reserved.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(236, 72, 153, 0.6)" }}
              >
                Built with ♥ using caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </div>

      {/* Slide dot navigation */}
      <div
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          zIndex: 50,
        }}
      >
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
          <button
            key={`nav-dot-${i + 1}`}
            type="button"
            onClick={() => scrollToSlide(i)}
            data-ocid={`nav.dot.${i + 1}`}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === currentSlide ? "8px" : "6px",
              height: i === currentSlide ? "24px" : "6px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              background:
                i === currentSlide
                  ? "linear-gradient(180deg, #a855f7, #ec4899)"
                  : "rgba(168, 85, 247, 0.3)",
              boxShadow:
                i === currentSlide
                  ? "0 0 8px rgba(168,85,247,0.6), 0 0 16px rgba(168,85,247,0.3)"
                  : "none",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* User badge */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(26, 0, 51, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          borderRadius: "999px",
          padding: "0.3rem 0.75rem",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#a855f7",
            boxShadow: "0 0 6px rgba(168,85,247,0.8)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: "rgba(216, 180, 254, 0.7)",
            fontSize: "0.68rem",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {username}
        </span>
      </div>

      <Toaster
        toastOptions={{
          style: {
            background: "rgba(26, 0, 51, 0.95)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            color: "#d8b4fe",
          },
        }}
      />
    </div>
  );
}

function SwipeHint() {
  return (
    <div
      className="swipe-hint"
      style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
        opacity: 0.5,
        pointerEvents: "none",
      }}
    >
      <div style={{ color: "rgba(168, 85, 247, 0.7)", fontSize: "1.1rem" }}>
        ↑
      </div>
      <span
        style={{
          color: "rgba(168, 85, 247, 0.5)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        Swipe
      </span>
    </div>
  );
}
