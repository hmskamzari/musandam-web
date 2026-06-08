"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/queries";

const SITE = "https://portal.musandam.net";

function CardShareBar({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}/article/${slug}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`;

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-1.5 pt-2 border-t border-[--border]">
      <span className="text-[10px] text-[--muted] ml-auto">شارك:</span>
      <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-white text-[10px] font-bold transition-opacity hover:opacity-80"
        style={{ background: "#25D366" }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.51 5.827L.057 23.428a.5.5 0 0 0 .609.61l5.71-1.456A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.94a9.94 9.94 0 0 1-5.065-1.38l-.364-.215-3.764.96.993-3.664-.237-.376A9.944 9.944 0 0 1 2.06 12C2.06 6.508 6.508 2.06 12 2.06S21.94 6.508 21.94 12 17.492 21.94 12 21.94z"/>
        </svg>
        واتساب
      </a>
      <button onClick={copy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all hover:opacity-80"
        style={{ background: copied ? "var(--teal)" : "var(--border)", color: copied ? "white" : "var(--muted)" }}>
        {copied ? "✓ تم" : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            نسخ
          </>
        )}
      </button>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ar-OM", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const THEMES = [
  { from: "#0f2027", to: "#29b9c7", accent: "#29b9c7" },
  { from: "#1a2a12", to: "#3a8a3a", accent: "#3a8a3a" },
  { from: "#1c1400", to: "#ffc200", accent: "#ffc200" },
  { from: "#1a0a12", to: "#e6177a", accent: "#e6177a" },
  { from: "#0f1a2a", to: "#8b7000", accent: "#c8a000" },
];

function Thumbnail({
  url,
  title,
  theme,
}: {
  url: string | null;
  title: string;
  theme: (typeof THEMES)[number];
}) {
  if (url) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // fallback to gradient on broken image
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent) {
              parent.style.background = `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`;
            }
          }}
        />
        {/* Overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {/* Bottom accent */}
        <div className="absolute bottom-0 inset-x-0 h-1" style={{ background: theme.accent }} />
      </div>
    );
  }

  // No image — gradient placeholder
  return (
    <div
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
      style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[6rem] font-black text-white/[0.07] select-none" aria-hidden>م</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-1" style={{ background: theme.accent }} />
    </div>
  );
}

export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const theme = THEMES[article.id % THEMES.length];

  if (featured) {
    return (
      <article className="relative rounded-2xl overflow-hidden group" style={{ boxShadow: "var(--shadow-hover)" }}>
        <div className="absolute inset-0">
          {article.thumbnail_url ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail_url}
                alt={article.title_ar}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) parent.style.background = `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }} />
              <div className="absolute top-4 left-4 text-[8rem] font-black opacity-[0.06] text-white select-none leading-none" aria-hidden>م</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </>
          )}
        </div>

        <div className="absolute top-0 inset-x-0 h-1" style={{ background: theme.accent }} />

        <div className="relative px-6 pb-6 pt-40">
          {article.category_name && (
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3 shadow"
              style={{ background: theme.accent }}>
              {article.category_name}
            </span>
          )}
          <h2 className="text-2xl font-black text-white leading-snug mb-4">
            <Link href={`/article/${article.slug}`} className="hover:text-[--yellow] transition-colors">
              {article.title_ar}
            </Link>
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/65">
            {article.author_name && (
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)" }}>✍</span>
                {article.author_name}
              </span>
            )}
            {article.published_at && <span>{formatDate(article.published_at)}</span>}
            <span className="mr-auto flex items-center gap-1">
              <span style={{ color: theme.accent }}>👁</span>
              {article.views.toLocaleString("ar")} مشاهدة
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-[--card-bg] rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Thumbnail */}
      <Link href={`/article/${article.slug}`} className="block relative h-44 overflow-hidden">
        <Thumbnail url={article.thumbnail_url} title={article.title_ar} theme={theme} />

        {article.category_name && (
          <span
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-0.5 rounded-full text-white shadow z-10"
            style={{ background: theme.accent }}
          >
            {article.category_name}
          </span>
        )}
        {article.has_attachments && (
          <span className="absolute bottom-3 left-3 text-xs text-white/75 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
            📎 صور
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-[0.9rem] font-bold leading-snug line-clamp-3">
          <Link href={`/article/${article.slug}`} className="hover:text-[color:var(--teal)] transition-colors">
            {article.title_ar}
          </Link>
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[--muted] border-t border-[--border] pt-2">
          {article.author_name && (
            <span className="flex items-center gap-1 min-w-0 truncate">
              <span style={{ color: "var(--green)" }}>✍</span>
              <span className="truncate">{article.author_name}</span>
            </span>
          )}
          {article.published_at && (
            <span className="flex items-center gap-1">
              <span style={{ color: "var(--gold)" }}>●</span>
              {formatDate(article.published_at)}
            </span>
          )}
          <span className="mr-auto flex items-center gap-1" style={{ color: "var(--pink)" }}>
            👁 {article.views.toLocaleString("ar")}
          </span>
        </div>
        <CardShareBar slug={article.slug} title={article.title_ar} />
      </div>
    </article>
  );
}
