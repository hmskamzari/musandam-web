import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import SubcategoryCards from "@/components/SubcategoryCards";
import {
  getCategoryBySlug,
  getArticlesByCategory,
  countArticles,
  getCategories,
} from "@/lib/queries";

const PAGE_SIZE = 20;

// Accent color per top-level section (matches SubcategoryCards CFG)
const SECTION_COLOR: Record<number, string> = {
  1000: "#29b9c7",
  1010: "#ffc200",
  1020: "#e6177a",
  1030: "#3a8a3a",
  1040: "#29b9c7",
  1050: "#c8a000",
  1060: "#e6177a",
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [articles, total, allCats] = await Promise.all([
    getArticlesByCategory(category.id, PAGE_SIZE, offset),
    countArticles(category.id),
    getCategories(),
  ]);

  const subcategories = allCats.filter((c) => c.parent_id === category.id);
  const accentColor = SECTION_COLOR[category.id] ?? "var(--teal)";

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">

      {/* Category banner */}
      <div
        className="rounded-2xl px-6 py-5 mb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--teal-dim) 100%)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="absolute top-0 left-0 text-[7rem] font-black opacity-[0.07] text-white select-none leading-none" aria-hidden>
          #
        </div>
        <p className="text-xs text-white/60 mb-1 relative">القسم</p>
        <h1 className="text-2xl font-black text-white relative">{category.name_ar}</h1>
        {category.description_ar && (
          <p className="text-sm text-white/65 mt-1 relative">{category.description_ar}</p>
        )}
        <p className="text-xs text-white/50 mt-2 relative">
          {total.toLocaleString("ar")} مقالة
        </p>
      </div>

      {/* Sub-category cards — only on page 1 */}
      {page === 1 && <SubcategoryCards subcategories={subcategories} parentColor={accentColor} />}

      {articles.length === 0 ? (
        <p className="text-[--muted] text-center py-16">لا توجد مقالات في هذا القسم.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 card-grid">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/category/${slug}`}
      />
    </main>
  );
}
