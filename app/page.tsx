import ArticleCard from "@/components/ArticleCard";
import HeroSlider from "@/components/HeroSlider";
import Pagination from "@/components/Pagination";
import CategoriesGrid from "@/components/CategoriesGrid";
import { getArticlesByCategory, countArticles, getCategories } from "@/lib/queries";

const PAGE_SIZE = 20;
const AKHBAR_ID  = 18; // أخبار مسندم
const SLIDER_COUNT = 6;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const [articles, total, allCats] = await Promise.all([
    getArticlesByCategory(AKHBAR_ID, PAGE_SIZE, offset),
    countArticles(AKHBAR_ID),
    getCategories(),
  ]);

  const mainSections = allCats.filter((c) => c.id >= 1000 && !c.parent_id);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // page 1: first N go to the slider, the rest fill the grid
  const sliderArticles = page === 1 ? articles.slice(0, SLIDER_COUNT) : [];
  const gridArticles   = page === 1 ? articles.slice(SLIDER_COUNT)   : articles;

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">

      {/* Hero slider — latest news, page 1 only */}
      {page === 1 && sliderArticles.length > 0 && (
        <HeroSlider articles={sliderArticles} />
      )}

      {/* Categories section — shown only on first page */}
      {page === 1 && <CategoriesGrid sections={mainSections} />}

      {/* Section heading */}
      <h1 className="section-title mb-5">
        أخبار مسندم
        <span className="text-xs font-normal text-[--muted] mr-3">
          {total.toLocaleString("ar")} خبر
        </span>
      </h1>

      {articles.length === 0 ? (
        <p className="text-[--muted] text-center py-16">لا توجد أخبار حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 card-grid">
          {gridArticles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/" />
    </main>
  );
}
