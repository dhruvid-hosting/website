"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "What is web hosting?",
    answer:
      "Web hosting is a service that allows your website to be accessible on the internet. When you buy hosting, your website files are stored on a server that people can access anytime.",
  },
  {
    question: "Which plan should I choose?",
    answer:
      "If you're just starting out, Hosting is a great choice. For growing websites that need better performance, Business Hosting is ideal. If you prefer a hands-off experience, our Managed Hosting takes care of everything for you.",
  },
  {
    question: "Do I need technical knowledge to use hosting services?",
    answer:
      "Most hosting services today are designed to be user-friendly, so you can get started with minimal technical knowledge. As you use it, you’ll naturally learn more about managing your website over time. If you prefer a completely hands-off experience, you can also choose a managed hosting option where everything is handled for you, from setup to ongoing maintenance.",
  },
  {
    question: "Will my website be fast and reliable?",
    answer:
      "Yes. Our servers use modern infrastructure with performance optimization to ensure fast loading speeds and consistent uptime. We also include a free CDN on all plans to further boost your site's performance globally.",
  },
  {
    question: "Do you provide email hosting?",
    answer:
      "Yes, all our hosting plans include email hosting. You can create custom email addresses using your domain (e.g., john@yourdomain.com).",
  },
  {
    question: "How do I access my email?",
    answer:
      "You can access your email through webmail or set it up with your preferred email client (like Outlook or Apple Mail) using our provided IMAP/POP3 settings.",
  },
  {
    question: "Can you migrate my existing website?",
    answer:
      "Yes, free migration is included on all plans. Our team handles the transfer from your current host with zero downtime. Just open a support ticket once you've signed up.",
  },
  {
    question: "What happens after my initial term ends?",
    answer:
      "At the end of your initial term, your plan will automatically renew at the regular price. We offer clear, upfront pricing with no hidden fees, so you can be confident about what you'll pay at renewal.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Our refund policy varies by service and billing term. Please review our Billing & Refunds policy for full details, or contact us before purchasing if you have questions about eligibility.",
  },
  {
    question: "Is my website secure?",
    answer:
      "All plans include Imunify360 real-time malware protection, a Web Application Firewall, CageFS account isolation, CloudLinux, brute-force protection, and daily/weekly backups — active by default, no add-ons required.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade your hosting plan at any time. If you find that you need more resources or features, simply contact our support team, and we'll assist you with the upgrade process.",
  },
  {
    question: "What is Managed Hosting?",
    answer:
      "Managed Hosting is a premium service where we take care of all the technical aspects of hosting for you. This includes server management, security, updates, and performance optimization, allowing you to focus on your website without any hassle.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Just choose the hosting plan that best fits your needs, click the 'Get Started' button, and follow the signup process. If you have any questions along the way, our support team is here to help.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Yes, our team is available to help you with setup, issues, and guidance whenever you need it.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        background: "#f8f6f1",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "clamp(3rem, 7vw, 5rem) 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem 5rem",
            alignItems: "start",
          }}
        >
          {/* Left — sticky header */}
          <div style={{ position: "sticky", top: "6rem", zIndex: 2, background: "#f8f6f1", paddingBottom: "2rem" }}>
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
              Got Questions
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Rosarivo', serif",
                color: "#1a1612",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              Frequently Asked
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ color: "#6b6150", fontSize: "15px", lineHeight: 1.7 }}
            >
              Everything you need to know about our hosting plans, pricing, and
              support.
            </motion.p>
          </div>

          {/* Right — accordion */}
          <div>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  ...(index === 0
                    ? { borderTop: "1px solid rgba(0,0,0,0.08)" }
                    : {}),
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: "100%",
                    padding: "1.5rem 0",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: openIndex === index ? "#1a1612" : "#4a3f30",
                      transition: "color 0.2s",
                    }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        color: openIndex === index ? "#a07a20" : "#b0a090",
                      }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2, ease: "easeInOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          paddingBottom: "1.5rem",
                          paddingRight: "2rem",
                          fontSize: "14px",
                          color: "#6b6150",
                          lineHeight: 1.75,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
