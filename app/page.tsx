import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import HeroSlider from "@/components/HeroSlider";
import CategoriesGrid from "@/components/CategoriesGrid";
import { getArticlesByCategory, getCategories } from "@/lib/queries";

const SLIDER_COUNT = 6;
const GRID_COUNT   = 6;
const AKHBAR_ID    = 18;

export default async function HomePage() {
  const [articles, allCats] = await Promise.all([
    getArticlesByCategory(AKHBAR_ID, SLIDER_COUNT + GRID_COUNT),
    getCategories(),
  ]);

  const mainSections   = allCats.filter((c) => c.id >= 1000 && !c.parent_id);
  const sliderArticles = articles.slice(0, SLIDER_COUNT);
  const gridArticles   = articles.slice(0, GRID_COUNT);

  return (
    <>
      {/* ── Full-width hero banner ── */}
      {sliderArticles.length > 0 && <HeroSlider articles={sliderArticles} />}

      {/* ── Contained content ── */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        <CategoriesGrid sections={mainSections} />

        <div className="flex items-center justify-between mb-5">
          <h1 className="section-title">أخبار مسندم</h1>
          <Link
            href="/category/18"
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: "var(--teal-glow)", color: "var(--teal)", border: "1px solid rgba(41,185,199,0.25)" }}
          >
            عرض الكل ←
          </Link>
        </div>

        {gridArticles.length === 0 ? (
          <p className="text-[--muted] text-center py-16">لا توجد أخبار حتى الآن.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 card-grid">
            {gridArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}

      </main>
    </>
  );
}
