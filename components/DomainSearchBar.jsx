'use client'
import { useState } from "react";
import { Search } from "lucide-react";
import { stripTld } from "../lib/domainApi";

export default function DomainSearchBar({
  onSearch,
  placeholder = "Search for your domain...",
  size = "normal",
  initialValue = "",
  theme = "dark",
}) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const isLarge = size === "lg";
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = stripTld(value);
    if (name) onSearch(name);
  };

  const inputStyle = isDark
    ? {
        background: focused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
        border: `1.5px solid ${focused ? "rgba(201,168,76,0.75)" : "rgba(201,168,76,0.25)"}`,
        color: "#f0ece0",
        boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.12)" : "none",
      }
    : {
        background: focused ? "#fff" : "rgba(255,255,255,0.85)",
        border: `1.5px solid ${focused ? "#a07a20" : "rgba(26,22,18,0.18)"}`,
        color: "#1a1612",
        boxShadow: focused ? "0 0 0 3px rgba(160,122,32,0.14)" : "none",
      };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        maxWidth: isLarge ? "680px" : "520px",
        width: "100%",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={isDark ? "search-input-dark" : "search-input-light"}
        style={{
          flex: 1,
          padding: isLarge ? "1rem 1.25rem" : "0.75rem 1rem",
          fontSize: isLarge ? "16px" : "14px",
          borderRight: "none",
          borderRadius: "10px 0 0 10px",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          ...inputStyle,
        }}
      />
      <button
        type="submit"
        style={{
          padding: isLarge ? "1rem 1.5rem" : "0.75rem 1.25rem",
          background: "#c9a84c",
          border: "1.5px solid #c9a84c",
          borderRadius: "0 10px 10px 0",
          color: "#09111f",
          fontWeight: 700,
          fontSize: isLarge ? "15px" : "13px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#b8943e"; e.currentTarget.style.borderColor = "#b8943e"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.borderColor = "#c9a84c"; }}
      >
        <Search size={isLarge ? 16 : 14} />
        Search
      </button>
    </form>
  );
}
