'use client'
import { useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import { motion } from "framer-motion";
import useCurrency from "../hooks/useCurrency";
import { MANAGED_PLANS, MANAGED_BILLING_PERIODS, managedBillingLabel } from "../lib/pricing";
import {
  Globe,
  Mail,
  Shield,
  RefreshCw,
  Activity,
  Sliders,
  Check,
  Minus,
  Server,
  Database,
  Cpu,
  Lock,
  Zap,
  HardDrive,
  Settings,
  Layers,
  Cloud,
} from "lucide-react";
// ── Desktop grid (original) ──
const D_COLS = 11;
const D_ROWS = 6;
const desktopCells = [
  { r: 0, c: 1, Icon: Shield },
  { r: 0, c: 5, Icon: Globe },
  { r: 0, c: 9, Icon: Zap },
  { r: 1, c: 0, Icon: Server },
  { r: 1, c: 7, Icon: Database },
  { r: 1, c: 10, Icon: Cloud },
  { r: 2, c: 1, Icon: Cpu },
  { r: 2, c: 9, Icon: HardDrive },
  { r: 3, c: 0, Icon: Mail },
  { r: 3, c: 10, Icon: RefreshCw },
  { r: 4, c: 2, Icon: Activity },
  { r: 4, c: 6, Icon: Sliders },
  { r: 4, c: 9, Icon: Settings },
  { r: 5, c: 1, Icon: Lock },
  { r: 5, c: 7, Icon: Layers },
  { r: 5, c: 10, Icon: Globe },
];
const isDesktopTextZone = (r, c) => r >= 2 && r <= 3 && c >= 3 && c <= 7;


const cellHash = (r, c) => {
  const h = Math.sin(r * 127.1 + c * 311.7) * 43758.5453;
  return h - Math.floor(h);
};
import Button from "./Button";
import Link from "next/link";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";

function HeroOutlineButton({ to, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.7rem 1.5rem",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: 600,
        textDecoration: "none",
        border: "1.5px solid rgba(26,22,18,0.35)",
        background: hovered ? "#1a1612" : "transparent",
        color: hovered ? "#f0ece0" : "#1a1612",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {children}
    </Link>
  );
}

const services = [
  {
    Icon: Globe,
    title: "Website Setup",
    desc: "Full installation and configuration of your CMS, theme, plugins, performance optimisation, and SSL activation — ready to go from day one.",
  },
  {
    Icon: Mail,
    title: "Email Configuration",
    desc: "Business email setup with SPF, DKIM, and DMARC records configured. Outlook, mobile, and webmail setup included — no more landing in spam.",
  },
  {
    Icon: Shield,
    title: "Security Hardening",
    desc: "Full server and application-level security audit. Firewall rules, login protection, malware scanning, and regular reporting included.",
  },
  {
    Icon: RefreshCw,
    title: "Ongoing Maintenance",
    desc: "Platform core, theme, and software updates. Backup verification, uptime monitoring, and performance checks on a regular schedule.",
  },
  {
    Icon: Activity,
    title: "Performance Monitoring",
    desc: "Speed and uptime monitoring. Monthly reports. Proactive alerts before issues become outages — we act before you notice.",
  },
  {
    Icon: Sliders,
    title: "Custom Requirements",
    desc: "Server migrations, staging environments, custom email workflows, or multi-site setups — we scope it, deliver it, and document it.",
  },
];

function PlanCard({ plan, billingPeriod, currency, symbol }) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: plan.popular ? "linear-gradient(180deg, rgba(201,168,76,0.05) 0%, #faf7f2 40%)" : "#faf7f2",
        border: plan.popular ? "1.5px solid rgba(201,168,76,0.55)" : "1px solid rgba(0,0,0,0.09)",
        borderRadius: "20px",
      }}
    >
      {plan.popular && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", padding: "5px 0", fontSize: "9px", letterSpacing: "2px", fontWeight: 700, whiteSpace: "nowrap", background: "linear-gradient(135deg, #c9a84c, #9a7820)", color: "#09111f" }}>
          ⭐ MOST POPULAR
        </div>
      )}

      {/* TOP — fixed-height content keeps button at same y across both cards */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 1.75rem 1.5rem" }}>
        <div style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", color: plan.popular ? "#a07a20" : "#6b6150", marginBottom: "0.5rem", fontWeight: 600 }}>
          {plan.name}
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "'Rosarivo', serif", fontSize: "clamp(2.4rem, 4vw, 3rem)", fontWeight: 400, color: "#1a1612", lineHeight: 1 }}>{symbol}{plan.prices[billingPeriod][currency]}</span>
          <span style={{ fontSize: "13px", color: "#9a9088", marginLeft: "4px" }}>/mo</span>
        </div>
        <div style={{ fontSize: "12px", color: "#9a9088", marginBottom: "1rem" }}>{managedBillingLabel(plan, billingPeriod, currency, symbol)}</div>
        {/* Fixed 2-line height keeps button y-position consistent */}
        <p style={{ fontSize: "13px", color: "#6b6150", lineHeight: 1.6, marginBottom: "1.25rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "calc(1.6em * 2)", width: "100%" }}>
          {plan.desc}
        </p>
        <a
          href="/contact/?type=managed"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: "block", width: "100%", padding: "12px", borderRadius: "10px",
            textAlign: "center", fontSize: "14px", fontWeight: 600, textDecoration: "none",
            cursor: "pointer", transition: "background 0.2s, color 0.2s",
            ...(plan.popular
              ? { background: btnHovered ? "linear-gradient(135deg,#d4b05a,#a8862a)" : "linear-gradient(135deg,#c9a84c,#9a7820)", color: "#09111f", border: "none" }
              : { background: btnHovered ? "#1a1612" : "transparent", color: btnHovered ? "#f0ece0" : "#1a1612", border: "1.5px solid rgba(26,22,18,0.5)" }),
          }}
        >
          Get Started →
        </a>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", margin: "0 1.75rem" }} />

      <ul style={{ listStyle: "none", padding: "1.25rem 1.75rem 1.5rem" }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", fontSize: "13px", color: f.ok ? "#2a2520" : "#c0bab4" }}>
            {f.ok
              ? <Check size={13} strokeWidth={2.5} style={{ color: "#a07a20", flexShrink: 0 }} />
              : <Minus size={13} strokeWidth={2} style={{ color: "#d0ccc6", flexShrink: 0 }} />}
            {f.text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
export default function ManagedContent() {
  const [billingPeriod, setBillingPeriod] = useState("yearly");
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;
  const { currency, symbol } = useCurrency();

  return (
    <div>
      {/* ══ 1. HERO ══ */}
      <section
        style={{
          background: "#f9f5e8",
          paddingTop: "9rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label"
              style={{
                color: "#AF8100",
                fontSize: "11px",
                letterSpacing: "4px",
                marginBottom: "0.85rem",
                display: "block",
              }}
            >
              Managed Hosting
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "1.5rem",
              }}
            >
              We Handle the Tech.
              <br />
              <em style={{ color: "#AF8100", fontStyle: "italic" }}>
                You Run the Business.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                fontSize: "18px",
                maxWidth: "560px",
                color: "#6b6150",
                margin: "0 auto 2.25rem",
                lineHeight: 1.7,
              }}
            >
              From initial setup to ongoing maintenance — we take full ownership
              of your digital infrastructure so you never have to worry about it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Button to="#pricing" variant="filled" color="gold" size="lg">
                View Plans — From ₹499/month
              </Button>
              <HeroOutlineButton to="/contact/">Talk to us first →</HeroOutlineButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                fontSize: "14px",
                color: "#8a8678",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              {["No long-term contracts", "Setup within 24 hrs", "No hidden fees"].map((t) => (
                <div key={t}>
                  <span style={{ color: "#AF8100", marginRight: "6px" }}>✦</span>{t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 2. WHAT'S INCLUDED ══ */}
      <section
        style={{
          background: "#f0ece0",
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
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "3rem" }}
          >
            <span
              className="section-label"
              style={{
                color: "#AF8100",
                display: "block",
                marginBottom: "0.75rem",
                fontSize: "12px",
                letterSpacing: "4px",
              }}
            >
              What's Included
            </span>
            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "1.25rem",
              }}
            >
              Everything Managed, Nothing Missed
            </h2>
            <p style={{ color: "#6b6150" }}>
              Every managed plan covers the full stack — from server to inbox to
              security — so nothing slips through the cracks.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
          >
            {services.map((service, index) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    minHeight: "200px",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} style={{ color: "#1a1612" }} />
                  </div>
                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      fontFamily: "'Rosarivo', serif",
                      color: "#1a1612",
                      lineHeight: 1.3,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {service.title}
                  </h4>
                  <p style={{ fontSize: "13px", color: "#6b6150", lineHeight: 1.75 }}>
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3. PRICING ══ */}
      <section
        id="pricing"
        style={{
          background: "#f9f5e8",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "5.5rem 0",
        }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <span
              className="section-label"
              style={{
                color: "#AF8100",
                display: "block",
                marginBottom: "0.75rem",
                fontSize: "12px",
                letterSpacing: "4px",
              }}
            >
              Managed Plans
            </span>
            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "1.25rem",
              }}
            >
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: "#6b6150" }}>
              Pick a plan, we handle the rest. No hidden charges, no technical
              surprises.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                background: "rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.11)",
                borderRadius: "13px",
                padding: "4px",
                gap: "2px",
              }}
            >
              {MANAGED_BILLING_PERIODS.map((bp) => (
                <button
                  key={bp.key}
                  onClick={() => setBillingPeriod(bp.key)}
                  style={{
                    padding: "7px 18px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    background: billingPeriod === bp.key ? "#1a1612" : "transparent",
                    color: billingPeriod === bp.key ? "#f8f4ec" : "#6b6150",
                  }}
                >
                  {bp.label}
                  {bp.save && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: "6px",
                        background: billingPeriod === bp.key
                          ? "rgba(201,168,76,0.25)"
                          : "#c9a84c",
                        color: billingPeriod === bp.key ? "#c9a84c" : "#1a1612",
                      }}
                    >
                      {bp.save}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              maxWidth: "760px",
              margin: "0 auto",
              alignItems: "stretch",
            }}
          >
            {MANAGED_PLANS.map((plan, index) => (
              <PlanCard key={index} plan={plan} billingPeriod={billingPeriod} currency={currency} symbol={symbol} />
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9a9088",
              marginTop: "1.75rem",
            }}
          >
            Setup within 24 hours · No long-term contracts · No hidden fees
          </p>
        </div>
      </section>

      {/* ══ 4. CUSTOM PLAN ══ */}
      <section
        id="custom"
        style={{
          scrollMarginTop: "100px",
          background: "#060d18",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{
          maxWidth: isSmall ? "none" : "1200px",
          margin: "0 auto",
          padding: isSmall ? "0" : "3.5rem 2rem",
          minHeight: isSmall ? "520px" : undefined,
          position: "relative",
        }}>
          {/* CTA-6 icon grid — desktop: normal flow; tablet: abs fill; mobile: abs rotated 90deg */}
          <div
            style={{
              display: "grid",
              gap: "clamp(6px, 1vw, 12px)",
              gridTemplateColumns: `repeat(${D_COLS}, minmax(0, 1fr))`,
              ...(isTablet && !isMobile ? {
                position: "absolute",
                inset: 0,
              } : {}),
              ...(isMobile ? {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)",
                width: "190vw",
                gap: "clamp(8px, 2vw, 14px)",
              } : {}),
            }}
          >
            {Array.from({ length: D_ROWS * D_COLS }).map((_, idx) => {
              const r = Math.floor(idx / D_COLS);
              const c = idx % D_COLS;
              const logo = desktopCells.find((l) => l.r === r && l.c === c);
              const inTextZone = isDesktopTextZone(r, c);
              const showEmpty = !inTextZone && cellHash(r, c) > 0.35;

              if (inTextZone) return <div key={idx} style={{ aspectRatio: "1" }} aria-hidden />;

              if (logo) {
                const Icon = logo.Icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isSmall ? { opacity: 1, scale: 1 } : undefined}
                    whileInView={!isSmall ? { opacity: 1, scale: 1 } : undefined}
                    viewport={!isSmall ? { once: true } : undefined}
                    transition={{ duration: 0.4, delay: isSmall ? 0 : (r + c) * 0.03, ease: "easeOut" }}
                    style={{
                      aspectRatio: "1",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.32)",
                    }}
                  >
                    <Icon style={{ width: "45%", height: "45%", color: "#c9a84c" }} strokeWidth={1.5} />
                  </motion.div>
                );
              }

              if (!showEmpty) return <div key={idx} style={{ aspectRatio: "1" }} aria-hidden />;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isSmall ? { opacity: 1, scale: 1 } : undefined}
                  whileInView={!isSmall ? { opacity: 1, scale: 1 } : undefined}
                  viewport={!isSmall ? { once: true } : undefined}
                  transition={{ duration: 0.4, delay: isSmall ? 0 : (r + c) * 0.03, ease: "easeOut" }}
                  style={{
                    aspectRatio: "1",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                />
              );
            })}
          </div>

          {/* Radial vignette — darkens center for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(6,13,24,0.82) 0%, rgba(6,13,24,0.45) 55%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Overlay content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                letterSpacing: "4px",
                color: "#c9a84c",
                fontWeight: 600,
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "20px",
                padding: "4px 14px",
                marginBottom: "1.25rem",
                background: "rgba(9,17,31,0.7)",
                backdropFilter: "blur(8px)",
              }}
            >
              CUSTOM PLAN
            </span>

            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#f0ece0",
                marginBottom: "0.75rem",
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                lineHeight: 1.2,
              }}
            >
              Need Something Tailored?
            </h2>

            <p
              style={{
                color: "#b8b4a8",
                fontSize: "15px",
                lineHeight: 1.75,
                maxWidth: "400px",
                marginBottom: "2rem",
              }}
            >
              Specific resources, compliance needs, multi-site setups, or
              complex infrastructure — tell us what you need and we'll scope
              a plan around you within 24 hours.
            </p>

            <Button to="/contact/?type=custom" variant="filled" color="gold" size="lg">
              Request a Custom Quote →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══ 5–7. TESTIMONIALS · FAQ · CTA ══ */}
      <Testimonials />
      <FAQSection />
      <CTASection />
    </div>
  );
}
