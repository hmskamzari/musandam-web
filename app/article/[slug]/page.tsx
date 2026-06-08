import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleContent from "@/components/ArticleContent";
import ShareBar from "@/components/ShareBar";
import { getArticleBySlug, getArticleMedia, incrementViews } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title_ar} — مسندم نت`,
    description: article.title_ar,
    openGraph: { title: article.title_ar, locale: "ar_OM" },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ar-OM", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const THEMES = [
  { from: "#0f2027", to: "#29b9c7", accent: "#29b9c7" },
  { from: "#1a2a12", to: "#3a8a3a", accent: "#3a8a3a" },
  { from: "#1c1400", to: "#ffc200", accent: "#ffc200" },
  { from: "#1a0a12", to: "#e6177a", accent: "#e6177a" },
  { from: "#0f1a2a", to: "#8b7000", accent: "#c8a000" },
];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  incrementViews(article.id).catch(() => {});
  await getArticleMedia(article.id);

  const theme = THEMES[article.id % THEMES.length];

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 w-full">

      {/* Hero header */}
      <div
        className="rounded-2xl px-6 py-6 mb-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
          boxShadow: "var(--shadow-hover)",
        }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 left-0 text-[10rem] font-black leading-none opacity-[0.06] text-white select-none"
          aria-hidden
        >
          م
        </div>
        <div className="absolute top-0 inset-x-0 h-1" style={{ background: theme.accent }} />

        <div className="relative">
          {/* Breadcrumb */}
          {article.category_name && (
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3 shadow"
              style={{ background: theme.accent }}
            >
              {article.category_name}
            </span>
          )}

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-black text-white leading-snug mb-4">
            {article.title_ar}
          </h1>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/65">
            {article.author_name && (
              <span className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <span>✍</span> {article.author_name}
              </span>
            )}
            {article.published_at && (
              <span className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <span>🗓</span> {formatDate(article.published_at)}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
              <span>👁</span> {article.views.toLocaleString("ar")} مشاهدة
            </span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div
        className="bg-[--card-bg] rounded-2xl px-6 py-6"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <ArticleContent html={article.content_html ?? ""} />
        <ShareBar title={article.title_ar} slug={article.slug} />
      </div>

    </main>
  );
}
