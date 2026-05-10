"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const rows = [
  {
    feature: "Renewal price",
    dhruvid: { text: "Same as signup", type: "win" },
    hostinger: { text: "Up to 4× higher", type: "lose" },
    godaddy: { text: "Up to 3× higher", type: "lose" },
    bluehost: { text: "Up to 3× higher", type: "lose" },
  },
  {
    feature: "Server location",
    dhruvid: { text: "EU (global)", type: "win" },
    hostinger: { text: "Varies by region", type: "neutral" },
    godaddy: { text: "US-centric", type: "neutral" },
    bluehost: { text: "US-centric", type: "neutral" },
  },
  {
    feature: "Control panel",
    dhruvid: { text: "cPanel (standard)", type: "win" },
    hostinger: { text: "Custom hPanel", type: "lose" },
    godaddy: { text: "cPanel", type: "win" },
    bluehost: { text: "cPanel", type: "win" },
  },
  {
    feature: "Web server",
    dhruvid: { text: "LiteSpeed Enterprise", type: "win" },
    hostinger: { text: "LiteSpeed (some)", type: "lose" },
    godaddy: { text: "Apache", type: "lose" },
    bluehost: { text: "Apache", type: "lose" },
  },
  {
    feature: "Storage type",
    dhruvid: { text: "NVMe SSD", type: "win" },
    hostinger: { text: "SSD (some NVMe)", type: "neutral" },
    godaddy: { text: "SSD", type: "neutral" },
    bluehost: { text: "SSD", type: "neutral" },
  },
  {
    feature: "Free SSL",
    dhruvid: { text: true, type: "win" },
    hostinger: { text: true, type: "win" },
    godaddy: { text: false, type: "lose" },
    bluehost: { text: true, type: "win" },
  },
  {
    feature: "Daily backups",
    dhruvid: { text: "Weekly + daily", type: "win" },
    hostinger: { text: "Weekly (basic)", type: "neutral" },
    godaddy: { text: false, type: "lose" },
    bluehost: { text: "Weekly (basic)", type: "neutral" },
  },
  {
    feature: "Malware protection",
    dhruvid: { text: "Imunify360", type: "win" },
    hostinger: { text: "Basic scanner", type: "neutral" },
    godaddy: { text: false, type: "lose" },
    bluehost: { text: "Basic", type: "neutral" },
  },
  {
    feature: "Free migration",
    dhruvid: { text: true, type: "win" },
    hostinger: { text: true, type: "win" },
    godaddy: { text: false, type: "lose" },
    bluehost: { text: "1 site only", type: "neutral" },
  },
  {
    feature: "Managed option",
    dhruvid: { text: true, type: "win" },
    hostinger: { text: false, type: "lose" },
    godaddy: { text: false, type: "lose" },
    bluehost: { text: false, type: "lose" },
  },
  {
    feature: "Python & Node.js",
    dhruvid: { text: true, type: "win" },
    hostinger: { text: true, type: "win" },
    godaddy: { text: "Limited", type: "neutral" },
    bluehost: { text: "Limited", type: "neutral" },
  },
  {
    feature: "Account isolation",
    dhruvid: { text: "CageFS + CloudLinux", type: "win" },
    hostinger: { text: "Basic isolation", type: "neutral" },
    godaddy: { text: "Basic", type: "neutral" },
    bluehost: { text: "Basic", type: "neutral" },
  },
];

const TYPE_STYLES = {
  win: { color: "#7a5c00", fontWeight: 600 },
  lose: { color: "#9a4040", fontWeight: 400 },
  neutral: { color: "#6b6150", fontWeight: 400 },
};

function Cell({ value, isUs, isLast }) {
  const style = TYPE_STYLES[value.type] ?? TYPE_STYLES.neutral;
  const content =
    typeof value.text === "boolean" ? (
      value.text ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: isUs ? "#a07a20" : "#c8c0b0",
          }}
        >
          <Check size={13} strokeWidth={3} style={{ color: "#fff" }} />
        </span>
      ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#e8e0d4",
          }}
        >
          <X size={13} strokeWidth={3} style={{ color: "#b0a898" }} />
        </span>
      )
    ) : (
      <span style={{ fontSize: "13px", ...style }}>{value.text}</span>
    );

  return (
    <td
      style={{
        padding: "1rem 1.25rem",
        textAlign: "center",
        verticalAlign: "middle",
        borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.06)",
        background: isUs ? "rgba(160,122,32,0.06)" : "transparent",
      }}
    >
      {content}
    </td>
  );
}

export default function ComparisonTable() {
  return (
    <section
      style={{
        background: "#f8f6f1",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "clamp(3rem, 7vw, 5rem) 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span
            className="section-label"
            style={{ color: "#AF8100", fontSize: "12px", letterSpacing: "4px", display: "block", marginBottom: "0.75rem" }}
          >
            How We Compare
          </span>
          <h2 style={{ color: "#1a1612" }}>
            Why Switch To{" "}
            <em style={{ color: "#a07a20", fontStyle: "italic" }}>Dhruvid?</em>
          </h2>
          <p style={{ color: "#6b6150" }}>
            We benchmarked ourselves against the most popular hosting brands.
            Here's the honest comparison — no asterisks.
          </p>
        </motion.div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse", background: "#fff", borderRadius: "20px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#f3ede0" }}>
                <th
                  style={{
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#6b5c40",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    width: "28%",
                  }}
                >
                  Feature
                </th>
                {[
                  { label: "Dhruvid ✦", isUs: true },
                  { label: "Hostinger", isUs: false },
                  { label: "GoDaddy", isUs: false },
                  { label: "Bluehost", isUs: false },
                ].map(({ label, isUs }) => (
                  <th
                    key={label}
                    style={{
                      padding: "1.25rem 1.25rem",
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: isUs ? "#7a5c00" : "#2e2518",
                      letterSpacing: "0",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      background: isUs ? "rgba(160,122,32,0.08)" : "transparent",
                    }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isLast = i === rows.length - 1;
                return (
                  <tr
                    key={row.feature}
                    style={{ background: i % 2 === 0 ? "#fff" : "#faf8f4" }}
                  >
                    <td
                      style={{
                        padding: "1rem 1.5rem",
                        fontSize: "13.5px",
                        fontWeight: 500,
                        color: "#1a1612",
                        borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {row.feature}
                    </td>
                    <Cell value={row.dhruvid} isUs={true} isLast={isLast} />
                    <Cell value={row.hostinger} isUs={false} isLast={isLast} />
                    <Cell value={row.godaddy} isUs={false} isLast={isLast} />
                    <Cell value={row.bluehost} isUs={false} isLast={isLast} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            marginTop: "0.75rem",
            color: "#a09888",
          }}
        >
          Competitor data based on publicly available pricing and feature pages as of 2025. Renewal pricing reflects standard published rates.
        </p>
      </div>
    </section>
  );
}
