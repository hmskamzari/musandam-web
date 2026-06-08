import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { getCategories, getArticlesByCategory } from "@/lib/queries";

const AKHBAR_ID = 18;

export default async function Header() {
  const [categories, latest] = await Promise.all([
    getCategories(),
    getArticlesByCategory(AKHBAR_ID, 10),
  ]);

  const mainSections = categories.filter((c) => c.id >= 1000 && !c.parent_id);
  const subMapRaw: Record<number, typeof categories> = {};
  categories
    .filter((c) => c.id >= 1000 && c.parent_id !== null)
    .forEach((c) => {
      if (!subMapRaw[c.parent_id!]) subMapRaw[c.parent_id!] = [];
      subMapRaw[c.parent_id!].push(c);
    });

  const tickerTitles = latest.map((a) => a.title_ar);

  return (
    <header className="sticky top-0 z-50" style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.18))" }}>

      {/* ── Breaking news ticker ─────────────────────────────────────────── */}
      {tickerTitles.length > 0 && (
        <div
          className="overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #1a1a1a 0%, #2c2c2c 100%)",
            height: "2.1rem",
            borderBottom: "1px solid rgba(255,194,0,0.2)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-3">
            {/* "عاجل" badge with pulse */}
            <Link
              href="/category/18"
              className="ticker-badge-pulse text-xs font-black px-3 py-0.5 rounded-full text-white shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
            >
              عاجل
            </Link>

            {/* separator */}
            <div className="w-px h-4 bg-white/20 shrink-0" />

            <div className="flex-1 overflow-hidden">
              <div className="ticker-track text-xs font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                {[...tickerTitles, ...tickerTitles].map((title, i) => (
                  <span key={i} className="shrink-0">
                    <span style={{ color: "var(--yellow)", marginLeft: "0.5rem" }}>◆</span> {title}
                  </span>
                ))}
              </div>
            </div>

            {/* Live dot */}
            <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: "var(--yellow)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                  animation: "pulseRing 2s ease-out infinite",
                }}
              />
              مباشر
            </div>
          </div>
        </div>
      )}

      {/* ── Logo + search ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand) 60%, #1f2a2a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle teal glow top-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 30% 100% at 5% 50%, rgba(41,185,199,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.webp"
              alt="مسندم نت"
              width={320}
              height={125}
              priority
              className="h-16 w-auto"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
            />
          </Link>

          {/* Search bar */}
          <form method="GET" action="/search" className="flex-1 max-w-md hidden sm:flex gap-0" role="search">
            <input
              type="search"
              name="q"
              placeholder="ابحث في أخبار مسندم..."
              className="flex-1 text-sm px-4 py-2.5 rounded-r-xl border-0 bg-white/10 text-white placeholder-white/40 focus:bg-white/18 focus:outline-none transition-all"
              dir="rtl"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderLeft: "none",
              }}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-l-xl text-sm text-white font-bold hover:opacity-90 active:scale-95 transition-all"
              style={{ background: "var(--teal)" }}
            >
              بحث
            </button>
          </form>
        </div>
      </div>

      {/* ── Category nav ─────────────────────────────────────────────────── */}
      <NavBar mainSections={mainSections} subMap={subMapRaw} />

    </header>
  );
}
