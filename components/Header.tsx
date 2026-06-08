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

  // New proposed top-level sections (id >= 1000)
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
    <header className="sticky top-0 z-50">

      {/* Breaking news ticker */}
      {tickerTitles.length > 0 && (
        <div className="overflow-hidden" style={{ background: "var(--yellow)", height: "2rem" }}>
          <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-3">
            <Link
              href="/category/18"
              className="text-xs font-black px-2 py-0.5 rounded text-white shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: "var(--brand)" }}
            >
              أخبار مسندم
            </Link>
            <div className="flex-1 overflow-hidden">
              <div className="ticker-track text-xs font-semibold" style={{ color: "var(--brand)" }}>
                {[...tickerTitles, ...tickerTitles].map((title, i) => (
                  <span key={i} className="shrink-0">◆ {title}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo + search */}
      <div style={{ background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand) 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image src="/logo.webp" alt="مسندم نت" width={320} height={125} priority className="h-16 w-auto" />
          </Link>
          <form method="GET" action="/search" className="flex-1 max-w-md hidden sm:flex gap-0">
            <input
              type="search"
              name="q"
              placeholder="ابحث في أخبار مسندم..."
              className="flex-1 text-sm px-4 py-2.5 rounded-r-xl border-0 bg-white/90 text-[--text] focus:bg-white focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "var(--teal)" } as React.CSSProperties}
              dir="rtl"
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

      {/* Category nav — client component for dropdown support */}
      <NavBar mainSections={mainSections} subMap={subMapRaw} />

    </header>
  );
}
