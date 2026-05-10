import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 768) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };

  const [bp, setBp] = useState(get);

  useEffect(() => {
    const handler = () => setBp(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return {
    isMobile:  bp === "mobile",
    isTablet:  bp === "tablet",
    isDesktop: bp === "desktop",
    isTabletUp: bp !== "mobile",
  };
}
