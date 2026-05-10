'use client'
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Globe, BadgeCheck, FileCheck, ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import DomainSearchBar from "./DomainSearchBar";
import { RETAIL_PRICES } from "../lib/domainPricing";
import useBreakpoint from "../hooks/useBreakpoint";
import useCurrency from "../hooks/useCurrency";
import FAQ1 from "./FAQSection";
import SocialProof4 from "./Testimonials";
import CTA3 from "./CTASection";
import Comparison2 from "./ComparisonTable";
import Pricing11 from "./ManagedTeaser";
import Stats11 from "./HostingPlans";
import Features6 from "./FeaturesSection";

const Galaxy = dynamic(() => import("./Galaxy"), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const POPULAR_TLDS = ["com", "in", "co.in", "net"];

export default function HomeContent() {
  const { isMobile } = useBreakpoint();
  const { symbol, currency } = useCurrency();
  const router = useRouter();

  const handleDomainSearch = (name) => {
    router.push(`/domains/?q=${encodeURIComponent(name)}`);
  };
  return (
    <div>
      {/* ══ HERO ══ */}
      <section
        className="hero"
        style={{
          padding: "clamp(6rem, 12vw, 9rem) 0 clamp(3.5rem, 7vw, 6rem)",
          position: "relative",
          overflow: "hidden",
          background: "#09111f",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Galaxy
            transparent={false}
            hueShift={225}
            saturation={0.55}
            density={0.85}
            glowIntensity={0.38}
            twinkleIntensity={0.35}
            rotationSpeed={0.018}
            starSpeed={0.4}
            mouseRepulsion={true}
            mouseInteraction={true}
            repulsionStrength={1.8}
          />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            className="hero-content"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            style={{
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              className="section-label"
              variants={fadeInUp}
              style={{
                color: "#FFD86A",
                fontSize: "11px",
                letterSpacing: "4px",
                marginBottom: "0.75rem",
              }}
            >
              Hosting Optimised For Global Performance
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              style={{
                marginBottom: "1.5rem",
                color: "#f0ece0",
                fontFamily: "'Rosarivo', serif",
              }}
            >
              Grow Your Business,
              <br />
              <em style={{ color: "#c9a84c", fontStyle: "italic" }}>
                We Will Keep It Online.
              </em>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: "18px",
                maxWidth: "600px",
                marginBottom: "2rem",
                color: "#b8b4a8",
              }}
            >
              LiteSpeed Enterprise · NVMe SSD · cPanel · Free SSL · Servers
              optimised for global performance. Consistent pricing. No hidden
              surprises.
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={fadeInUp}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
                justifyContent: "center",
              }}
            >
              <Button to="/hosting/" variant="filled" color="gold" size="lg">
                View Plans — Starting ₹56/mo
              </Button>
              <Button to="/managed/" variant="outlined">
                Need full management? →
              </Button>
            </motion.div>
            <motion.div
              className="hero-trust"
              variants={fadeInUp}
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                fontSize: "16px",
                color: "#8a8678",
                justifyContent: "center",
              }}
            >
              <div>
                <span style={{ color: "#c9a84c", marginRight: "6px" }}>✦</span>{" "}
                Free SSL on all plans
              </div>
              <div>
                <span style={{ color: "#c9a84c", marginRight: "6px" }}>✦</span>{" "}
                99.9% uptime SLA
              </div>
              <div>
                <span style={{ color: "#c9a84c", marginRight: "6px" }}>✦</span>{" "}
                Globally optimised servers
              </div>
              <div>
                <span style={{ color: "#c9a84c", marginRight: "6px" }}>✦</span>{" "}
                No renewal price hikes
              </div>
              <div>
                <span style={{ color: "#c9a84c", marginRight: "6px" }}>✦</span>{" "}
                3-day money back
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ DOMAIN SEARCH ══ */}
      <section
        style={{
          background: "linear-gradient(180deg, #09111f 0%, #060d18 100%)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          padding: "clamp(2.5rem, 5vw, 4rem) 0",
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "#c9a84c" }}>
              ✦ DOMAIN REGISTRATION
            </span>
            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#f0ece0",
                textAlign: "center",
                margin: 0,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              Find Your Perfect Domain
            </h2>
            <p style={{ color: "#8a8678", fontSize: "15px", textAlign: "center", margin: 0 }}>
              Search availability across all popular extensions — instantly.
            </p>

            <DomainSearchBar
              onSearch={handleDomainSearch}
              placeholder="Enter your domain name..."
              size="lg"
            />

            {/* Popular TLD quick-links with prices */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {POPULAR_TLDS.map((tld) => {
                const retail = RETAIL_PRICES[tld];
                const price = retail ? retail[currency] : null;
                return (
                  <button
                    key={tld}
                    onClick={() => router.push("/domains/")}
                    style={{
                      padding: "0.35rem 0.9rem",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "20px",
                      color: "#c9a84c",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.2s",
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.16)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                  >
                    <span>.{tld}</span>
                    {price != null && (
                      <span style={{ color: "#8a7040", fontSize: "11px" }}>
                        {symbol}{price}/{retail.period}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY DHRUVID ══ */}
      <Features6 />

      {/* ══ HOSTING PLANS ══ */}
      <Stats11 />

      {/* ══ COMPETITOR COMPARISON ══ */}
      <Comparison2 />

      {/* ══ ABOUT ══ */}
      <section
        id="about"
        style={{
          padding: "clamp(3rem, 7vw, 5rem) 0",
          background: "#060d18",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blob background */}
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "-8%",
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.32) 0%, transparent 65%)",
            filter: "blur(72px)",
            pointerEvents: "none",
            animation: "blob1 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-8%",
            width: 580,
            height: 580,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(160,122,32,0.28) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            animation: "blob2 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "38%",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            animation: "blob3 9s ease-in-out infinite",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Left — brand story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="section-label"
                style={{
                  fontSize: "11px",
                  letterSpacing: "4px",
                  marginBottom: "0.75rem",
                }}
              >
                About Dhruvid
              </span>
              <h2
                style={{
                  textAlign: "left",
                  marginBottom: "1.25rem",
                  color: "#f0ece0",
                }}
              >
                The north star of your digital presence
              </h2>
              <p style={{ marginBottom: "1rem", color: "#b8b4a8" }}>
                The name <strong style={{ color: "#c9a84c" }}>Dhruvid</strong>{" "}
                is rooted in the Sanskrit word <em>Dhruva</em> — the north star.
                Fixed. Eternal. The star that sailors navigated by for centuries
                because it never moved, never wavered, never failed.
              </p>
              <p style={{ marginBottom: "1rem", color: "#b8b4a8" }}>
                That's the standard we hold our hosting infrastructure to. Your
                website should always be online. Your emails should always send.
                Your clients should always reach you.
              </p>
              <p style={{ marginBottom: 0, color: "#b8b4a8" }}>
                We built Dhruvid for businesses that can't afford downtime — and
                for individuals who deserve the same enterprise infrastructure
                that large companies pay a premium for, at a price that makes
                sense.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Button to="/managed/" variant="outlined">
                  Explore Plans →
                </Button>
              </div>
            </motion.div>

            {/* Right — 2×2 feature grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {[
                {
                  Icon: Globe,
                  title: "Global Infrastructure",
                  desc: "Our servers are located in Europe, delivering fast global performance, strong data protection standards, and reliable connectivity for international audiences.",
                },
                {
                  Icon: FileCheck,
                  title: "Tax-Compliant Billing",
                  desc: "GST-compliant invoices issued for every transaction — suitable for Indian businesses claiming input tax credit.",
                },
                {
                  Icon: BadgeCheck,
                  title: "Transparent Pricing",
                  desc: "What you pay at signup remains consistent for your term — with clear, upfront renewals and no hidden pricing changes.",
                },
                {
                  Icon: ArrowRightLeft,
                  title: "Free Migration Included",
                  desc: "Moving from another host? We handle the transfer of files, databases, and email with minimal downtime and zero hassle.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: "#c9a84c" }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#f0ece0",
                        marginBottom: "0.35rem",
                        letterSpacing: "0",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "#b8b4a8",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MANAGED TEASER ══ */}
      <section
        style={{
          background: "#f8f6f1",
          padding: "clamp(3rem, 7vw, 5rem) 0",
        }}
      >
        <div className="container">
          <Pricing11 />
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <SocialProof4 />

      {/* ══ FAQ ══ */}
      <FAQ1 />

      {/* ══ CTA ══ */}
      <CTA3 />
    </div>
  );
}
