"use client";

import { motion } from "motion/react";
import { Globe, Shield, Zap } from "lucide-react";
import Button from "./Button";

export default function CTASection() {
  return (
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
          {/*
            clipPath inset: negative top/left/right = allow overflow in those directions,
            0 bottom = hard clip at the element's bottom edge.
            This lets the top arcs bleed upward into section padding without being cut,
            while cleanly hiding the bottom ring arcs below the icons.
          */}
          <div
            style={{
              position: "relative",
              height: "190px",
            }}
          >
            {/* SVG rings — centered on the column, behind icon cards */}
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
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ originX: "50%", originY: "50%" }}
                />
              </svg>
            </div>

            {/* Fade right edge into content column */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1,
                background:
                  "linear-gradient(to right, transparent 55%, #f9f5e8 92%)",
              }}
            />

            {/* Icon cards — absolutely centered, on top of rings */}
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
                <Globe
                  strokeWidth={1}
                  style={{ width: "38px", height: "38px", color: "#a07a20" }}
                />
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
                <Zap
                  strokeWidth={1}
                  style={{ width: "48px", height: "48px", color: "#a07a20" }}
                />
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
                <Shield
                  strokeWidth={1}
                  style={{ width: "38px", height: "38px", color: "#a07a20" }}
                />
              </motion.div>
            </div>

            {/* Bottom fade — starts just below icon card bottoms, dissolves rings downward */}
            <div
              style={{
                position: "absolute",
                bottom: "-55px",
                left: 0,
                right: 0,
                height: "190px",
                pointerEvents: "none",
                zIndex: 3,
                background:
                  "linear-gradient(to bottom, transparent, #f9f5e8 70%)",
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
              START TODAY
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                color: "#1a1612",
                marginBottom: "0.75rem",
                textAlign: "left",
              }}
            >
              Your Site Deserves{" "}
              <em style={{ color: "#a07a20", fontStyle: "italic" }}>
                Infrastructure That Holds.
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
              LiteSpeed Enterprise · NVMe SSD · EU servers · Free SSL ·
              Imunify360. Consistent pricing. No hidden surprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Button to="/hosting/" variant="filled" color="dark" size="lg">
                Start Hosting
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
