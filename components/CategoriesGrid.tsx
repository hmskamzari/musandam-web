"use client";

import Link from "next/link";
import type { Category } from "@/lib/queries";

const SECTION_CONFIG: Record<number, { icon: string; color: string }> = {
  1000: { icon: "/icons/akhbar.png",    color: "#29b9c7" },
  1010: { icon: "/icons/iqtisad.png",   color: "#ffc200" },
  1020: { icon: "/icons/shakhsiyat.png",color: "#e6177a" },
  1030: { icon: "/icons/faaliyat.png",  color: "#3a8a3a" },
  1040: { icon: "/icons/siyaha.png",    color: "#29b9c7" },
  1050: { icon: "/icons/mashari.png",   color: "#c8a000" },
  1060: { icon: "/icons/mujtama.png",   color: "#e6177a" },
};

export default function CategoriesGrid({ sections }: { sections: Category[] }) {
  return (
    <section className="mb-8">
      <h2 className="section-title mb-5">استكشف الأقسام</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {sections.map((cat, i) => {
          const cfg = SECTION_CONFIG[cat.id];
          if (!cfg) return null;
          const { icon, color } = cfg;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="cat-card group flex flex-col items-center gap-2 pt-5 pb-4 px-3 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "var(--card-bg)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              {/* 3D icon */}
              <div className="w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon}
                  alt={cat.name_ar}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              {/* Category name */}
              <span className="text-[0.75rem] font-bold leading-tight mt-1" style={{ color: "var(--text)" }}>
                {cat.name_ar}
              </span>

              {/* Accent underline on hover */}
              <div
                className="h-0.5 w-0 group-hover:w-8 transition-all duration-300 rounded-full"
                style={{ background: color }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
