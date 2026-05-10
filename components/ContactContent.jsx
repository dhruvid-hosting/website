'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Mail, MessageSquare, LifeBuoy, ChevronDown, ArrowRight } from "lucide-react";
import Button from "./Button";
import CTASection from "./CTASection";

const contactMethods = [
  {
    Icon: Mail,
    title: "Email Us",
    desc: "Drop us a line and we'll reply within one business day.",
    cta: "Send an email",
    href: "mailto:support@dhruvid.com",
  },
  {
    Icon: MessageSquare,
    title: "Send a Message",
    desc: "Fill out the form below for sales, billing, or general questions.",
    cta: "Use the form",
    href: "#contact-form",
  },
  {
    Icon: LifeBuoy,
    title: "Support Ticket",
    desc: "Existing clients can raise a support ticket through the Client Area.",
    cta: "Open a ticket",
    href: "https://manage.dhruvid.com/submit-ticket",
  },
];

function ContactMethodCard({ method, index }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = method;

  return (
    <motion.a
      href={method.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "260px",
        padding: "2.5rem 2rem 2rem",
        borderRadius: "20px",
        background: "#ffffff",
        border: `1.5px solid ${hovered ? "rgba(175,129,0,0.4)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.09), 0 4px 12px rgba(175,129,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        textDecoration: "none",
        cursor: "pointer",
        gap: "1.5rem",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Icon with soft radial glow */}
      <div
        style={{
          width: "88px",
          height: "88px",
          borderRadius: "50%",
          background: hovered
            ? "radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.06) 55%, transparent 100%)"
            : "radial-gradient(circle, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.02) 60%, transparent 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.25s ease",
        }}
      >
        <Icon
          size={34}
          strokeWidth={1.4}
          style={{
            color: hovered ? "#c9a84c" : "#b09040",
            transition: "color 0.25s ease",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#1a1612",
            marginBottom: "0.5rem",
            letterSpacing: "-0.1px",
          }}
        >
          {method.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#6b6150", lineHeight: 1.7 }}>
          {method.desc}
        </p>
      </div>

      {/* CTA row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.3px",
          color: hovered ? "#9a7820" : "#c0b898",
          transition: "color 0.25s ease",
        }}
      >
        {method.cta}
        <ArrowRight
          size={13}
          style={{
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.25s ease",
          }}
        />
      </div>
    </motion.a>
  );
}

const labelStyle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#4a3f30",
  letterSpacing: "0.3px",
  textTransform: "uppercase",
};

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function ContactContent() {
  const searchParams = useSearchParams();
  const inquiryType = searchParams.get("type") || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject:
      inquiryType === "affiliate"
        ? "Affiliate Programme"
        : inquiryType === "custom"
        ? "Custom Plan Quote"
        : inquiryType === "managed"
        ? "Managed Hosting"
        : "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you within one business day.");
  };

  return (
    <div>
      {/* ══ HERO ══ */}
      <section
        style={{
          background: "#f9f5e8",
          paddingTop: "9rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
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
            Get in Touch
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
            We're Here to Help.
            <br />
            <em style={{ color: "#AF8100", fontStyle: "italic" }}>Always.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "17px",
              color: "#6b6150",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Questions about hosting, managed services, billing, or a custom plan? We reply within one business day.
          </motion.p>
        </div>
      </section>

      {/* ══ CONTACT METHODS + FORM ══ */}
      <section
        id="contact-methods"
        style={{
          scrollMarginTop: "80px",
          background: "#f8f6f1",
          padding: "5rem 0 6rem",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Cards */}
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: "center",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#AF8100",
              fontWeight: 600,
              marginBottom: "2.5rem",
            }}
          >
            REACH US VIA
          </motion.p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              justifyContent: "center",
              marginBottom: "5rem",
            }}
          >
            {contactMethods.map((method, index) => (
              <ContactMethodCard key={index} method={method} index={index} />
            ))}
          </div>
        </div>

        {/* Divider with label */}
        <div
          style={{
            maxWidth: "580px",
            margin: "0 auto 4rem",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#b0a890",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            OR WRITE TO US
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Form */}
        <div
          id="contact-form"
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "0 1.5rem",
            scrollMarginTop: "80px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", marginBottom: "2.25rem" }}
          >
            <h2
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "0.65rem",
              }}
            >
              Send Us a Message
            </h2>
            <p style={{ color: "#6b6150", fontSize: "15px", lineHeight: 1.7 }}>
              No sales script, no follow-up drip — just a real conversation.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSubmit}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.055)",
            }}
          >
            {/* Gold accent bar */}
            <div style={{ height: "3px", background: "linear-gradient(90deg, #c9a84c, #9a7820, #c9a84c)" }} />

            <div style={{ padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
                <FormField label="First name *">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First name" className="contact-input" />
                </FormField>
                <FormField label="Last name">
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="contact-input" />
                </FormField>
              </div>

              {/* Email */}
              <FormField label="Email address *">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="contact-input" />
              </FormField>

              {/* Subject */}
              <FormField label="Subject *">
                <div style={{ position: "relative" }}>
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="contact-input" style={{ appearance: "none", WebkitAppearance: "none", paddingRight: "2.5rem", cursor: "pointer" }}>
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sales Question">Sales Question</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing">Billing</option>
                    <option value="Affiliate Programme">Affiliate Programme</option>
                    <option value="Managed Hosting">Managed Hosting</option>
                    <option value="Custom Plan Quote">Custom Plan Quote</option>
                  </select>
                  <ChevronDown size={15} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9a9088", pointerEvents: "none" }} />
                </div>
              </FormField>

              {/* Message */}
              <FormField label="Message *">
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help..." className="contact-input" style={{ resize: "vertical", minHeight: "120px" }} />
              </FormField>

              {/* Submit */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.875rem", paddingTop: "0.25rem" }}>
                <Button type="submit" variant="filled" color="gold" size="lg" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message
                </Button>
                <p style={{ fontSize: "11.5px", color: "#a09888", textAlign: "center", lineHeight: 1.6 }}>
                  By sending this you agree to our{" "}
                  <a href="/terms/" style={{ color: "#6b6150", textDecoration: "underline" }}>Terms</a>
                  {" "}and{" "}
                  <a href="/privacy/" style={{ color: "#6b6150", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </div>

            </div>
          </motion.form>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <CTASection />
    </div>
  );
}
