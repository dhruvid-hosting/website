'use client'
import { motion } from "framer-motion";
import { Link2, Megaphone, Banknote, RefreshCw } from "lucide-react";
import Button from "./Button";
import useBreakpoint from "../hooks/useBreakpoint";

const commissionData = [
  { plan: "Starter",          firstSale: "Not eligible", recurring: "Not eligible", eligible: false },
  { plan: "Business Starter", firstSale: "20%",          recurring: "10% / renewal", eligible: true },
  { plan: "Growth Pro",       firstSale: "25%",          recurring: "15% / renewal", eligible: true },
  { plan: "Scale Pro",        firstSale: "30%",          recurring: "20% / renewal", eligible: true },
];

const tierData = [
  { clients: "10+ clients",  bonus: "+5%",  example: "₹1,000 earned → ₹1,050" },
  { clients: "30+ clients",  bonus: "+10%", example: "₹1,000 earned → ₹1,100" },
  { clients: "60+ clients",  bonus: "+15%", example: "₹1,000 earned → ₹1,150" },
  { clients: "100+ clients", bonus: "+20%", example: "₹1,000 earned → ₹1,200" },
];

const steps = [
  { num: "01", Icon: Link2,     title: "Apply & Get Your Link",    desc: "Sign up for the affiliate programme. We review and approve within 24 hours. You get a unique tracking link." },
  { num: "02", Icon: Megaphone, title: "Share With Your Network",  desc: "Share your link with clients, on your website, social media, or as a value-add to your existing services." },
  { num: "03", Icon: Banknote,  title: "Earn on Every Sale",       desc: "When a referred client purchases, you earn your first-sale commission — tracked automatically in your dashboard." },
  { num: "04", Icon: RefreshCw, title: "Recurring Monthly Income", desc: "As long as your referred client stays with Dhruvid, you earn a recurring commission on every renewal." },
];

// 100 clients · Business Starter · Annual ₹1,999
// First sale 20% = ₹39,980 · Recurring 10% = ₹19,990/yr
// Performance bonus 100+ = +20% on earned
// Bonus on first sale = ₹7,996 · Bonus on recurring = ₹3,998/yr
const breakdown = [
  { label: "Total plan value (₹1,999 × 100)",         value: "₹1,99,900",  highlight: false },
  { label: "First sale commission (20%)",              value: "₹39,980",    highlight: false },
  { label: "Performance bonus on sale (+20%)",         value: "+ ₹7,996",   highlight: false },
  { label: "Recurring per year (10% on renewals)",     value: "₹19,990 /yr",highlight: false },
  { label: "Performance bonus on recurring (+20%)",    value: "+ ₹3,998 /yr",highlight: false },
];

const thStyle = {
  padding: "1.25rem 1.5rem",
  fontSize: "15px",
  fontWeight: 700,
  color: "#2e2518",
  letterSpacing: "0",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  textAlign: "left",
  background: "#f0ece0",
};

const tdStyle = (isLast) => ({
  padding: "1rem 1.5rem",
  fontSize: "13.5px",
  color: "#1a1612",
  borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.06)",
  verticalAlign: "middle",
});

