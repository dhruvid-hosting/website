'use client'
import { useState } from "react";
import { createPortal } from "react-dom";
import useBreakpoint from "../hooks/useBreakpoint";
import useCurrency from "../hooks/useCurrency";
import { HOSTING_PLANS, HOSTING_BILLING_PERIODS, hostingBillingLabel } from "../lib/pricing";
import { motion } from "framer-motion";
import {
  Check,
  Minus,
  Info,
  Server,
  Shield,
  Mail,
  Cpu,
  Settings,
  Wrench,
  Globe,
  Zap,
} from "lucide-react";
import Button from "./Button";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";


const comparisonData = [
  {
    category: "RESOURCES",
    items: [
      { feature: "Websites", values: ["1", "3", "5", "10"] },
      { feature: "NVMe SSD Storage", values: ["3 GB", "10 GB", "20 GB", "30 GB"] },
      { feature: "Bandwidth", values: ["20 GB/mo", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Email Accounts", values: ["2", "10", "15", "25"] },
      { feature: "Email Attachment Size", values: ["50 MB", "50 MB", "50 MB", "50 MB"] },
      { feature: "MySQL Databases", values: ["2", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Subdomains", values: ["5", "20", "50", "100"] },
      { feature: "Parked Domains", values: ["1", "5", "10", "20"] },
      { feature: "Addon Domains", values: ["0", "2", "4", "9"] },
      { feature: "FTP Accounts", values: ["2", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Mailing Lists", values: [false, "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Team Users", values: ["2", "3", "5", "7"] },
      { feature: "Hourly Email Limit", values: ["50/hr", "100/hr", "100/hr", "100/hr"] },
    ],
  },
  {
    category: "FEATURES",
    items: [
      { feature: "LiteSpeed Server", values: [true, true, true, true] },
      { feature: "LSCache", values: [true, true, true, true] },
      { feature: "HTTP/2", values: [true, true, true, true] },
      { feature: "Free SSL", values: [true, true, true, true] },
      { feature: "cPanel Access", values: [true, true, true, true] },
      { feature: "Website Builder", values: [false, true, true, true] },
      { feature: "One-Click App Installer", values: [true, true, true, true] },
      { feature: "WordPress Staging", values: [false, true, true, true] },
      { feature: "WP-CLI", values: [true, true, true, true] },
      { feature: "Git Version Control", values: [false, true, true, true] },
      { feature: "Python & Node.js", values: [false, false, true, true] },
    ],
  },
  {
    category: "SECURITY",
    items: [
      { feature: "Real-time Malware Scanner", values: [true, true, true, true] },
      { feature: "WAF + IP Firewall", values: [true, true, true, true] },
      { feature: "BitNinja Security", values: [true, true, true, true] },
      { feature: "CageFS + CloudLinux", values: [true, true, true, true] },
      { feature: "Brute-force Protection", values: [true, true, true, true] },
      { feature: "Account Isolation", values: [true, true, true, true] },
      { feature: "2FA on cPanel", values: [true, true, true, true] },
      { feature: "SpamAssassin", values: [true, true, true, true] },
      { feature: "SPF & DKIM", values: [true, true, true, true] },
    ],
  },
  {
    category: "EXTRAS",
    items: [
      { feature: "Backups", values: ["Monthly", "Weekly", "Weekly", "Weekly"] },
      { feature: "Free Migration", values: [true, true, true, true] },
      { feature: "Free Domain", values: [false, "3-Year plan only", "Annual & 3-Year", "Annual & 3-Year"] },
      { feature: "Priority Support", values: [false, true, true, true] },
      { feature: "Uptime SLA", values: ["99.9%", "99.9%", "99.9%", "99.9%"] },
      { feature: "Money-Back", values: ["7 days", "7 days", "7 days", "7 days"] },
      { feature: "Renewal Price", values: ["Renew at same price ✦", "Renew at same price ✦", "Renew at same price ✦", "Renew at same price ✦"] },
    ],
  },
];

const specData = [
  {
    Icon: Cpu,
    title: "Per Account Resources",
    blob: "rgba(201,168,76,0.55)",
    items: [
      "100% CPU (1 Core)",
      "2 GB RAM",
      "100 NPROC (Processes)",
      "10 Mbit/s I/O Limit",
      "5,000 IOPS",
      "20 Entry Processes",
    ],
  },
  {
    Icon: Server,
    title: "Server Technology",
    blob: "rgba(56,189,248,0.55)",
    items: [
      "LiteSpeed Enterprise",
      "CloudLinux OS",
      "MariaDB 10.3+",
      "PHP 4.4 – 8.2",
      "HTTP/2 enabled",
      "OPCache + Gzip",
    ],
  },
  {
    Icon: Shield,
    title: "Security Stack",
    blob: "rgba(168,139,250,0.55)",
    items: [
      "Imunify360 real-time",
      "WAF + IP Firewall",
      "CageFS isolation",
      "Brute-force protection",
      "ModSecurity",
      "2FA on cPanel",
    ],
  },
  {
    Icon: Mail,
    title: "Email Infrastructure",
    blob: "rgba(52,211,153,0.55)",
    items: [
      "IMAP / POP3 / SMTP",
      "RoundCube Webmail",
      "SPF, DKIM, DMARC",
      "SpamAssassin",
      "100 emails/hour",
      "50 MB attachment limit",
    ],
  },
];

function CellValue({ val }) {
  if (val === true)
    return (
      <Check
        size={15}
        strokeWidth={2.5}
        style={{ color: "#c9a84c", margin: "0 auto" }}
      />
    );
  if (val === false)
    return (
      <Minus
        size={14}
        strokeWidth={2}
        style={{ color: "rgba(0,0,0,0.2)", margin: "0 auto" }}
      />
    );
  return <span>{val}</span>;
}
function SpecCard({ spec, index }) {
  const Icon = spec.Icon;
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "16px",
        padding: "1.75rem",
        minHeight: "220px",
      }}
    >
      <div>
        {/* Icon box */}
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
        {/* Title */}
        <h4
          style={{
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "'Rosarivo', serif",
            color: "#1a1612",
            lineHeight: 1.3,
            marginBottom: "1rem",
            letterSpacing: 0,
          }}
        >
          {spec.title}
        </h4>
        {/* Items */}
        <ul style={{ listStyle: "none" }}>
          {spec.items.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: "13px",
                color: "#6b6150",
                lineHeight: 1.75,
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontSize: "10px",
                  color: "#AF8100",
                  paddingTop: "3px",
                }}
              >
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function HostingPlanCard({ plan, billingPeriod, currency, symbol, index }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const showTooltip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top - 8 });
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        background: plan.popular ? "linear-gradient(180deg, rgba(201,168,76,0.05) 0%, #faf7f2 40%)" : "#faf7f2",
        border: plan.popular ? "1.5px solid rgba(201,168,76,0.55)" : "1px solid rgba(0,0,0,0.09)",
        borderRadius: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: plan.popular ? "0 4px 24px rgba(201,168,76,0.14)" : "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {plan.popular && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", padding: "5px 0", fontSize: "9px", letterSpacing: "2px", fontWeight: 700, whiteSpace: "nowrap", background: "linear-gradient(135deg, #c9a84c, #9a7820)", color: "#09111f" }}>
          ⭐ MOST POPULAR
        </div>
      )}
      {plan.premium && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", padding: "5px 0", fontSize: "9px", letterSpacing: "2px", fontWeight: 700, whiteSpace: "nowrap", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "#fff" }}>
          ⚡ PREMIUM PERFORMANCE
        </div>
      )}

      {/* TOP — fixed-height content so button aligns across cards */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2.5rem 1.75rem 1.5rem" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: plan.popular ? "#a07a20" : "#6b6150", marginBottom: "1.1rem" }}>
          {plan.name}
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "2px" }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#1a1612", alignSelf: "flex-start", paddingTop: "6px" }}>{symbol}</span>
            <span style={{ fontSize: "clamp(2.4rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Rosarivo', serif", color: "#1a1612", lineHeight: 1 }}>{plan.prices[billingPeriod][currency]}</span>
            <span style={{ fontSize: "13px", color: "#9a9088" }}>/mo</span>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#9a9088", marginBottom: "0.35rem" }}>{hostingBillingLabel(plan, billingPeriod, currency, symbol)}</div>
        <div style={{ fontSize: "11px", color: "#a07a20", marginBottom: "1rem" }}>✦ Renew at same price</div>
        {/* Fixed 2-line height so button y-position is the same across all cards */}
        <p style={{ fontSize: "13px", color: "#6b6150", lineHeight: 1.6, marginBottom: "1.25rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "calc(1.6em * 2)", width: "100%" }}>
          {plan.desc}
        </p>
        <a
          href={`https://manage.dhruvid.com/store/hosting/${plan.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: "block", width: "100%", textAlign: "center", padding: "12px",
            borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
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
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "5px 0", fontSize: "13px", color: f.ok ? "#2a2520" : "#c0bab4" }}>
            {f.ok ? <Check size={13} strokeWidth={2.5} style={{ color: "#c9a84c", flexShrink: 0 }} /> : <Minus size={13} strokeWidth={2} style={{ color: "#d8d2cc", flexShrink: 0 }} />}
            {f.text}
            {f.tooltip && (
              <Info
                size={11}
                strokeWidth={1.5}
                style={{ color: "#9a9088", cursor: "pointer", flexShrink: 0, marginLeft: "2px" }}
                onMouseEnter={(e) => showTooltip(e, f.tooltip)}
                onMouseLeave={hideTooltip}
                onClick={(e) => { e.stopPropagation(); tooltip ? hideTooltip() : showTooltip(e, f.tooltip); }}
              />
            )}
          </li>
        ))}
      </ul>
      {tooltip && createPortal(
        <div style={{ position: "fixed", left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)", background: "#0a1628", border: "1px solid rgba(79,163,255,0.2)", borderRadius: "8px", padding: "8px 12px", fontSize: "11px", color: "#b0c4d8", lineHeight: 1.5, maxWidth: "220px", zIndex: 9999, boxShadow: "0 4px 16px rgba(0,0,0,0.5)", pointerEvents: "none" }}>
          {tooltip.text}
        </div>,
        document.body
      )}
    </motion.div>
  );
}
export default function HostingContent() {
  const [billingPeriod, setBillingPeriod] = useState("triennial");
  const { isMobile, isTablet } = useBreakpoint();
  const { currency, symbol } = useCurrency();
  const startingPrice = HOSTING_PLANS[0].prices.triennial[currency];
  const startingLabel = `${symbol}${currency === "INR" ? startingPrice.toLocaleString("en-IN") : startingPrice}/month`;

  return (
    <div>
      {/* ══ 1+2. HERO + PLANS (merged) ══ */}
      <section
        id="plans"
        style={{
          background: "#f9f5e8",
          paddingBottom: "5.5rem",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* ── Hero text ── */}
          <div
            style={{
              paddingTop: "9rem",
              textAlign: "center",
              paddingBottom: "3.75rem",
            }}
          >
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
              Web Hosting
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
              Web Hosting Plans
              <br />
              <em style={{ color: "#AF8100", fontStyle: "italic" }}>
                Starting from {startingLabel}.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{
                fontSize: "18px",
                maxWidth: "580px",
                color: "#6b6150",
                marginBottom: "2.25rem",
                margin: "0 auto 2.25rem",
              }}
            >
              LiteSpeed Enterprise · NVMe SSD · cPanel · EU Servers · Free SSL.
              Enterprise infrastructure at every tier — no corner-cutting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
                fontSize: "16px",
                color: "#9a9088",
              }}
            >
              {[
                "Free SSL",
                "99.9% uptime SLA",
                "Free migration",
                "No renewal hikes",
                "7-day money back",
              ].map((t) => (
                <div key={t}>
                  <span style={{ color: "#a07a20", marginRight: 6 }}>✦</span>
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Billing toggle ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "3rem",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{
                display: "inline-flex",
                flexShrink: 0,
                background: "rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.11)",
                borderRadius: "13px",
                padding: "4px",
                maxWidth: "100%",
              }}
            >
              {HOSTING_BILLING_PERIODS.map((period) => (
                <button
                  key={period.key}
                  onClick={() => setBillingPeriod(period.key)}
                  style={{
                    padding: isMobile ? "7px 9px" : "9px 18px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: isMobile ? "11.5px" : "13px",
                    fontWeight: billingPeriod === period.key ? 600 : 400,
                    transition: "all 0.2s ease",
                    background:
                      billingPeriod === period.key ? "#1a1612" : "transparent",
                    color: billingPeriod === period.key ? "#f8f4ec" : "#6b6150",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {period.label}
                  {period.save && (
                    <span
                      style={{
                        fontSize: "9px",
                        background:
                          billingPeriod === period.key
                            ? "rgba(201,168,76,0.25)"
                            : "#c9a84c",
                        color:
                          billingPeriod === period.key ? "#c9a84c" : "#09111f",
                        padding: isMobile ? "1px 4px" : "2px 6px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {period.save}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* ── Plan cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: "1.25rem",
              alignItems: "stretch",
            }}
          >
            {HOSTING_PLANS.map((plan, index) => (
              <HostingPlanCard
                key={plan.name}
                plan={plan}
                billingPeriod={billingPeriod}
                currency={currency}
                symbol={symbol}
                index={index}
              />
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
            All plans include 7-day money back guarantee · Instant activation · No hidden fees
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9a9088",
              marginTop: "0.5rem",
            }}
          >
            Not sure which plan is right for you? Start on any plan and upgrade anytime — no downtime, no data loss, instant activation.
          </p>
        </div>
      </section>

      {/* ══ 3. CUSTOM + MANAGED — 2 cards ══ */}
      <section
        style={{
          background: "#060d18",
          padding: "clamp(3rem, 7vw, 5rem) 0",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">More Options</span>
            <h2
              style={{
                color: "#f0ece0",
                fontFamily: "'Rosarivo', serif",
                marginBottom: "1.25rem",
              }}
            >
              Not a perfect fit? We've got you covered.
            </h2>
            <p style={{ color: "#b8b4a8" }}>
              Custom infrastructure for unique requirements, or a fully managed
              experience if you'd rather not touch the tech.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {/* Custom Plan card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "20px",
                padding: "2.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Settings
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: "#c9a84c" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "#c9a84c",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  CUSTOM PLAN
                </div>
                <h3
                  style={{
                    color: "#f0ece0",
                    fontFamily: "'Rosarivo', serif",
                    marginBottom: "0.75rem",
                  }}
                >
                  Need Something Tailored?
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#b8b4a8",
                    lineHeight: 1.75,
                  }}
                >
                  Higher storage, more processing power, custom PHP limits,
                  additional IPs, or unique server configurations — if the
                  standard plans don't fit, we'll build one that does.
                </p>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {[
                  "Custom CPU & RAM allocation",
                  "Higher storage quotas",
                  "Custom PHP & server config",
                  "Dedicated resources on request",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "9px",
                      fontSize: "13px",
                      color: "#8a8678",
                      alignItems: "center",
                    }}
                  >
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                <Button to="/contact/" variant="filled" color="gold">
                  Get a Custom Quote →
                </Button>
              </div>
            </motion.div>

            {/* Managed Plan card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "20px",
                padding: "2.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Wrench
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: "#c9a84c" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "#c9a84c",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  MANAGED HOSTING
                </div>
                <h3
                  style={{
                    color: "#f0ece0",
                    fontFamily: "'Rosarivo', serif",
                    marginBottom: "0.75rem",
                  }}
                >
                  Rather Have Us Handle It?
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#b8b4a8",
                    lineHeight: 1.75,
                  }}
                >
                  Full server management, security hardening, email
                  configuration, software updates, and backup verification —
                  everything handled by our team so you can focus on your
                  business.
                </p>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {[
                  "Full server & cPanel setup",
                  "Security hardening & monitoring",
                  "Software & platform updates",
                  "Backup monitoring & restoration",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "9px",
                      fontSize: "13px",
                      color: "#8a8678",
                      alignItems: "center",
                    }}
                  >
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                <Button to="/managed/" variant="filled" color="gold">
                  View Managed Plans →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 4. DETAILED COMPARISON — pricing-8 style ══ */}
      <section
        style={{
          background: "#ede9df",
          padding: "5.5rem 0",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label" style={{ color: "#AF8100" }}>
              Full Breakdown
            </span>
            <h2 style={{ color: "#1a1612", marginBottom: "1.25rem" }}>
              Every Feature, Side by Side
            </h2>
            <p style={{ color: "#6b6150" }}>
              Full specification across all four plans — choose with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              overflowX: "auto",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.09)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "680px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "18px 20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#9a9088",
                      background: "#faf7f2",
                      borderBottom: "2px solid rgba(0,0,0,0.08)",
                      width: "30%",
                    }}
                  >
                    Feature
                  </th>
                  {HOSTING_PLANS.map((plan) => (
                    <th
                      key={plan.name}
                      style={{
                        textAlign: "center",
                        padding: "18px 12px",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#1a1612",
                        background: "#faf7f2",
                        borderBottom: "2px solid rgba(0,0,0,0.08)",
                        borderLeft: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((section, si) => (
                  <>
                    <tr key={`cat-${si}`}>
                      <td
                        colSpan={5}
                        style={{
                          padding: "12px 20px",
                          fontSize: "11px",
                          letterSpacing: "3px",
                          color: "#AF8100",
                          background: "rgba(175,129,0,0.06)",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          borderTop: "1px solid rgba(0,0,0,0.06)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((row, ri) => (
                      <tr key={`${si}-${ri}`} style={{ background: "#faf7f2" }}>
                        <td
                          style={{
                            padding: "12px 20px",
                            fontSize: "13px",
                            color: "#3a3530",
                            borderBottom: "1px solid rgba(0,0,0,0.05)",
                            textAlign: "left",
                          }}
                        >
                          {row.feature}
                        </td>
                        {row.values.map((val, vi) => (
                          <td
                            key={vi}
                            style={{
                              padding: "12px 12px",
                              fontSize: "13px",
                              color: "#3a3530",
                              borderBottom: "1px solid rgba(0,0,0,0.05)",
                              borderLeft: "1px solid rgba(0,0,0,0.04)",
                              textAlign: "center",
                            }}
                          >
                            <CellValue val={val} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. UNDER THE HOOD ══ */}
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
              Under the Hood
            </span>
            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "1.25rem",
              }}
            >
              Enterprise Infrastructure on Every Plan
            </h2>
            <p style={{ color: "#6b6150" }}>
              Every account runs on the same enterprise-grade stack — no
              corner-cutting on lower tiers.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: "1.25rem",
            }}
          >
            {specData.map((spec, index) => (
              <SpecCard key={index} spec={spec} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* ══ 6–8. TESTIMONIALS · FAQ · CTA ══ */}
      <Testimonials />
      <FAQSection />

      {/* ══ CTA ══ */}
      <section
        style={{
          background: "#f9f5e8",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "5rem 0 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {/* Left — animation */}
            <div style={{ position: "relative", height: "190px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "300px",
                  height: "300px",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 586 586"
                  fill="none"
                  style={{ opacity: 0.22 }}
                >
                  <motion.circle
                    cx="293"
                    cy="293"
                    r="290.5"
                    stroke="#a07a20"
                    strokeWidth="4"
                    strokeDasharray="20 20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                  <motion.circle
                    cx="293"
                    cy="293"
                    r="236.5"
                    stroke="#a07a20"
                    strokeWidth="4"
                    strokeDasharray="20 20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                  <motion.circle
                    cx="293"
                    cy="293"
                    r="182.5"
                    stroke="#a07a20"
                    strokeWidth="4"
                    strokeDasharray="20 20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                </svg>
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 1,
                  background: "linear-gradient(to right, transparent 55%, #f9f5e8 92%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  zIndex: 2,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    background: "#F3EBD4",
                    border: "1px solid #ECDFBC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "18px",
                  }}
                >
                  <Globe strokeWidth={1} style={{ width: "38px", height: "38px", color: "#a07a20" }} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "24px",
                    background: "#EFE6C9",
                    border: "1px solid #E7D8AD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap strokeWidth={1} style={{ width: "48px", height: "48px", color: "#a07a20" }} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    background: "#F3EBD4",
                    border: "1px solid #ECDFBC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "18px",
                  }}
                >
                  <Shield strokeWidth={1} style={{ width: "38px", height: "38px", color: "#a07a20" }} />
                </motion.div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "-55px",
                  left: 0,
                  right: 0,
                  height: "190px",
                  pointerEvents: "none",
                  zIndex: 3,
                  background: "linear-gradient(to bottom, transparent, #f9f5e8 70%)",
                }}
              />
            </div>

            {/* Right — content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontSize: "12px",
                  letterSpacing: "4px",
                  color: "#a07a20",
                  marginBottom: "0.6rem",
                }}
              >
                GO FURTHER
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ color: "#1a1612", marginBottom: "0.75rem", textAlign: "left" }}
              >
                Let Us Handle{" "}
                <em style={{ color: "#a07a20", fontStyle: "italic" }}>
                  the Hard Part.
                </em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                style={{
                  fontSize: "14px",
                  color: "#6b6150",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  maxWidth: "380px",
                }}
              >
                Fully managed hosting with hands-on setup, monitoring, and
                support. Focus on growing your business — we'll keep everything
                running.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button to="/managed/" variant="filled" color="dark" size="lg">
                  See Managed Plans
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
