"use client";

import { useState } from "react";
import { motion } from "motion/react";
import useBreakpoint from "../hooks/useBreakpoint";
import {
  Globe,
  BadgeCheck,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";

const features = [
  {
    Icon: Globe,
    title: "Globally Optimized Infrastructure",
    desc: "Our infrastructure is based in the EU — fast for Europe, compliant for global businesses, and reliable for Indian clients targeting international markets.",
    blob: "rgba(56,189,248,0.55)",
  },
  {
    Icon: BadgeCheck,
    title: "Consistent Pricing",
    desc: "The price you sign up with is the price you pay on renewal. No bait-and-switch, no surprise bills. Consistent pricing — no hidden surprises.",
    blob: "rgba(201,168,76,0.55)",
  },
  {
    Icon: Zap,
    title: "LiteSpeed + NVMe",
    desc: "LiteSpeed Enterprise web server with NVMe SSD storage — up to 9× faster than standard Apache/SSD stacks. Your pages load fast, your rankings benefit.",
    blob: "rgba(251,146,60,0.55)",
  },
  {
    Icon: ShieldCheck,
    title: "Enterprise Security Stack",
    desc: "Imunify360, WAF, CageFS account isolation, CloudLinux, brute-force protection, and daily backups — all active by default on every plan.",
    blob: "rgba(168,139,250,0.55)",
  },
  {
    Icon: LayoutDashboard,
    title: "Real cPanel. Not a Custom Panel.",
    desc: "Industry-standard cPanel on every account. Thousands of tutorials, full compatibility, and no learning curve. You own your control panel experience.",
    blob: "rgba(52,211,153,0.55)",
  },
  {
    Icon: Users,
    title: "We Can Manage It For You",
    desc: "Don't want to deal with the technical side? Our managed plans cover setup, maintenance, email, security updates, and everything in between.",
    blob: "rgba(99,179,237,0.55)",
  },
];

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const { Icon, title, desc, blob } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.06 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        padding: "1.75rem",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.09)"
          : "0 1px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Hover blob */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-60px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          pointerEvents: "none",
          filter: "blur(40px)",
          background: `radial-gradient(circle, ${blob} 0%, rgba(255,255,255,0) 70%)`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.1rem",
          flexShrink: 0,
        }}
      >
        <Icon size={18} strokeWidth={1.5} style={{ color: "#1a1612" }} />
      </div>

      {/* Title */}
      <span
        style={{
          position: "relative",
          fontSize: "15px",
          fontWeight: 600,
          fontFamily: "'Rosarivo', serif",
          color: "#1a1612",
          marginBottom: "0.6rem",
          lineHeight: 1.3,
        }}
      >
        {title}
      </span>

      {/* Desc — always visible */}
      <p
        style={{
          position: "relative",
          fontSize: "13px",
          color: "#6b6150",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section
      style={{
        background: "#f8f6f1",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "clamp(3rem, 7vw, 5rem) 0",
      }}
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="section-label"
            style={{
              color: "#AF8100",
              fontSize: "12px",
              letterSpacing: "4px",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Why Host With Dhruvid
          </span>
          <h2 style={{ color: "#1a1612" }}>Hosting That Puts You First</h2>
          <p style={{ color: "#6b6150" }}>
            Everything we build — from performance to pricing — is focused on
            reliability, transparency, and keeping your business running.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: "1.25rem",
            marginTop: "-1.5rem",
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
