"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Article } from "@/lib/queries";

const THEMES = [
  { from: "#0f2027", to: "#29b9c7", accent: "#29b9c7" },
  { from: "#1a2a12", to: "#3a8a3a", accent: "#3a8a3a" },
  { from: "#1c1400", to: "#ffc200", accent: "#ffc200" },
  { from: "#1a0a12", to: "#e6177a", accent: "#e6177a" },
  { from: "#0f1a2a", to: "#8b7000", accent: "#c8a000" },
];

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ar-OM", {
    year: "numeric", month: "long", day: "numeric",
  });
}

const INTERVAL = 6000;

export default function HeroSlider({ articles }: { articles: Article[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [tick, setTick]       = useState(0); // bumped to restart progress bar
  const count = articles.length;

  // Functional updaters avoid stale closures — interval never needs to restart
  const advance = useCallback((dir: 1 | -1) => {
    setCurrent((c) => (c + dir + count) % count);
    setTick((t) => t + 1);
  }, [count]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setTick((t) => t + 1);
  }, []);

  // Single stable interval — no deps on `current`
  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => advance(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, count, advance]);

  if (!count) return null;

  return (
    <div
      className="relative overflow-hidden hero-slider"
      style={{ height: "clamp(340px, 50vw, 560px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ───────────────────────────────────────── */}
      {articles.map((a, i) => {
        const theme = THEMES[a.id % THEMES.length];
        const active = i === current;
        return (
          <div
            key={a.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
            aria-hidden={!active}
          >
            {/* Background image or gradient */}
            {a.thumbnail_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.thumbnail_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ transform: active ? "scale(1.03)" : "scale(1)", transition: "transform 6s ease-out" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-black/10" />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
              >
                <div className="absolute top-6 left-8 text-[12rem] font-black leading-none opacity-[0.05] text-white select-none" aria-hidden>م</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              </div>
            )}

            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-1" style={{ background: theme.accent }} />

            {/* Slide content — inner container aligned with body layout */}
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="max-w-6xl mx-auto w-full px-4 pb-6 sm:pb-10">
                {a.category_name && (
                  <span
                    className="inline-block text-xs font-black px-3 py-1 rounded-full text-white mb-3 w-fit shadow"
                    style={{ background: theme.accent }}
                  >
                    {a.category_name}
                  </span>
                )}
                <Link href={`/article/${a.slug}`} className="group/title">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug mb-3 line-clamp-3 group-hover/title:text-[--yellow] transition-colors">
                    {a.title_ar}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                  {a.author_name && (
                    <span className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-0.5">
                      <span>✍</span> {a.author_name}
                    </span>
                  )}
                  {a.published_at && (
                    <span className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-0.5">
                      <span>🗓</span> {formatDate(a.published_at)}
                    </span>
                  )}
                  <span className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-0.5">
                    <span>👁</span> {a.views.toLocaleString("ar")} مشاهدة
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Prev / Next arrows ───────────────────────────── */}
      {count > 1 && (
        <>
          <button
            onClick={() => advance(-1)}
            aria-label="الخبر السابق"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold opacity-0 hover:opacity-100 focus:opacity-100 group-[.hero-slider]:opacity-0 transition-opacity duration-200 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          >
            ›
          </button>
          <button
            onClick={() => advance(1)}
            aria-label="الخبر التالي"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          >
            ‹
          </button>
        </>
      )}

      {/* ── Dots ─────────────────────────────────────────── */}
      {count > 1 && (
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`الشريحة ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:   i === current ? "28px" : "8px",
                height:  "8px",
                background: i === current ? "white" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Auto-play progress bar ────────────────────────── */}
      {!paused && count > 1 && (
        <div
          key={tick}
          className="absolute bottom-0 inset-x-0 h-[3px] z-20 origin-left"
          style={{
            background: THEMES[articles[current].id % THEMES.length].accent,
            animation: `sliderProgress ${INTERVAL}ms linear forwards`,
          }}
        />
      )}

      {/* Slide counter badge */}
      <div
        className="absolute top-4 left-4 z-20 text-xs font-bold text-white/70 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full"
        style={{ direction: "ltr" }}
      >
        {current + 1} / {count}
      </div>
    </div>
  );
}
