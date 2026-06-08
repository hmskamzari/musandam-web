"use client";

import { useState } from "react";

interface Props {
  title: string;
  slug: string;
}

const SITE = "https://musandam.net";

export default function ShareBar({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined"
    ? window.location.href
    : `${SITE}/article/${slug}`;

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      key: "whatsapp",
      label: "واتساب",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      bg: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.51 5.827L.057 23.428a.5.5 0 0 0 .609.61l5.71-1.456A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.94a9.94 9.94 0 0 1-5.065-1.38l-.364-.215-3.764.96.993-3.664-.237-.376A9.944 9.944 0 0 1 2.06 12C2.06 6.508 6.508 2.06 12 2.06S21.94 6.508 21.94 12 17.492 21.94 12 21.94z"/>
        </svg>
      ),
    },
    {
      key: "twitter",
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      bg: "#000000",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      key: "facebook",
      label: "فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      bg: "#1877F2",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      ),
    },
    {
      key: "telegram",
      label: "تيليغرام",
      href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
      bg: "#229ED9",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-6 pt-5 border-t border-[--border]">
      <p className="text-xs font-bold text-[--muted] mb-3">شارك هذا الخبر</p>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <a
            key={p.key}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow-sm"
            style={{ background: p.bg }}
          >
            {p.icon}
            {p.label}
          </a>
        ))}

        {/* Copy link */}
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow-sm"
          style={{
            background: copied ? "var(--green)" : "var(--border)",
            color: copied ? "white" : "var(--muted)",
          }}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              تم النسخ!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              نسخ الرابط
            </>
          )}
        </button>
      </div>
    </div>
  );
}