export default function AffiliateContent() {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;
  return (
    <div>

      {/* ══ HERO ══ */}
      <section style={{ background: "#f9f5e8", paddingTop: "9rem", paddingBottom: "5rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label" style={{ color: "#AF8100", fontSize: "11px", letterSpacing: "4px", marginBottom: "0.85rem", display: "block" }}>
            Partner Programme
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Rosarivo', serif", color: "#1a1612", marginBottom: "1.5rem" }}>
            Earn While You Refer.
            <br /><em style={{ color: "#AF8100", fontStyle: "italic" }}>Every Renewal.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "17px", color: "#6b6150", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            Recommend Dhruvid to your clients, audience, or network — and earn real commissions every month they stay with us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Button to="/contact/?type=affiliate" variant="filled" color="gold" size="lg">Apply to the Programme →</Button>
          </motion.div>
        </div>
      </section>

      {/* ══ COMMISSION TABLE ══ */}
      <section style={{ background: "#f0ece0", padding: "5rem 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
            <span className="section-label" style={{ color: "#AF8100", fontSize: "12px", letterSpacing: "4px", display: "block", marginBottom: "0.75rem" }}>
              Commission Rates
            </span>
            <h2 style={{ color: "#1a1612" }}>What You Earn</h2>
            <p style={{ color: "#6b6150" }}>
              First-sale commission is paid once on signup. Recurring commission is paid on every renewal for the lifetime of the client.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ borderRadius: "20px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 24px rgba(0,0,0,0.06)", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "480px", borderCollapse: "collapse", background: "#fff", borderRadius: "20px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#f3ede0" }}>
                  <th style={thStyle}>Plan</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>First Sale Commission</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Recurring Commission</th>
                </tr>
              </thead>
              <tbody>
                {commissionData.map((row, i) => {
                  const isLast = i === commissionData.length - 1;
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#faf8f4" }}>
                      <td style={{ ...tdStyle(isLast), fontWeight: 500 }}>{row.plan}</td>
                      <td style={{ ...tdStyle(isLast), textAlign: "center", fontWeight: row.eligible ? 700 : 400, color: row.eligible ? "#5c4200" : "#a09888" }}>
                        {row.firstSale}
                      </td>
                      <td style={{ ...tdStyle(isLast), textAlign: "center", fontWeight: row.eligible ? 700 : 400, color: row.eligible ? "#5c4200" : "#a09888" }}>
                        {row.recurring}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ PERFORMANCE TIERS ══ */}
      <section style={{ background: "#f9f5e8", padding: "clamp(3rem, 7vw, 5rem) 0", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
            <span className="section-label" style={{ color: "#AF8100", fontSize: "12px", letterSpacing: "4px", display: "block", marginBottom: "0.75rem" }}>
              Performance Bonuses
            </span>
            <h2 style={{ color: "#1a1612" }}>The More You Refer, the More You Earn</h2>
            <p style={{ color: "#6b6150" }}>
              Bonus applies on top of your earned commission — not the plan value. Stacks automatically as your referral base grows.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ borderRadius: "20px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 24px rgba(0,0,0,0.06)", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: isSmall ? "280px" : "480px", borderCollapse: "collapse", background: "#fff", borderRadius: "20px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#f3ede0" }}>
                  <th style={thStyle}>Active Referred Clients</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Bonus on Earned Commission</th>
                  {!isSmall && <th style={{ ...thStyle, textAlign: "right" }}>Example</th>}
                </tr>
              </thead>
              <tbody>
                {tierData.map((row, i) => {
                  const isLast = i === tierData.length - 1;
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#faf8f4" }}>
                      <td style={{ ...tdStyle(isLast), fontWeight: 500 }}>{row.clients}</td>
                      <td style={{ ...tdStyle(isLast), textAlign: "center", fontWeight: 700, color: "#5c4200" }}>{row.bonus}</td>
                      {!isSmall && <td style={{ ...tdStyle(isLast), textAlign: "right", color: "#6b6150" }}>{row.example}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ background: "#f0ece0", padding: "5rem 0", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-header">
            <span className="section-label" style={{ color: "#AF8100", fontSize: "12px", letterSpacing: "4px", display: "block", marginBottom: "0.75rem" }}>
              How It Works
            </span>
            <h2 style={{ color: "#1a1612" }}>Simple, Transparent, Automated</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1.25rem" }}>
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "1.75rem", position: "relative" }}>
                <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontFamily: "'Rosarivo', serif", fontSize: "1.5rem", color: "rgba(175,129,0,0.1)", fontWeight: 700, lineHeight: 1 }}>
                  {step.num}
                </span>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <step.Icon size={20} strokeWidth={1.5} style={{ color: "#9a7820" }} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1612", marginBottom: "0.5rem" }}>{step.title}</h3>
                <p style={{ fontSize: "13.5px", color: "#6b6150", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EARNINGS EXAMPLE (dark) ══ */}
      <section style={{ background: "#060d18", padding: "5rem 0", borderTop: "1px solid rgba(201,168,76,0.08)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-6%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 65%)", filter: "blur(72px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-6%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,122,32,0.16) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "4px", color: "#c9a84c", fontWeight: 600, marginBottom: "0.75rem" }}>
              EARNINGS EXAMPLE
            </span>
            <h2 style={{ fontFamily: "'Rosarivo', serif", color: "#f0ece0", marginBottom: "0.75rem" }}>
              What 100 Clients Looks Like
            </h2>
            <p style={{ color: "#b8b4a8", fontSize: "15px" }}>
              Business Starter · Annual plan (₹1,999/year each) · 100+ performance tier
            </p>
          </motion.div>

          {/* Two hero numbers */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1.25rem", maxWidth: "720px", margin: "0 auto 2.5rem" }}>
            {[
              { label: "Year 1 Total Payout",       sub: "First sale + performance bonus",       value: "₹47,976",      note: "one-time" },
              { label: "Annual Passive Income",      sub: "Recurring + performance bonus / year", value: "₹23,988",      note: "every year after" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "18px", padding: "2rem 1.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#8a8678", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase" }}>{stat.label}</div>
                <div style={{ fontFamily: "'Rosarivo', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#c9a84c", lineHeight: 1.1, marginBottom: "0.35rem" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#6b6150", marginBottom: "0.35rem" }}>{stat.sub}</div>
                <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 600, letterSpacing: "1px" }}>{stat.note}</div>
              </motion.div>
            ))}
          </div>

          {/* Breakdown table */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
            style={{ maxWidth: "720px", margin: "0 auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "16px", overflow: "hidden" }}>
            {breakdown.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5rem", padding: "0.95rem 1.5rem", borderBottom: i < breakdown.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ fontSize: "13.5px", color: "#b8b4a8", flexShrink: 1, minWidth: 0 }}>{item.label}</span>
                <span style={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, color: item.value.startsWith("+") ? "#c9a84c" : "#f0ece0" }}>{item.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5rem", padding: "1.1rem 1.5rem", background: "rgba(201,168,76,0.08)", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
              <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#f0ece0", flexShrink: 1, minWidth: 0 }}>Year 1 total payout</span>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#c9a84c", whiteSpace: "nowrap", flexShrink: 0 }}>₹47,976</span>
            </div>
          </motion.div>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#6b6150", marginTop: "1.25rem" }}>
            Numbers based on annual billing. Recurring commissions apply on every subsequent renewal for the lifetime of the client.
          </p>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: "#f9f5e8", padding: "6rem 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
            <span style={{ display: "block", fontSize: "11px", letterSpacing: "4px", color: "#AF8100", fontWeight: 600, marginBottom: "0.85rem" }}>
              GET STARTED
            </span>
            <h2 style={{ fontFamily: "'Rosarivo', serif", color: "#1a1612", marginBottom: "1rem" }}>
              Ready to Partner With Us?
            </h2>
            <p style={{ color: "#6b6150", fontSize: "15px", lineHeight: 1.7, marginBottom: "2rem" }}>
              Join the Dhruvid affiliate programme and start earning from day one. No minimum referrals. No complicated terms.
            </p>
            <Button to="/contact/?type=affiliate" variant="filled" color="gold" size="lg">
              Apply to Affiliate Programme
            </Button>
            <p style={{ fontSize: "12px", color: "#9a9088", marginTop: "1rem" }}>
              We review applications within 24 hours. Commission tracked automatically via your dashboard.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
