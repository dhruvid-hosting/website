"use client";

import Link from "next/link";
import { motion } from "motion/react";

const monogramLogo = "/assets/druvid-logo-monogram.webp";

const socials = [
  {
    key: "x",
    href: "https://x.com/dhruvidhosting",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "ig",
    href: "https://instagram.com/dhruvidhosting",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "li",
    href: "https://linkedin.com/company/dhruvid",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
      </svg>
    ),
  },
];

const cols = [
  {
    title: "Services",
    links: [
      { label: "Hosting Plans", to: "/hosting/" },
      { label: "Managed Plans", to: "/managed/" },
      { label: "Custom Plans", to: "/managed/#custom" },
      { label: "Domains", to: "/domains/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", to: "/contact/" },
      { label: "Submit Ticket", to: "/contact/#contact-methods" },
      { label: "Partner With Us", to: "/affiliate/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms Of Service", to: "/terms/" },
      { label: "Privacy Policy", to: "/privacy/" },
      { label: "Acceptable Use Policy", to: "/acceptable-use/" },
      { label: "Billing & Refunds", to: "/refund/" },
      { label: "Domain Policy", to: "/domain-policy/" },
      { label: "Service Level Agreement", to: "/sla/" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#060d18", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2.5rem 3rem",
          }}
        >
          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem", gridColumn: "span 1" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={monogramLogo} alt="Dhruvid" style={{ width: "32px", height: "32px" }} />
              <span style={{ fontFamily: "'Rosarivo', serif", color: "#f0ece0", fontSize: "1.1rem" }}>
                Dhruvid
              </span>
            </div>
            <p style={{ fontSize: "13.5px", color: "#6b6760", lineHeight: 1.7, maxWidth: "220px" }}>
              EU-based hosting built on LiteSpeed Enterprise. Consistent pricing — no surprises at renewal.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "6px",
                    border: "1px solid rgba(201,168,76,0.15)",
                    color: "#6b6760",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                    e.currentTarget.style.color = "#c9a84c";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
                    e.currentTarget.style.color = "#6b6760";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link cols */}
          {cols.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 + ci * 0.05 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderTop: "1px solid rgba(201,168,76,0.1)",
                paddingTop: "1.25rem",
              }}
            >
              <h4
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "#c9a84c",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 600,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        href={link.to}
                        style={{ fontSize: "13.5px", color: "#6b6760", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#b8b4a8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6760")}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "13.5px", color: "#6b6760", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#b8b4a8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6760")}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Big wordmark */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "4rem",
            fontSize: "min(13.5vw, 200px)",
            height: "0.74em",
            position: "relative",
            maskImage: "linear-gradient(to bottom, #000 40%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent 95%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              fontFamily: "'Rosarivo', serif",
              fontWeight: 400,
              fontSize: "inherit",
              letterSpacing: "0.12em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              paddingLeft: "0.12em",
              color: "#060d18",
              textShadow:
                "0 -1px 0 rgba(201,168,76,0.25), 1px 0 0 rgba(201,168,76,0.25), 0 1px 0 rgba(201,168,76,0.25), -1px 0 0 rgba(201,168,76,0.25)",
            }}
          >
            Dhruvid
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "1.25rem",
            paddingBottom: "1.5rem",
            borderTop: "1px solid rgba(201,168,76,0.08)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            fontSize: "12px",
            color: "#ffffff",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)" }}>© {year} Dhruvid. All rights reserved. GST registered.</p>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>EU Infrastructure · Always Up. Always There.</p>
        </div>
      </div>
    </footer>
  );
}
