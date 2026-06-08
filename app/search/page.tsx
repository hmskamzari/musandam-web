import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { searchArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "بحث",
  description: "ابحث في أخبار ومقالات مسندم نت",
  robots: { index: false, follow: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const articles = query ? await searchArticles(query, 40) : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">

      <form method="GET" action="/search" className="mb-6">
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="ابحث في الأخبار..."
            className="flex-1 rounded-xl px-4 py-2.5 text-right focus:outline-none focus:ring-2"
            style={{
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              color: "var(--text)",
            }}
            dir="rtl"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
            style={{ background: "var(--teal)" }}
          >
            بحث
          </button>
        </div>
      </form>

      {query && (
        <h1 className="section-title mb-5">
          نتائج البحث عن: {query}
          <span className="text-xs font-normal text-[--muted] mr-3">{articles.length} نتيجة</span>
        </h1>
      )}

      {articles.length === 0 && query && (
        <p className="text-[--muted] text-center py-16">لا توجد نتائج للبحث.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 card-grid">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

    </main>
  );
}
