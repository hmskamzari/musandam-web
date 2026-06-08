"use client";

import Link from "next/link";
import type { Category } from "@/lib/queries";

/* One stroke-weight icon per section — 2px stroke, round caps/joins, no fill */
const SECTION_CONFIG: Record<number, { icon: React.ReactNode; color: string; bg: string }> = {
  1000: {
    color: "#29b9c7",
    bg: "rgba(41,185,199,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
      </svg>
    ),
  },
  1010: {
    color: "#ffc200",
    bg: "rgba(255,194,0,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
  },
  1020: {
    color: "#e6177a",
    bg: "rgba(230,23,122,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  1030: {
    color: "#3a8a3a",
    bg: "rgba(58,138,58,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  1040: {
    color: "#29b9c7",
    bg: "rgba(41,185,199,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  1050: {
    color: "#c8a000",
    bg: "rgba(200,160,0,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 20h20M5 20V8l7-5 7 5v12"/>
        <path d="M9 20v-5h6v5"/>
        <path d="M9 8h.01M15 8h.01"/>
      </svg>
    ),
  },
  1060: {
    color: "#e6177a",
    bg: "rgba(230,23,122,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
};

export default function CategoriesGrid({ sections }: { sections: Category[] }) {
  return (
    <section className="mb-8">
      <h2 className="section-title mb-5">استكشف الأقسام</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {sections.map((cat, i) => {
          const cfg = SECTION_CONFIG[cat.id];
          if (!cfg) return null;
          const { icon, color, bg } = cfg;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="cat-card group flex flex-col items-center gap-2.5 pt-5 pb-4 px-3 rounded-2xl text-center cursor-pointer"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                animationDelay: `${i * 0.07}s`,
                transition: "box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Icon container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-250 group-hover:scale-110"
                style={{ background: bg, color }}
              >
                {icon}
              </div>

              {/* Category name */}
              <span className="text-[0.75rem] font-bold leading-tight" style={{ color: "var(--text-soft)" }}>
                {cat.name_ar}
              </span>

              {/* Accent dot */}
              <div
                className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: color }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
