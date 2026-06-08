"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/queries";

interface Props {
  mainSections: Category[];
  subMap: Record<number, Category[]>;
}

export default function NavBar({ mainSections, subMap }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      style={{ background: "var(--brand-deep)", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative" }}
      onMouseLeave={() => setOpen(null)}
    >
      <nav className="max-w-6xl mx-auto px-4 flex flex-wrap text-sm">

        <Link
          href="/"
          className="px-4 py-3 font-black whitespace-nowrap border-b-2 transition-all shrink-0"
          style={{ color: "var(--yellow)", borderColor: "var(--yellow)" }}
        >
          الرئيسية
        </Link>

        <Link
          href="/category/18"
          className="px-4 py-3 font-black whitespace-nowrap border-b-2 transition-all shrink-0"
          style={{ color: "var(--teal)", borderColor: "var(--teal)" }}
        >
          أخبار مسندم
        </Link>

        {mainSections.map((section) => {
          const children = subMap[section.id] ?? [];
          const isOpen = open === section.id;
          return (
            <div key={section.id} className="relative shrink-0" onMouseEnter={() => setOpen(section.id)}>
              <Link
                href={`/category/${section.slug}`}
                className="flex items-center gap-1 px-4 py-3 whitespace-nowrap border-b-2 border-transparent transition-all font-medium"
                style={{ color: isOpen ? "white" : "rgba(255,255,255,0.8)", borderColor: isOpen ? "var(--teal)" : "transparent" }}
              >
                {section.name_ar}
                {children.length > 0 && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-60 mt-0.5 shrink-0">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                )}
              </Link>

              {children.length > 0 && isOpen && (
                <div
                  className="absolute top-full right-0 min-w-[190px] py-1 rounded-b-xl z-[200]"
                  style={{
                    background: "#ffffff",
                    borderTop: "3px solid var(--teal)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                  }}
                >
                  {children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/category/${child.slug}`}
                      className="dropdown-link block px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                      onClick={() => setOpen(null)}
                    >
                      {child.name_ar}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
