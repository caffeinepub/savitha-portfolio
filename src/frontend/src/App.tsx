import { useEffect, useState } from "react";
import { HomePage } from "./components/HomePage";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // On mount: check if username exists in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sky_portfolio_username");
    if (stored) {
      setUsername(stored);
    }
    setIsInitializing(false);
  }, []);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
  };

  // Show minimal loading while initializing to avoid flash
  if (isInitializing) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a0033 0%, #2d0045 40%, #1f003a 70%, #3d0030 100%)",
        }}
      >
        <div className="sky-spinner" />
      </div>
    );
  }

  if (!username) {
    return <LandingPage onUsernameSubmit={handleUsernameSubmit} />;
  }

  return <HomePage username={username} />;
}
