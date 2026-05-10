"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, Sliders, Globe, MessageCircle, LifeBuoy, Users, Menu, X, ChevronDown } from "lucide-react";

import Button from "./Button";

const monogramLogo = "/assets/druvid-logo-monogram.webp";

const menuItems = {
  Services: [
    { icon: Zap,           title: "Hosting Plans", description: "LiteSpeed · NVMe · cPanel from ₹56/mo",      to: "/hosting/" },
    { icon: ShieldCheck,   title: "Managed Plans",   description: "We handle everything. You focus on growth.", to: "/managed/" },
    { icon: Sliders,       title: "Custom Plans",    description: "Tailored infrastructure for unique needs.",  to: "/managed/#custom" },
    { icon: Globe,         title: "Domains",         description: "Search, register and manage your domain.",   to: "/domains/" },
  ],
  Support: [
    { icon: MessageCircle, title: "Contact Us",      description: "Get in touch with our team.",    to: "/contact/" },
    { icon: LifeBuoy,      title: "Submit Ticket",   description: "Raise a support request.",       to: "/contact/#contact-methods" },
    { icon: Users,         title: "Partner With Us", description: "Join our affiliate programme.",  to: "/affiliate/" },
  ],
};

function getLuminance(color) {
  const m = color.match(/\d+/g);
  if (!m) return 0;
  const [r, g, b] = m.map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

const DARK = {
  pill:            "rgba(6,13,24,0.85)",
  border:          "rgba(201,168,76,0.18)",
  logoText:        "#f0ece0",
  linkText:        "#9a9488",
  linkActive:      "#c9a84c",
  linkHoverBg:     "rgba(201,168,76,0.08)",
  linkHoverFg:     "#f0ece0",
  dropBg:          "rgba(6,13,24,0.97)",
  dropBorder:      "rgba(201,168,76,0.12)",
  cardBg:          "rgba(255,255,255,0.03)",
  cardBorder:      "rgba(255,255,255,0.07)",
  cardHoverBg:     "rgba(201,168,76,0.07)",
  cardHoverBorder: "rgba(201,168,76,0.2)",
  cardTitle:       "#f0ece0",
  cardDesc:        "#6b6760",
  iconBg:          "rgba(201,168,76,0.1)",
  iconBorder:      "rgba(201,168,76,0.15)",
  iconColor:       "#c9a84c",
  divider:         "rgba(201,168,76,0.1)",
  menuBtn:         "#c9a84c",
  menuBtnBg:       "rgba(201,168,76,0.08)",
  menuBtnBorder:   "rgba(201,168,76,0.2)",
  sectionLabel:    "#c9a84c",
  mobileLink:      "#b8b4a8",
};

const LIGHT = {
  pill:            "rgba(255,255,255,0.92)",
  border:          "rgba(0,0,0,0.1)",
  logoText:        "#1a1612",
  linkText:        "#6b6150",
  linkActive:      "#AF8100",
  linkHoverBg:     "rgba(175,129,0,0.07)",
  linkHoverFg:     "#1a1612",
  dropBg:          "rgba(255,255,255,0.98)",
  dropBorder:      "rgba(0,0,0,0.07)",
  cardBg:          "rgba(0,0,0,0.02)",
  cardBorder:      "rgba(0,0,0,0.07)",
  cardHoverBg:     "rgba(175,129,0,0.05)",
  cardHoverBorder: "rgba(175,129,0,0.2)",
  cardTitle:       "#1a1612",
  cardDesc:        "#9a8f80",
  iconBg:          "rgba(175,129,0,0.08)",
  iconBorder:      "rgba(175,129,0,0.15)",
  iconColor:       "#AF8100",
  divider:         "rgba(0,0,0,0.08)",
  menuBtn:         "#AF8100",
  menuBtnBg:       "rgba(175,129,0,0.07)",
  menuBtnBorder:   "rgba(175,129,0,0.15)",
  sectionLabel:    "#AF8100",
  mobileLink:      "#4a4540",
};

const TRANS = "background 0.4s ease, border-color 0.4s ease, color 0.4s ease";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark]             = useState(true);
  const [isTabletUp, setIsTabletUp] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const navRef   = useRef(null);
  const navElRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsTabletUp(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    // pointerdown fires before click, preventing a race where the menu closes
    // before React Router's Link click handler can navigate
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  const servicesActive = ["/hosting/", "/managed/", "/domains/"].includes(pathname);
  const supportActive  = ["/contact/", "/affiliate/"].includes(pathname);
  const closeMobile    = () => setMobileOpen(false);

  useEffect(() => {
    const detect = () => {
      const MID = 70;
      // Hit-test the page at the horizontal centre, just below the navbar.
      // elementsFromPoint returns elements in paint order (topmost first).
      const hits = document.elementsFromPoint(window.innerWidth / 2, MID);
      for (const el of hits) {
        // Skip the entire navbar (both mobile and desktop)
        if (navElRef.current && navElRef.current.contains(el)) continue;
        if (el === document.documentElement || el === document.body) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          setDark(getLuminance(bg) < 0.5);
          return;
        }
      }
      // Fallback: body background
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      if (bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent") {
        setDark(getLuminance(bodyBg) < 0.5);
      }
    };
    const timer = setTimeout(detect, 50);
    window.addEventListener("scroll", detect, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", detect);
    };
  }, [pathname]);

  const t = dark ? DARK : LIGHT;

  const pillStyle = {
    borderRadius: "14px",
    background: t.pill,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: `1px solid ${t.border}`,
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    overflow: "hidden",
    transition: TRANS,
  };

  return (
    <nav ref={navElRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0.85rem 1rem", pointerEvents: "none" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* ── Desktop + Tablet ── */}
        {isTabletUp && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div ref={navRef} onMouseLeave={() => setActiveMenu(null)} style={{ width: "640px", maxWidth: "100%", ...pillStyle, pointerEvents: "auto" }}>

            {/* Bar: logo | links | button */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0.75rem 1.25rem" }}>

              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <img src={monogramLogo} alt="Dhruvid" style={{ width: 28, height: 28, objectFit: "contain" }} />
                <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "1px", color: t.logoText, transition: TRANS }}>
                  DHRUVID
                </span>
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
                {["Services", "Support"].map((key) => (
                  <button
                    key={key}
                    onMouseEnter={() => setActiveMenu(key)}
                    onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                    style={{
                      padding: "0.55rem 0.95rem", borderRadius: "8px", border: "none", cursor: "pointer",
                      fontSize: "13.5px", transition: TRANS,
                      background: activeMenu === key ? t.linkHoverBg : "transparent",
                      color: (key === "Services" && servicesActive) || (key === "Support" && supportActive)
                        ? t.linkActive : activeMenu === key ? t.linkHoverFg : t.linkText,
                      display: "flex", alignItems: "center", gap: "4px",
                    }}
                  >
                    {key}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: activeMenu === key ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                ))}
                <Link
                  href="/hosting/"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{ padding: "0.55rem 0.95rem", fontSize: "13.5px", color: t.linkText, textDecoration: "none", borderRadius: "8px", transition: TRANS }}
                >
                  Pricing
                </Link>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button href="https://manage.dhruvid.com" variant="filled" color="gold" size="sm">
                  Client Login
                </Button>
              </div>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {activeMenu && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden", background: t.dropBg, borderTop: `1px solid ${t.dropBorder}`, transition: TRANS }}
                >
                  <div style={{ padding: "0.6rem 0.75rem 0.75rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {menuItems[activeMenu].map((item, i) => {
                        const Icon = item.icon;
                        const inner = (
                          <>
                            <div style={{ width: 34, height: 34, borderRadius: "9px", flexShrink: 0, background: t.iconBg, border: `1px solid ${t.iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center", transition: TRANS }}>
                              <Icon size={15} strokeWidth={1.5} style={{ color: t.iconColor }} />
                            </div>
                            <div>
                              <div style={{ fontSize: "13px", fontWeight: 500, color: t.cardTitle, marginBottom: "2px", transition: TRANS }}>{item.title}</div>
                              <div style={{ fontSize: "11.5px", color: t.cardDesc, lineHeight: 1.4, transition: TRANS }}>{item.description}</div>
                            </div>
                          </>
                        );
                        const cardBase = { display: "flex", alignItems: "center", gap: "11px", padding: "0.7rem 0.9rem", borderRadius: "12px", background: t.cardBg, border: `1px solid ${t.cardBorder}`, textDecoration: "none", cursor: "pointer", transition: TRANS };
                        const onEnter  = e => { e.currentTarget.style.background = t.cardHoverBg; e.currentTarget.style.borderColor = t.cardHoverBorder; };
                        const onLeave  = e => { e.currentTarget.style.background = t.cardBg;      e.currentTarget.style.borderColor = t.cardBorder; };
                        return (
                          <motion.div key={item.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.04 }}>
                            {item.href
                              ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={cardBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>{inner}</a>
                              : <Link href={item.to} onClick={() => setActiveMenu(null)} style={cardBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>{inner}</Link>
                            }
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>}

        {/* ── Mobile ── */}
        {!isTabletUp && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <div style={{ ...pillStyle, pointerEvents: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem 0.85rem 1.25rem" }}>
              <Link href="/" onClick={closeMobile} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <img src={monogramLogo} alt="Dhruvid" style={{ width: 26, height: 26, objectFit: "contain" }} />
                <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "1px", color: t.logoText, transition: TRANS }}>DHRUVID</span>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ width: 36, height: 36, borderRadius: "9px", border: `1px solid ${t.menuBtnBorder}`, background: t.menuBtnBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.menuBtn, transition: TRANS }}
              >
                {mobileOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div style={{ padding: "0 1rem 1.25rem" }}>
                    {Object.entries(menuItems).map(([section, items]) => (
                      <div key={section} style={{ marginBottom: "0.75rem" }}>
                        <p style={{ padding: "0.5rem 0.25rem 0.35rem", fontSize: "10px", fontWeight: 700, color: t.sectionLabel, letterSpacing: "2px", textTransform: "uppercase", transition: TRANS, margin: 0 }}>
                          {section}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                          {items.map((item) => {
                            const Icon = item.icon;
                            const row = (
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Icon size={14} strokeWidth={1.5} style={{ color: t.menuBtn, flexShrink: 0, transition: TRANS }} />
                                <span style={{ fontSize: "13.5px", color: t.mobileLink, transition: TRANS }}>{item.title}</span>
                              </div>
                            );
                            const rowStyle = { padding: "0.5rem 0.6rem", borderRadius: "9px", textDecoration: "none", background: t.cardBg, transition: TRANS };
                            return item.href
                              ? <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" style={rowStyle}>{row}</a>
                              : <Link key={item.title} href={item.to} onClick={closeMobile} style={rowStyle}>{row}</Link>;
                          })}
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${t.divider}`, paddingTop: "1rem", marginTop: "0.5rem", transition: TRANS }}>
                      <Button href="https://manage.dhruvid.com" variant="filled" color="gold" size="sm">Client Login</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>}

      </div>
    </nav>
  );
}
