import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { searchArticles } from "@/lib/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const articles = query ? await searchArticles(query, 40) : [];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1">
        <form method="GET" action="/search" className="mb-6">
          <div className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="ابحث في الأخبار..."
              className="flex-1 border border-[--border] rounded-lg px-4 py-2 text-right bg-white focus:outline-none focus:ring-2 focus:ring-[--brand-light]"
              dir="rtl"
            />
            <button
              type="submit"
              className="bg-[--brand] text-white px-5 py-2 rounded-lg hover:opacity-90"
            >
              بحث
            </button>
          </div>
        </form>

        {query && (
          <h1 className="text-lg font-bold mb-4 text-[--brand] border-r-4 border-[--accent] pr-3">
            نتائج البحث عن: {query} ({articles.length} نتيجة)
          </h1>
        )}

        {articles.length === 0 && query && (
          <p className="text-[--muted]">لا توجد نتائج للبحث.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </main>
      <footer className="bg-[--brand] text-white text-center text-sm py-3 mt-6">
        مسندم نت © جميع الحقوق محفوظة
      </footer>
    </>
  );
}
