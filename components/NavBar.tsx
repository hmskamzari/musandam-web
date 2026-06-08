"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/queries";
import { stripHtml } from "@/lib/utils";

interface Props {
  mainSections: Category[];
  subMap: Record<number, Category[]>;
}

export default function NavBar({ mainSections, subMap }: Props) {
  const [desktopOpen, setDesktopOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ── Desktop nav bar ──────────────────────────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ background: "var(--brand-deep)", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative" }}
        onMouseLeave={() => setDesktopOpen(null)}
      >
        <nav className="max-w-6xl mx-auto px-4 flex flex-wrap text-sm">

          <Link href="/"
            className="px-4 py-3 font-black whitespace-nowrap border-b-2 transition-all shrink-0"
            style={{ color: "var(--yellow)", borderColor: "var(--yellow)" }}>
            الرئيسية
          </Link>

          <Link href="/category/18"
            className="px-4 py-3 font-black whitespace-nowrap border-b-2 transition-all shrink-0"
            style={{ color: "var(--teal)", borderColor: "var(--teal)" }}>
            أخبار مسندم
          </Link>

          <Link href="/tghtyat"
            className="px-4 py-3 font-medium whitespace-nowrap border-b-2 border-transparent transition-all shrink-0"
            style={{ color: "rgba(255,255,255,0.8)" }}>
            تغطيات
          </Link>

          {mainSections.map((section) => {
            const children = subMap[section.id] ?? [];
            const isOpen   = desktopOpen === section.id;
            return (
              <div key={section.id} className="relative shrink-0" onMouseEnter={() => setDesktopOpen(section.id)}>
                <Link href={`/category/${section.slug}`}
                  className="flex items-center gap-1 px-4 py-3 whitespace-nowrap border-b-2 border-transparent transition-all font-medium"
                  style={{ color: isOpen ? "white" : "rgba(255,255,255,0.8)", borderColor: isOpen ? "var(--teal)" : "transparent" }}>
                  {stripHtml(section.name_ar)}
                  {children.length > 0 && (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-60 mt-0.5 shrink-0">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  )}
                </Link>
                {children.length > 0 && isOpen && (
                  <div className="absolute top-full right-0 min-w-[190px] py-1 rounded-b-xl z-[200]"
                    style={{ background: "#ffffff", borderTop: "3px solid var(--teal)", boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }}>
                    {children.map((child) => (
                      <Link key={child.id} href={`/category/${child.slug}`}
                        className="dropdown-link block px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                        onClick={() => setDesktopOpen(null)}>
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

      {/* ── Mobile hamburger button ───────────────────────────────────────── */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-2"
        style={{ background: "var(--brand-deep)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>القائمة</span>
        <button
          aria-label="فتح القائمة"
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 p-2 rounded-lg transition-colors"
          style={{ color: "white" }}
        >
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-5 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </button>
      </div>

      {/* ── Mobile drawer overlay ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[300] md:hidden" onClick={close}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Drawer panel — slides in from right (RTL) */}
          <div
            className="absolute top-0 right-0 h-full w-4/5 max-w-sm flex flex-col overflow-y-auto"
            style={{ background: "var(--brand-deep)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-white font-black text-base">القائمة الرئيسية</span>
              <button onClick={close} aria-label="إغلاق" className="text-white/70 hover:text-white p-1 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Search bar */}
            <form method="GET" action="/search" className="px-4 pt-4 pb-2">
              <div className="flex">
                <input
                  type="search" name="q"
                  placeholder="ابحث في أخبار مسندم..."
                  className="flex-1 text-sm px-4 py-2.5 rounded-r-xl bg-white/15 text-white placeholder-white/50 focus:bg-white/20 focus:outline-none transition-all"
                  dir="rtl"
                />
                <button type="submit"
                  className="px-4 py-2.5 rounded-l-xl text-sm text-white font-bold transition-all"
                  style={{ background: "var(--teal)" }}>
                  بحث
                </button>
              </div>
            </form>

            {/* Nav links */}
            <nav className="flex flex-col px-2 py-2 gap-0.5">

              <Link href="/" onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-black text-sm transition-colors hover:bg-white/10"
                style={{ color: "var(--yellow)" }}>
                <span>🏠</span> الرئيسية
              </Link>

              <Link href="/category/18" onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-black text-sm transition-colors hover:bg-white/10"
                style={{ color: "var(--teal)" }}>
                <span>📰</span> أخبار مسندم
              </Link>

              <Link href="/tghtyat" onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-white/85 transition-colors hover:bg-white/10">
                <span>🎯</span> تغطيات
              </Link>

              {/* Divider */}
              {mainSections.length > 0 && (
                <div className="mx-4 my-1 border-t border-white/10" />
              )}

              {mainSections.map((section) => {
                const children  = subMap[section.id] ?? [];
                const isExpanded = mobileExpanded === section.id;
                return (
                  <div key={section.id}>
                    <div className="flex items-center rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                      <Link href={`/category/${section.slug}`} onClick={close}
                        className="flex-1 flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/85">
                        <span>▸</span> {stripHtml(section.name_ar)}
                      </Link>
                      {children.length > 0 && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : section.id)}
                          className="px-3 py-3 text-white/60 hover:text-white transition-colors"
                          aria-label="توسيع"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}>
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      )}
                    </div>

                    {children.length > 0 && isExpanded && (
                      <div className="mr-4 mb-1 border-r-2 pr-3" style={{ borderColor: "var(--teal)" }}>
                        {children.map((child) => (
                          <Link key={child.id} href={`/category/${child.slug}`} onClick={close}
                            className="block px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                            {stripHtml(child.name_ar)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto px-5 py-4 border-t border-white/10 text-xs text-white/40 text-center">
              مسندم نت © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
