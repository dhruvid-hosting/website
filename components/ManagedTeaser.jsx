"use client";

import { motion } from "motion/react";
import { ShieldCheck, Zap, Globe, Activity } from "lucide-react";
import Button from "./Button";
import useBreakpoint from "../hooks/useBreakpoint";

const steps = [
  { n: 1, label: "Choose a plan" },
  { n: 2, label: "We set things up" },
  { n: 3, label: "Launch your site" },
];

const metrics = [
  { Icon: Activity,    label: "Uptime",     value: "99.97%",  color: "#4fa3ff" },
  { Icon: Zap,         label: "LiteSpeed",  value: "Active",  color: "#c9a84c" },
  { Icon: ShieldCheck, label: "Imunify360", value: "Scanning",color: "#7ab3f0" },
  { Icon: Globe,       label: "EU Servers", value: "Optimal", color: "#9b7fd4" },
];

/* ── Desktop-only overlapping ServerCard ── */
function ServerCard() {
  return (
    <div style={{ width: "280px", height: "100%", background: "#060f1e", borderRadius: "40px", margin: "0 -40px", border: "12px solid #f8f6f1", padding: "3.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25em", paddingBottom: "1rem", borderBottom: "1px solid rgba(79,163,255,0.25)", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#4a6080", letterSpacing: "2px" }}>SERVER STATUS</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4caf50", fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", boxShadow: "0 0 6px #4caf50", display: "inline-block" }} />
          All systems online
        </span>
      </div>
      {metrics.map(({ Icon, label, value, color }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon size={13} strokeWidth={1.5} style={{ color }} />
            <span style={{ fontSize: "14px", color: "#4a6080" }}>{label}</span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#7a9ab8" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Compact server stats widget (tablet / mobile) ── */
function ServerWidget() {
  return (
    <div style={{ background: "rgba(6,15,30,0.7)", borderRadius: "16px", border: "1px solid rgba(79,163,255,0.18)", padding: "1.25rem 1.25rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(79,163,255,0.14)" }}>
        <span style={{ fontSize: "10px", color: "#4a6080", letterSpacing: "2.5px", fontWeight: 600 }}>SERVER STATUS</span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#4caf50", fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50", boxShadow: "0 0 6px #4caf50", display: "inline-block" }} />
          All systems online
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {metrics.map(({ Icon, label, value, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon size={12} strokeWidth={1.5} style={{ color }} />
              <span style={{ fontSize: "12px", color: "#4a6080" }}>{label}</span>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#7a9ab8" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ManagedTeaser() {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  /* ── Desktop: original 2-panel + overlapping ServerCard ── */
  if (!isSmall) {
    return (
      <div className="relative w-full">
        <div className="grid grid-cols-2 gap-0 items-stretch">
          {/* Left — title + steps */}
          <motion.article
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "linear-gradient(135deg, #0a1f3a 0%, #091628 60%, #0d1f10 100%)", border: "1px solid rgba(79,163,255,0.12)", borderRadius: "20px 0 0 20px" }}
            className="relative px-10 py-14 lg:px-14 lg:py-16 pr-36 lg:pr-40 flex flex-col justify-center"
          >
            <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#4fa3ff", marginBottom: "1rem" }}>✦ FULLY MANAGED OPTION</div>
            <h3 style={{ color: "#f0ece0", lineHeight: 1.2, marginBottom: "1rem", fontFamily: "'Rosarivo', serif" }}>
              We Run The Tech.<br />You Run The Business.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "280px" }}>
              {steps.map((s) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(79,163,255,0.1)", borderRadius: "10px", padding: "0.65rem 0.9rem" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(79,163,255,0.15)", border: "1px solid rgba(79,163,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, color: "#4fa3ff", flexShrink: 0 }}>{s.n}</span>
                  <span style={{ fontSize: "13.5px", color: "#b0c4d8" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Right — description + CTA */}
          <motion.article
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "#060f1e", border: "1px solid rgba(79,163,255,0.08)", borderLeft: "none", borderRadius: "0 20px 20px 0" }}
            className="relative px-10 py-14 lg:px-14 lg:py-16 pl-36 lg:pl-10 flex flex-col justify-center"
          >
            <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#4fa3ff", letterSpacing: "2px", marginBottom: "1rem" }}>What's Included?</h4>
            <p style={{ fontSize: "14px", color: "#6b7fa8", lineHeight: 1.85, marginBottom: "2rem" }}>
              Full server & cPanel setup, security hardening with Imunify360, email configuration, WordPress & software updates, backup verification — everything under one roof, handled by us.
            </p>
            <Button to="/managed/" variant="filled" color="gold">Explore Managed Plans →</Button>
          </motion.article>
        </div>

        {/* Center overlap — server status card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ width: "clamp(160px, 15vw, 220px)", borderRadius: "20px" }}
        >
          <ServerCard />
        </motion.div>
      </div>
    );
  }

  /* ── Tablet + Mobile: single unified card ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ background: "linear-gradient(135deg, #0a1f3a 0%, #091628 60%, #0d1f10 100%)", border: "1px solid rgba(79,163,255,0.12)", borderRadius: "20px", padding: isTablet ? "2.5rem" : "1.75rem" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr 1fr" : "1fr", gap: isTablet ? "2.5rem" : "1.5rem", alignItems: "center" }}>

        {/* Left / top column: label + headline + steps + description + CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#4fa3ff" }}>✦ FULLY MANAGED OPTION</div>

          <h3 style={{ color: "#f0ece0", lineHeight: 1.2, fontFamily: "'Rosarivo', serif", margin: 0 }}>
            We Run The Tech.<br />You Run The Business.
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(79,163,255,0.1)", borderRadius: "10px", padding: "0.65rem 0.9rem" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(79,163,255,0.15)", border: "1px solid rgba(79,163,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, color: "#4fa3ff", flexShrink: 0 }}>{s.n}</span>
                <span style={{ fontSize: "13.5px", color: "#b0c4d8" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Server widget sits here on mobile (stacked between steps and description) */}
          {isMobile && <ServerWidget />}

          <div style={{ borderTop: "1px solid rgba(79,163,255,0.1)", margin: "0" }} />

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#4fa3ff", letterSpacing: "2px", marginBottom: "0.65rem" }}>What's Included?</h4>
            <p style={{ fontSize: "13.5px", color: "#6b7fa8", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Full server & cPanel setup, security hardening with Imunify360, email configuration, WordPress & software updates, backup verification — everything under one roof, handled by us.
            </p>
            <Button to="/managed/" variant="filled" color="gold">Explore Managed Plans →</Button>
          </div>
        </div>

        {/* Right column: server widget on tablet only */}
        {isTablet && <ServerWidget />}
      </div>
    </motion.div>
  );
}
