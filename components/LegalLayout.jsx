"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const legalDocs = [
  { label: "Terms of Service",         to: "/terms/" },
  { label: "Privacy Policy",           to: "/privacy/" },
  { label: "Acceptable Use Policy",    to: "/acceptable-use/" },
  { label: "Billing & Refunds",        to: "/refund/" },
  { label: "Domain Policy",            to: "/domain-policy/" },
  { label: "Service Level Agreement",  to: "/sla/" },
];

function isActivePath(pathname, to) {
  return pathname === to || pathname === to.slice(0, -1) || pathname + "/" === to;
}

export default function LegalLayout({ title, updated, children }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const Header = () => (
    <div style={{ paddingBottom: "1.75rem", marginBottom: "2.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <p style={{ fontSize: "10px", letterSpacing: "3px", color: "#AF8100", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: "'Urbanist', sans-serif" }}>
        Legal
      </p>
      <h1 style={{ color: "#1a1612", marginBottom: "0.5rem", textTransform: "none", fontFamily: "'Rosarivo', serif" }}>
        {title}
      </h1>
      <p style={{ fontSize: "13px", color: "#9a9088" }}>Last updated: {updated}</p>
    </div>
  );

  return (
    <div style={{ background: "#f8f6f1", minHeight: "100vh", paddingTop: "7rem", paddingBottom: "6rem" }}>
      <div className="container">
        {isDesktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem", alignItems: "start" }}>
            {/* Sticky sidebar */}
            <aside style={{ position: "sticky", top: "7rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: "#AF8100", fontWeight: 700, textTransform: "uppercase", marginBottom: "1rem", fontFamily: "'Urbanist', sans-serif" }}>
                Legal Documents
              </p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {legalDocs.map((doc) => {
                  const active = isActivePath(pathname, doc.to);
                  return (
                    <Link
                      key={doc.to}
                      href={doc.to}
                      style={{
                        display: "block",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontFamily: "'Urbanist', sans-serif",
                        textDecoration: "none",
                        background: active ? "rgba(175,129,0,0.09)" : "transparent",
                        color: active ? "#7a5800" : "#6b6150",
                        fontWeight: active ? 600 : 400,
                        borderLeft: `2px solid ${active ? "#AF8100" : "transparent"}`,
                        transition: "all 0.2s",
                      }}
                    >
                      {doc.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Content */}
            <main>
              <Header />
              <div className="legal-content">{children}</div>
            </main>
          </div>
        ) : (
          <div>
            {/* Mobile: horizontal scrollable pill nav */}
            <div style={{ overflowX: "auto", display: "flex", gap: "0.5rem", paddingBottom: "1rem", marginBottom: "1.75rem", scrollbarWidth: "none" }}>
              {legalDocs.map((doc) => {
                const active = isActivePath(pathname, doc.to);
                return (
                  <Link
                    key={doc.to}
                    href={doc.to}
                    style={{
                      flexShrink: 0,
                      display: "block",
                      padding: "0.45rem 1rem",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontFamily: "'Urbanist', sans-serif",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      background: active ? "rgba(175,129,0,0.12)" : "rgba(0,0,0,0.04)",
                      color: active ? "#7a5800" : "#6b6150",
                      fontWeight: active ? 600 : 400,
                      border: `1px solid ${active ? "rgba(175,129,0,0.3)" : "rgba(0,0,0,0.07)"}`,
                    }}
                  >
                    {doc.label}
                  </Link>
                );
              })}
            </div>
            <Header />
            <div className="legal-content">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
