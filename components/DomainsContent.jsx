'use client'
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Globe, Shield, Lock, RefreshCw, FileText, Server, Headphones, Zap } from "lucide-react";
import DomainSearchBar from "./DomainSearchBar";
import { checkDomains, stripTld } from "../lib/domainApi";
import { RETAIL_PRICES, getRetailPrice } from "../lib/domainPricing";
import useBreakpoint from "../hooks/useBreakpoint";
import useCurrency from "../hooks/useCurrency";
import Button from "./Button";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

function registerPath(domain, tld, isPremium) {
  return `/domains/register/?domain=${encodeURIComponent(domain)}&tld=${encodeURIComponent(tld)}${isPremium ? "&premium=1" : ""}`;
}

/* ── Loading skeleton card ── */
function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {[60, 40, 80].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 0 ? "18px" : "14px",
            width: `${w}%`,
            background: "rgba(255,255,255,0.07)",
            borderRadius: "6px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}

/* ── Result card for one TLD ── */
function ResultCard({ result, symbol }) {
  const router = useRouter();
  const { domain, tld, available, premium, isPremium, retail } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: available
          ? "linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(255,255,255,0.03) 100%)"
          : "rgba(255,255,255,0.025)",
        border: available
          ? "1px solid rgba(201,168,76,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* TLD badge + availability */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: available ? "#c9a84c" : "#4a5568",
            fontWeight: 600,
          }}
        >
          .{tld.toUpperCase()}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            fontWeight: 600,
            color: available ? "#4caf50" : "#ef5350",
          }}
        >
          {available ? (
            <><CheckCircle2 size={13} /> Available</>
          ) : (
            <><XCircle size={13} /> Taken</>
          )}
        </span>
      </div>

      {/* Domain name */}
      <p
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: available ? "#f0ece0" : "#4a5568",
          margin: 0,
          wordBreak: "break-all",
        }}
      >
        {domain}
      </p>

      {/* Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        {retail ? (
          <span style={{ fontSize: "14px", fontWeight: 700, color: available ? "#c9a84c" : "#4a5568" }}>
            {symbol}{retail.currency === "INR" ? retail.price.toLocaleString("en-IN") : retail.price}/{retail.period}
          </span>
        ) : (
          <span />
        )}
        {available && (
          <button
            onClick={() => router.push(registerPath(domain.split(".")[0], tld, isPremium))}
            style={{
              padding: "0.45rem 1rem",
              background: "#c9a84c",
              border: "none",
              borderRadius: "8px",
              color: "#09111f",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            Register →
          </button>
        )}
        {!available && (
          <span style={{ fontSize: "12px", color: "#4a5568" }}>Not available</span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Static pricing table shown before any search ── */
const TLD_META = {
  com:     { desc: "Global standard",      popular: true },
  in:      { desc: "India's choice",       popular: true },
  "co.in": { desc: "Indian business",      popular: false },
  net:     { desc: "Network & tech",       popular: false },
  org:     { desc: "NGOs & communities",   popular: false },
  io:      { desc: "Startups & SaaS",      popular: true },
  store:   { desc: "E-commerce",           popular: false },
  online:  { desc: "Always available",     popular: false },
};

const EXTRA_TLDS = [
  ".shop", ".tech", ".info", ".biz", ".co", ".app", ".dev", ".agency",
  ".studio", ".digital", ".media", ".cloud", ".site", ".website", ".blog",
  ".solutions", ".services", ".consulting", ".design", ".finance",
];

function PricingPreview({ currency, symbol, isMobile }) {
  const tlds = Object.entries(RETAIL_PRICES);
  const cheapest = tlds.reduce((min, [, info]) => {
    const price = currency === "INR" ? info.INR : info.USD;
    return price < min ? price : min;
  }, Infinity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "#c9a84c",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          DOMAIN PRICING
        </span>
        <h2
          style={{
            fontFamily: "'Rosarivo', serif",
            color: "#f0ece0",
            marginBottom: "0.6rem",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
          }}
        >
          Popular Extensions
        </h2>
        <p style={{ color: "#8a8678", fontSize: "15px", lineHeight: 1.7 }}>
          Starting at{" "}
          <strong style={{ color: "#c9a84c" }}>
            {symbol}{currency === "INR" ? cheapest.toLocaleString("en-IN") : cheapest}/yr
          </strong>{" "}
          — search any name above to check availability instantly.
        </p>
      </div>

      {/* TLD cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {tlds.map(([tld, info], i) => {
          const meta = TLD_META[tld] || {};
          const price = currency === "INR" ? info.INR : info.USD;
          return (
            <motion.div
              key={tld}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              style={{
                background: meta.popular
                  ? "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(255,255,255,0.03) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: meta.popular
                  ? "1px solid rgba(201,168,76,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                position: "relative",
              }}
            >
              {meta.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    fontSize: "9px",
                    letterSpacing: "1.5px",
                    fontWeight: 700,
                    color: "#c9a84c",
                    background: "rgba(201,168,76,0.12)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  POPULAR
                </span>
              )}
              <span
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  fontWeight: 700,
                  fontFamily: "'Rosarivo', serif",
                  color: "#f0ece0",
                  lineHeight: 1,
                }}
              >
                .{tld}
              </span>
              <span style={{ fontSize: "12px", color: "#6b7a8d" }}>{meta.desc}</span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#c9a84c",
                  marginTop: "0.35rem",
                }}
              >
                {symbol}{currency === "INR" ? price.toLocaleString("en-IN") : price}
                <span style={{ fontSize: "11px", fontWeight: 400, color: "#8a8678" }}>/yr</span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* More TLDs row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              fontFamily: "'Rosarivo', serif",
              color: "#c9a84c",
              lineHeight: 1,
            }}
          >
            500+
          </div>
          <div style={{ fontSize: "12px", color: "#8a8678", marginTop: "4px", letterSpacing: "1px" }}>
            more options
          </div>
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#6b7a8d",
            lineHeight: 2,
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          .shop · .tech · .info · .biz · .co · .app · .dev · .agency · .studio · .digital · .media · .cloud · .site · .website · .blog · and many more…
        </div>
      </div>

      <p style={{ marginTop: "1.25rem", fontSize: "12px", color: "#4a5568", textAlign: "center" }}>
        Free SSL certificate included · DNS management via cPanel · No hidden fees
      </p>
    </motion.div>
  );
}

export default function DomainsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isMobile, isTablet } = useBreakpoint();
  const { symbol, currency } = useCurrency();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedName, setSearchedName] = useState("");

  const q = searchParams.get("q") ?? "";

  const runSearch = useCallback(async (name) => {
    const clean = stripTld(name);
    if (!clean) return;
    setSearchedName(clean);
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await checkDomains(clean);
      const withCurrency = data.map((r) => ({
        ...r,
        retail: getRetailPrice(r.tld, r.resellerPrice, currency),
      }));
      setResults(withCurrency);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  // Auto-search when URL has ?q=
  useEffect(() => {
    if (q) runSearch(q);
  }, [q, runSearch]);

  const handleSearch = (name) => {
    const url = `/domains/?q=${encodeURIComponent(name)}`;
    if (!!q) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <div>
      {/* ── Light Hero ── */}
      <section
        style={{
          background: "#f9f5e8",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
              START TODAY
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
              Own Your Corner
              <br />
              <em style={{ color: "#AF8100", fontStyle: "italic" }}>
                of the Internet.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "18px",
                maxWidth: "520px",
                color: "#6b6150",
                marginBottom: "2.25rem",
                margin: "0 auto 2.25rem",
              }}
            >
              Search availability across all popular extensions — instantly.
              Your perfect domain name is just a search away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ width: "min(720px, 100%)", margin: "0 auto" }}
            >
              <DomainSearchBar
                onSearch={handleSearch}
                placeholder="Type a name, e.g. mybusiness"
                size="lg"
                initialValue={q}
                theme="light"
              />
            </motion.div>

            {/* ── Results panel — expands hero when searching ── */}
            <AnimatePresence>
              {(loading || error || results) && (
                <motion.div
                  key="results-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    marginTop: "2rem",
                    background: "#09111f",
                    borderRadius: "20px",
                    border: "1px solid rgba(201,168,76,0.15)",
                    padding: "1.75rem",
                    width: "min(960px, 100%)",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "left",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {/* Loading */}
                    {loading && (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8a8678", fontSize: "14px", marginBottom: "1.5rem" }}>
                          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                          Checking availability for <strong style={{ color: "#f0ece0" }}>{searchedName}</strong>...
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1rem" }}>
                          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                      </motion.div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                      <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ textAlign: "center", padding: "3rem", background: "rgba(239,83,80,0.07)", border: "1px solid rgba(239,83,80,0.2)", borderRadius: "16px", color: "#ef5350" }}>
                        <XCircle size={32} style={{ marginBottom: "1rem", opacity: 0.7 }} />
                        <p style={{ fontSize: "15px", margin: 0 }}>{error}</p>
                      </motion.div>
                    )}

                    {/* Results */}
                    {!loading && results && (
                      <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p style={{ color: "#8a8678", fontSize: "14px", marginBottom: "1.5rem" }}>
                          Showing results for{" "}
                          <strong style={{ color: "#f0ece0" }}>{searchedName}</strong>
                          {" · "}
                          <span style={{ color: "#4caf50" }}>{results.filter((r) => r.available).length} available</span>
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1rem" }}>
                          {results.map((r) => <ResultCard key={r.tld} result={r} symbol={symbol} />)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* ── Why Choose Dhruvid for Your Domain ── */}
      <section
        style={{
          background: "#f0ece0",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "clamp(3rem, 7vw, 5rem) 0",
        }}
      >
        <div className="container">
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
              Why Dhruvid
            </span>
            <h2 style={{ color: "#1a1612", marginBottom: "0.5rem" }}>
              Everything Your Domain{" "}
              <em style={{ color: "#a07a20", fontStyle: "italic" }}>Needs</em>
            </h2>
            <p
              style={{
                color: "#6b6150",
                fontSize: "16px",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              More than just registration — full domain management, security, and support included.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
          >
            {[
              {
                Icon: Globe,
                title: "Instant Availability Check",
                desc: "Check your domain across all popular extensions simultaneously — results in seconds, no waiting.",
              },
              {
                Icon: Server,
                title: "Free DNS Management",
                desc: "Full DNS control via cPanel — create A records, CNAMEs, MX records, and more at no extra cost.",
              },
              {
                Icon: Lock,
                title: "Free SSL Certificate",
                desc: "Every domain registered with us comes with a free SSL certificate to keep your site secure from day one.",
              },
              {
                Icon: RefreshCw,
                title: "No Renewal Surprises",
                desc: "Renewal pricing is displayed upfront. What you see is what you pay — no introductory bait-and-switch.",
              },
              {
                Icon: FileText,
                title: "GST-Compliant Invoices",
                desc: "Every transaction generates a proper GST invoice — suitable for businesses claiming input tax credit.",
              },
              {
                Icon: Headphones,
                title: "Support When You Need It",
                desc: "Our team is available to assist with domain transfers, DNS setup, email configuration, and more.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(160,122,32,0.08)",
                    border: "1px solid rgba(160,122,32,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={20} strokeWidth={1.5} style={{ color: "#a07a20" }} />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1a1612",
                      marginBottom: "0.4rem",
                      letterSpacing: 0,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#6b6150" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark — TLD pricing showcase (always visible) ── */}
      <div style={{ background: "#09111f" }}>
        <section style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
          <div className="container">
            <PricingPreview currency={currency} symbol={symbol} isMobile={isMobile} />
          </div>
        </section>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA → Hosting ── */}
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
                    cx="293" cy="293" r="290.5"
                    stroke="#a07a20" strokeWidth="4" strokeDasharray="20 20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                  <motion.circle
                    cx="293" cy="293" r="236.5"
                    stroke="#a07a20" strokeWidth="4" strokeDasharray="20 20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                  <motion.circle
                    cx="293" cy="293" r="182.5"
                    stroke="#a07a20" strokeWidth="4" strokeDasharray="20 20"
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
                    width: "100px", height: "100px", borderRadius: "20px",
                    background: "#F3EBD4", border: "1px solid #ECDFBC",
                    display: "flex", alignItems: "center", justifyContent: "center",
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
                    width: "120px", height: "120px", borderRadius: "24px",
                    background: "#EFE6C9", border: "1px solid #E7D8AD",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Zap strokeWidth={1} style={{ width: "48px", height: "48px", color: "#a07a20" }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    width: "100px", height: "100px", borderRadius: "20px",
                    background: "#F3EBD4", border: "1px solid #ECDFBC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: "18px",
                  }}
                >
                  <Shield strokeWidth={1} style={{ width: "38px", height: "38px", color: "#a07a20" }} />
                </motion.div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-55px", left: 0, right: 0,
                  height: "190px", pointerEvents: "none", zIndex: 3,
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
                style={{ fontSize: "12px", letterSpacing: "4px", color: "#a07a20", marginBottom: "0.6rem" }}
              >
                COMPLETE YOUR PRESENCE
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ color: "#1a1612", marginBottom: "0.75rem", textAlign: "left" }}
              >
                A Great Domain Deserves{" "}
                <em style={{ color: "#a07a20", fontStyle: "italic" }}>
                  Great Hosting.
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
                Pair your new domain with LiteSpeed Enterprise hosting, NVMe SSD
                storage, cPanel, and free SSL — starting at ₹56/month. No
                hidden pricing, no renewal hikes.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button to="/hosting/" variant="filled" color="dark" size="lg">
                  View Hosting Plans
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
