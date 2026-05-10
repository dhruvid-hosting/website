"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import useBreakpoint from "../hooks/useBreakpoint";

const BG = "#f9f5e8";

const allTestimonials = [
  {
    quote: "Switched from GoDaddy three months ago and our load times dropped by half. The LiteSpeed difference is real.",
    name: "Arjun Mehta",
    title: "Founder, Mehta Digital Studio",
  },
  {
    quote: "Finally a host that doesn't charge me triple on renewal. What I signed up for is what I still pay. Simple.",
    name: "Priya Nair",
    title: "E-commerce Store Owner",
  },
  {
    quote: "cPanel, free SSL, Imunify360 — everything I needed came standard. No upsells, no surprises at checkout.",
    name: "Siddharth Rao",
    title: "Web Developer, Bangalore",
  },
  {
    quote: "The managed plan means I never think about my site's backend. Dhruvid handles it while I focus on clients.",
    name: "Kavya Sharma",
    title: "Freelance Consultant",
  },
  {
    quote: "EU servers gave my international clients much faster load times. My Google rankings improved within weeks.",
    name: "Rajan Pillai",
    title: "Digital Marketing Agency",
  },
  {
    quote: "Support ticket was resolved in under two hours. That's the kind of response time I'd expect from enterprise hosting.",
    name: "Deepa Krishnamurthy",
    title: "SaaS Startup Founder",
  },
  {
    quote: "Migrated two client sites free of charge. The team handled everything and both sites went live with zero downtime.",
    name: "Nikhil Joshi",
    title: "WordPress Developer",
  },
  {
    quote: "GST-registered invoices made accounting so much easier. Small thing but incredibly important for a registered business.",
    name: "Ananya Bose",
    title: "Online Retailer",
  },
  {
    quote: "Had a security incident with my old host. Imunify360 on Dhruvid has kept everything clean since day one.",
    name: "Varun Iyer",
    title: "Portfolio & Blog Owner",
  },
  {
    quote: "I was on shared hosting elsewhere and constantly hitting resource limits. Dhruvid's CloudLinux isolation fixed everything.",
    name: "Meera Subramanian",
    title: "NGO Website Manager",
  },
  {
    quote: "NVMe storage is noticeably faster. My WooCommerce store pages feel instant now versus my previous host.",
    name: "Rohan Ghosh",
    title: "WooCommerce Store Owner",
  },
  {
    quote: "The pricing clarity was what sold me first. No asterisks, no intro pricing, just honest numbers upfront.",
    name: "Sneha Kulkarni",
    title: "Blogger & Content Creator",
  },
];

const col1 = allTestimonials.slice(0, 4);
const col2 = allTestimonials.slice(4, 8);
const col3 = allTestimonials.slice(8, 12);

function TestimonialCard({ t }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        borderRadius: "14px",
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.07)",
        padding: "1.25rem 1.25rem 1rem",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}
    >
      <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: "#4a4540", marginBottom: "1rem" }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(160,122,32,0.15))",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 600,
            color: "#a07a20",
            flexShrink: 0,
          }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1612" }}>{t.name}</div>
          <div style={{ fontSize: "11px", color: "#9a9088" }}>{t.title}</div>
        </div>
      </div>
    </div>
  );
}

function ScrollColumn({ items, speed, colRef }) {
  return (
    <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
      <div ref={colRef}>
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
      <div style={{
        pointerEvents: "none", position: "absolute", inset: "0 0 auto 0",
        height: "60px", background: `linear-gradient(to bottom, ${BG}, transparent)`,
      }} />
      <div style={{
        pointerEvents: "none", position: "absolute", inset: "auto 0 0 0",
        height: "60px", background: `linear-gradient(to top, ${BG}, transparent)`,
      }} />
    </div>
  );
}

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint();
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const mobileRef = useRef(null);
  const mobileCol2Ref = useRef(null);

  useEffect(() => {
    const cols = [
      { ref: col1Ref, speed: 0.45 },
      { ref: col2Ref, speed: 0.62 },
      { ref: col3Ref, speed: 0.38 },
      { ref: mobileRef, speed: 0.45 },
      { ref: mobileCol2Ref, speed: 0.62 },
    ];
    const offsets = [0, 0, 0, 0, 0];
    let rafId;

    const tick = () => {
      cols.forEach(({ ref, speed }, i) => {
        const el = ref.current;
        if (!el) return;
        offsets[i] += speed;
        const half = el.scrollHeight / 2;
        if (offsets[i] >= half) offsets[i] -= half;
        el.style.transform = `translateY(-${offsets[i]}px)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      style={{
        background: BG,
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "clamp(3rem, 7vw, 5rem) 0",
        overflow: "hidden",
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
            style={{ color: "#AF8100", fontSize: "12px", letterSpacing: "4px", display: "block", marginBottom: "0.75rem" }}
          >
            Customer Stories
          </span>
          <h2 style={{ color: "#1a1612" }}>Trusted By Real Businesses</h2>
          <p style={{ color: "#6b6150" }}>
            Real feedback from businesses and developers who made the switch.
          </p>
        </motion.div>

        {/* Mobile — 2 columns */}
        <div style={{ display: isMobile ? "grid" : "none", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
            <div ref={mobileRef}>
              {[...col1, ...col1].map((t, i) => <TestimonialCard key={`m1-${i}`} t={t} />)}
            </div>
            <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 auto 0", height: "60px", background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
            <div style={{ pointerEvents: "none", position: "absolute", inset: "auto 0 0 0", height: "60px", background: `linear-gradient(to top, ${BG}, transparent)` }} />
          </div>
          <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
            <div ref={mobileCol2Ref}>
              {[...col2, ...col2].map((t, i) => <TestimonialCard key={`m2-${i}`} t={t} />)}
            </div>
            <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0 auto 0", height: "60px", background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
            <div style={{ pointerEvents: "none", position: "absolute", inset: "auto 0 0 0", height: "60px", background: `linear-gradient(to top, ${BG}, transparent)` }} />
          </div>
        </div>

        {/* Tablet/Desktop — 2 or 3 columns */}
        <div style={{ display: isMobile ? "none" : "grid", gridTemplateColumns: isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "1.25rem" }}>
          <ScrollColumn items={col1} speed={0.45} colRef={col1Ref} />
          <ScrollColumn items={col2} speed={0.62} colRef={col2Ref} />
          {!isTablet && <ScrollColumn items={col3} speed={0.38} colRef={col3Ref} />}
        </div>
      </div>
    </section>
  );
}
