"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { HOSTING_PLANS, MANAGED_PLANS } from "../lib/pricing";
import useCurrency from "../hooks/useCurrency";

function PlanButton({ to, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        padding: "0.55rem 1.25rem",
        borderRadius: "10px",
        fontSize: "13px",
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


const SHORT = 320;
const TALL = 364;
const CYCLE_MS = 2400;

export default function HostingPlans() {
  const [active, setActive] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currency, symbol } = useCurrency();

  const plans = [
    {
      title: "Hosting Plans",
      desc: "Reliable and affordable hosting to get your website online quickly and smoothly.",
      price: `${symbol}${HOSTING_PLANS[0].prices.triennial[currency]}`,
      period: "/mo",
      cta: "Explore Plans",
      to: "/hosting/",
      bg: "#ddeeff",
      tint: "#1a5a8a",
    },
    {
      title: "Business Hosting",
      desc: "High-performance hosting built for growing businesses that need speed and reliability.",
      price: `${symbol}${HOSTING_PLANS[1].prices.triennial[currency]}`,
      period: "/mo",
      cta: "Explore Plans",
      to: "/hosting/",
      bg: "#fef5d0",
      tint: "#7a5800",
    },
    {
      title: "Managed Hosting",
      desc: "Fully managed setup, maintenance, and support — built for businesses that want zero hassle.",
      price: `${symbol}${MANAGED_PLANS[0].prices.monthly[currency]}`,
      period: "/mo",
      cta: "Explore Plans",
      to: "/managed/",
      bg: "#e6f4ee",
      tint: "#1a5a40",
    },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop || hoveredCard !== null) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % plans.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [isDesktop, hoveredCard]);

  return (
    <section
      style={{
        background: "#f9f5e8",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "clamp(3rem, 7vw, 5rem) 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
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
            Get Started Today
          </span>
          <h2 style={{ color: "#1a1612", marginBottom: "0.5rem" }}>
            A Plan For Every{" "}
            <em style={{ color: "#a07a20", fontStyle: "italic" }}>Business</em>
          </h2>
          <p
            style={{
              color: "#6b6150",
              fontSize: "16px",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            From your first website to a fully managed business presence — we've
            got you covered.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
            gap: "1.25rem",
            alignItems: "flex-end",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => { setActive(i); setHoveredCard(i); }}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                height: isDesktop ? TALL : "auto",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={
                  isDesktop
                    ? {
                        height: active === i ? TALL : SHORT,
                        color: active === i ? "#1a1612" : plan.tint,
                      }
                    : { height: "auto", color: "#1a1612" }
                }
                transition={{
                  opacity: { duration: 0.5, delay: 0.1 * i },
                  y: { duration: 0.5, delay: 0.1 * i },
                  height: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  color: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{
                  backgroundColor: plan.bg,
                  borderRadius: "18px",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    padding: "2rem 2rem 1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                  }}
                >
                  {/* Title */}
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      fontFamily: "'Rosarivo', serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {plan.title}
                  </span>

                  {/* Bottom content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13.5px",
                        lineHeight: 1.7,
                        color: "inherit",
                        opacity: 0.8,
                      }}
                    >
                      {plan.desc}
                    </p>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 700,
                            fontFamily: "'Rosarivo', serif",
                            lineHeight: 1,
                          }}
                        >
                          {plan.price}
                        </span>
                        <span style={{ fontSize: "13px", opacity: 0.55 }}>
                          {plan.period}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "11px",
                          opacity: 0.45,
                          marginTop: "8px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        starting price
                      </p>
                    </div>

                    <PlanButton to={plan.to}>{plan.cta} →</PlanButton>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
