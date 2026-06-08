"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/queries";
import { stripHtml } from "@/lib/utils";

interface Props {
  mainSections: Category[];
  subMap: Record<number, Category[]>;
}

/* Inline SVG icons — no emojis */
const IconHome = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
  </svg>
);
const IconNews = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
  </svg>
);
const IconCoverage = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="currentColor"
    className="w-3 h-3 opacity-60 shrink-0 transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "none" }}>
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

export default function NavBar({ mainSections, subMap }: Props) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ── Desktop nav ──────────────────────────────────────────────────── */}
      <div
        className="hidden md:block"
        style={{
          background: "linear-gradient(180deg, #222 0%, #1a1a1a 100%)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.3)",
        }}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <nav className="max-w-6xl mx-auto px-4 flex flex-wrap text-sm relative">

          {/* Fixed nav items */}
          <Link href="/"
            className="flex items-center gap-1.5 px-4 py-3 font-black whitespace-nowrap transition-all shrink-0 group"
            style={{ color: "var(--yellow)", borderBottom: "2px solid var(--yellow)" }}>
            الرئيسية
          </Link>

          <Link href="/category/18"
            className="flex items-center gap-1.5 px-4 py-3 font-black whitespace-nowrap transition-all shrink-0"
            style={{ color: "var(--teal)", borderBottom: "2px solid var(--teal)" }}>
            أخبار مسندم
          </Link>

          <Link href="/tghtyat"
            className="flex items-center gap-1.5 px-4 py-3 font-medium whitespace-nowrap transition-all shrink-0 hover:text-white"
            style={{ color: "rgba(255,255,255,0.72)", borderBottom: "2px solid transparent" }}>
            تغطيات
          </Link>

          {/* Divider */}
          {mainSections.length > 0 && (
            <div className="w-px my-2 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
          )}

          {/* Dynamic sections */}
          {mainSections.map((section) => {
            const children = subMap[section.id] ?? [];
            const isHovered = hoveredSection === section.id;
            return (
              <div
                key={section.id}
                className="relative shrink-0 nav-item"
                onMouseEnter={() => setHoveredSection(section.id)}
              >
                <Link
                  href={`/category/${section.slug}`}
                  className="flex items-center gap-1.5 px-4 py-3 whitespace-nowrap font-medium transition-all"
                  style={{
                    color: isHovered ? "white" : "rgba(255,255,255,0.72)",
                    borderBottom: isHovered ? "2px solid var(--teal)" : "2px solid transparent",
                  }}
                >
                  {stripHtml(section.name_ar)}
                  {children.length > 0 && <IconChevron open={isHovered} />}
                </Link>

                {/* Dropdown — always rendered, toggled via CSS */}
                {children.length > 0 && (
                  <div
                    className="nav-dropdown absolute top-full right-0 min-w-[200px] py-1.5 rounded-b-xl z-[200]"
                    style={{
                      background: "white",
                      borderTop: "3px solid var(--teal)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.slug}`}
                        className="dropdown-link px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                        onClick={() => setHoveredSection(null)}
                      >
                        {stripHtml(child.name_ar)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Mobile bar ───────────────────────────────────────────────────── */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-2.5"
        style={{
          background: "linear-gradient(180deg, #222 0%, #1a1a1a 100%)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/category/18" className="text-xs font-bold" style={{ color: "var(--teal)" }}>أخبار مسندم</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <Link href="/tghtyat" className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>تغطيات</Link>
        </div>

        <button
          aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="block w-5 h-0.5 rounded-full bg-white transition-all" />
          <span className="block w-4 h-0.5 rounded-full bg-white/70 transition-all" />
          <span className="block w-5 h-0.5 rounded-full bg-white transition-all" />
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[300] md:hidden" onClick={close}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease-out both" }} />

          {/* Panel */}
          <div
            className="absolute top-0 right-0 h-full w-4/5 max-w-sm flex flex-col overflow-y-auto"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              animation: "slideInRight 0.28s cubic-bezier(0.16,1,0.3,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-white font-black text-base">القائمة</span>
              <button
                onClick={close}
                aria-label="إغلاق"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Search */}
            <form method="GET" action="/search" className="px-4 pt-4 pb-2">
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                <input
                  type="search" name="q"
                  placeholder="ابحث في أخبار مسندم..."
                  className="flex-1 text-sm px-4 py-2.5 bg-white/8 text-white placeholder-white/40 focus:outline-none focus:bg-white/12 transition-all"
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm text-white font-bold transition-opacity hover:opacity-90"
                  style={{ background: "var(--teal)" }}
                >
                  بحث
                </button>
              </div>
            </form>

            {/* Links */}
            <nav className="flex flex-col px-3 py-2 gap-0.5 flex-1">

              <Link href="/" onClick={close}
                className="flex items-center gap-3 px-3 py-3 rounded-xl font-black text-sm transition-colors hover:bg-white/8"
                style={{ color: "var(--yellow)" }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,194,0,0.12)" }}>
                  <IconHome />
                </span>
                الرئيسية
              </Link>

              <Link href="/category/18" onClick={close}
                className="flex items-center gap-3 px-3 py-3 rounded-xl font-black text-sm transition-colors hover:bg-white/8"
                style={{ color: "var(--teal)" }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(41,185,199,0.12)" }}>
                  <IconNews />
                </span>
                أخبار مسندم
              </Link>

              <Link href="/tghtyat" onClick={close}
                className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-white">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-white/8">
                  <IconCoverage />
                </span>
                تغطيات
              </Link>

              {mainSections.length > 0 && (
                <div className="mx-3 my-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              )}

              {mainSections.map((section) => {
                const children  = subMap[section.id] ?? [];
                const isExpanded = mobileExpanded === section.id;
                return (
                  <div key={section.id}>
                    <div className="flex items-center rounded-xl overflow-hidden transition-colors hover:bg-white/8">
                      <Link
                        href={`/category/${section.slug}`}
                        onClick={close}
                        className="flex-1 flex items-center gap-3 px-3 py-3 text-sm font-medium text-white/80"
                      >
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-white/8">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white/60">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                        {stripHtml(section.name_ar)}
                      </Link>
                      {children.length > 0 && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : section.id)}
                          className="px-3 py-3 text-white/50 hover:text-white transition-colors"
                          aria-label="توسيع"
                        >
                          <IconChevron open={isExpanded} />
                        </button>
                      )}
                    </div>

                    {children.length > 0 && isExpanded && (
                      <div
                        className="mr-6 mb-1 pr-3 border-r"
                        style={{ borderColor: "rgba(41,185,199,0.3)" }}
                      >
                        {children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/category/${child.slug}`}
                            onClick={close}
                            className="block px-3 py-2 text-sm text-white/65 hover:text-white rounded-lg hover:bg-white/8 transition-all"
                          >
                            {stripHtml(child.name_ar)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Drawer footer */}
            <div
              className="px-5 py-4 text-xs text-white/35 text-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              مسندم نت © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
