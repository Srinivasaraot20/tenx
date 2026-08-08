"use client";

import { useState, useEffect } from "react";

export default function SocialShare({ url, title, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareUrl = encodeURIComponent(url || currentUrl);
  const shareTitle = encodeURIComponent(title || "");

  function copyLink() {
    const link = url || currentUrl;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: "f" },
    { label: "LinkedIn", href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`, icon: "in" },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`, icon: "𝕏" },
    { label: "WhatsApp", href: `https://wa.me/?text=${shareTitle}%20${shareUrl}`, icon: "💬" },
    { label: "Email", href: `mailto:?subject=${shareTitle}&body=${shareUrl}`, icon: "✉" },
  ];

  return (
    <div className={`social-share ${compact ? "social-share-compact" : ""}`}>
      {!compact && <span className="share-label">Share:</span>}
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label={`Share on ${l.label}`}
        >
          {l.icon}
          {!compact && <span>{l.label}</span>}
        </a>
      ))}
      <button type="button" className="share-btn" onClick={copyLink} aria-label="Copy link">
        {copied ? "✓" : "🔗"}
        {!compact && <span>{copied ? "Copied!" : "Copy Link"}</span>}
      </button>
    </div>
  );
}

