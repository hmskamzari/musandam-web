"use client";

import Link from "next/link";
import type { Category } from "@/lib/queries";

// ── Inline SVG icon helpers ───────────────────────────────────────────────────

function Icon({ d, viewBox = "0 0 24 24" }: { d: string | string[]; viewBox?: string }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ── Per-subcategory config ────────────────────────────────────────────────────

const PIN   = "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0-6 0";
const PINS  = ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z", "M12 13a3 3 0 100-6 3 3 0 000 6z"];

const CFG: Record<number, { icon: React.ReactNode; color: string }> = {
  // ── أخبار مسندم ──────────────────────────────────────────────────────────
  1001: {
    color: "#29b9c7",
    icon: <Icon d={PINS} />,   // أخبار خصب
  },
  1002: {
    color: "#29b9c7",
    icon: <Icon d={PINS} />,   // أخبار دبا
  },
  1003: {
    color: "#29b9c7",
    icon: <Icon d={PINS} />,   // أخبار بخاء
  },
  1004: {
    color: "#29b9c7",
    icon: <Icon d={PINS} />,   // أخبار مدحاء
  },
  1005: {
    color: "#1a8a93",
    icon: <Icon d={[
      "M3 21h18",
      "M3 10h18",
      "M5 10V21M9 10V21M12 10V21M15 10V21M19 10V21",
      "M3 10l9-7 9 7",
    ]} />,   // الأخبار الحكومية
  },

  // ── اقتصاد مسندم ─────────────────────────────────────────────────────────
  1011: {
    color: "#ffc200",
    icon: <Icon d={["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"]} />,  // المشاريع الجديدة
  },
  1012: {
    color: "#ffc200",
    icon: <Icon d={["M3 3v18h18", "M18 9l-5 5-4-4-3 3"]} />,  // الاستثمارات
  },
  1013: {
    color: "#e6a000",
    icon: <Icon d={[
      "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
      "M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16",
    ]} />,  // الشركات المحلية
  },
  1014: {
    color: "#ffc200",
    icon: <Icon d={[
      "M3 12a9 9 0 1018 0 9 9 0 00-18 0",
      "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4",
    ]} />,  // الموانئ والنقل البحري
  },
  1015: {
    color: "#8b7000",
    icon: <Icon d={["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"]} />,  // السياحة والضيافة
  },

  // ── شخصيات مسندم ─────────────────────────────────────────────────────────
  1021: {
    color: "#e6177a",
    icon: <Icon d={[
      "M12 1a3 3 0 000 6 3 3 0 000-6z",
      "M19 11a7 7 0 01-14 0",
      "M12 18v4M8 22h8",
    ]} />,  // مقابلات مع رواد الأعمال
  },
  1022: {
    color: "#e6177a",
    icon: <Icon d={[
      "M8 21h8M12 17v4",
      "M5 7h14M6 7V5a6 6 0 1112 0v2",
      "M6 7c0 5.523 2.686 10 6 10s6-4.477 6-10",
    ]} />,  // قصص نجاح
  },
  1023: {
    color: "#c0136b",
    icon: <Icon d={[
      "M4 19.5A2.5 2.5 0 016.5 17H20",
      "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
    ]} />,  // شخصيات تاريخية
  },
  1024: {
    color: "#e6177a",
    icon: <Icon d={[
      "M9.663 17h4.673M12 3v1M6.343 6.343l-.707-.707M3 12H2M6.343 17.657l-.707.707M12 22v-1M17.657 17.657l.707.707M22 12h-1M17.657 6.343l.707-.707",
      "M12 18a6 6 0 100-12 6 6 0 000 12z",
    ]} />,  // المبدعون والشباب
  },

  // ── فعاليات مسندم ────────────────────────────────────────────────────────
  1031: {
    color: "#3a8a3a",
    icon: <Icon d={[
      "M4.5 9.5l3-3 4 4 4-4 3 3",
      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    ]} />,  // المهرجانات
  },
  1032: {
    color: "#3a8a3a",
    icon: <Icon d={[
      "M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
      "M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      "M20.07 9.86A2 2 0 0019 6H5a2 2 0 00-1.07 3.86l1 .57",
    ]} />,  // الفعاليات الرياضية
  },
  1033: {
    color: "#2a6a2a",
    icon: <Icon d={[
      "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
      "M4 22v-7",
    ]} />,  // المناسبات الوطنية
  },
  1034: {
    color: "#3a8a3a",
    icon: <Icon d={[
      "M8 2v4M16 2v4",
      "M3 10h18",
      "M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z",
      "M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01",
    ]} />,  // التقويم السنوي للفعاليات
  },

  // ── السياحة والاستكشاف ────────────────────────────────────────────────────
  1041: {
    color: "#29b9c7",
    icon: <Icon d={[
      "M3 12h18M3 6h18M3 18h18",
      "M9 3v18",
    ]} />,  // دليل المناطق السياحية
  },
  1042: {
    color: "#0096a8",
    icon: <Icon d={["M3 18c3-6 6-9 9-9s6 3 9 9"]} />,  // الجزر والخلجان
  },
  1043: {
    color: "#29b9c7",
    icon: <Icon d={[
      "M3 21h18M3 8h18M3 8l9-5 9 5",
      "M8 8v13M16 8v13M12 8v13",
    ]} />,  // الفنادق والمنتجعات
  },
  1044: {
    color: "#1a8a93",
    icon: <Icon d={[
      "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z",
      "M12 17a4 4 0 100-8 4 4 0 000 8z",
    ]} />,  // التجارب السياحية
  },

  // ── مشاريع التنمية ────────────────────────────────────────────────────────
  1051: {
    color: "#c8a000",
    icon: <Icon d={["M3 12h18M3 6l2 6H1l2-6zM19 6l2 6h-4l2-6z"]} />,  // مشاريع الطرق
  },
  1052: {
    color: "#c8a000",
    icon: <Icon d={[
      "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
      "M9 22V12h6v10",
    ]} />,  // مشاريع الإسكان
  },
  1053: {
    color: "#8b7000",
    icon: <Icon d={[
      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    ]} />,  // مشاريع الموانئ
  },
  1054: {
    color: "#c8a000",
    icon: <Icon d={["M13 2L3 14h9l-1 8 10-12h-9l1-8z"]} />,  // مشاريع الطاقة والاتصالات
  },

  // ── مجتمع مسندم ──────────────────────────────────────────────────────────
  1061: {
    color: "#e6177a",
    icon: <Icon d={[
      "M4 19.5A2.5 2.5 0 016.5 17H20",
      "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
      "M8 7h8M8 11h4",
    ]} />,  // التعليم
  },
  1062: {
    color: "#e6177a",
    icon: <Icon d={["M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"]} />,  // الصحة
  },
  1063: {
    color: "#3a8a3a",
    icon: <Icon d={[
      "M12 22V12",
      "M12 12C12 12 6 9 6 5a6 6 0 0112 0c0 4-6 7-6 7z",
    ]} />,  // البيئة
  },
  1064: {
    color: "#e6177a",
    icon: <Icon d={[
      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2",
      "M9 11a4 4 0 100-8 4 4 0 000 8z",
      "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    ]} />,  // المبادرات المجتمعية
  },
};

// ── Fallback: first Arabic letter in a colored circle ────────────────────────
function LetterIcon({ name, color }: { name: string; color: string }) {
  const letter = [...name].find((c) => c.trim()) ?? "؟";
  return (
    <span className="w-6 h-6 flex items-center justify-center text-base font-black" style={{ color }}>
      {letter}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SubcategoryCards({
  subcategories,
  parentColor = "#29b9c7",
}: {
  subcategories: Category[];
  parentColor?: string;
}) {
  if (!subcategories.length) return null;

  return (
    <section className="mb-7">
      <h2 className="section-title mb-4">الأقسام الفرعية</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {subcategories.map((cat, i) => {
          const cfg = CFG[cat.id];
          const color = cfg?.color ?? parentColor;
          const icon  = cfg?.icon ?? <LetterIcon name={cat.name_ar} color={color} />;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="sub-cat-card group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-250 hover:-translate-y-1"
              style={{
                background: "var(--card-bg)",
                boxShadow: "var(--shadow-sm)",
                borderRight: `3px solid ${color}`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Icon bubble */}
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-250 group-hover:scale-110"
                style={{ background: color + "18", color }}
              >
                {icon}
              </div>

              {/* Label */}
              <span className="text-sm font-bold leading-snug text-[--text] group-hover:text-[--teal] transition-colors">
                {cat.name_ar}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
