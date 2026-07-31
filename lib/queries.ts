/**
 * Data layer — dual-mode:
 *   API_URL set   → fetches from PHP API on Namecheap (production)
 *   API_URL unset → reads from local JSON files         (local dev)
 */

// ── Types (shared by both backends) ─────────────────────────────────────────

export interface Category {
  id: number;
  name_ar: string;
  slug: string;
  description_ar: string | null;
  parent_id: number | null;
  sort_order: number;
}

export interface Article {
  id: number;
  category_id: number | null;
  title_ar: string;
  slug: string;
  content_html: string | null;
  thumbnail_url: string | null;
  author_name: string | null;
  published_at: string | null;
  views: number;
  is_published: boolean;
  has_attachments: boolean;
  original_thread_id: number | null;
  category_name?: string;
}

// ── API URL (set in .env.local for production, empty for local dev) ──────────

const API_URL = process.env.API_URL ?? "";

// ── API helpers (production) ─────────────────────────────────────────────────

async function apiFetch<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ── JSON backend (local dev) ─────────────────────────────────────────────────

import fs   from "fs";
import path from "path";

const DATA_DIR   = path.join(process.cwd(), "..");
const CONTENT_DIR = path.join(DATA_DIR, "article_content");

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function loadJSON<T>(filename: string): T[] {
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return [];
  try { return JSON.parse(fs.readFileSync(file, "utf-8")) as T[]; }
  catch { return []; }
}

let _cats:   Category[] | null = null;
let _arts:   Article[]  | null = null;
let _thumbs: Record<string, string> | null = null;

function allThumbnails(): Record<string, string> {
  if (!_thumbs) {
    try { _thumbs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "thumbnails.json"), "utf-8")); }
    catch { _thumbs = {}; }
  }
  return _thumbs!;
}

function allCategoriesLocal(): Category[] {
  if (!_cats) {
    _cats = loadJSON<any>("categories.json").map((c) => ({
      id:             c.id,
      name_ar:        stripHtml(c.name_ar ?? ""),
      slug:           c.slug ?? String(c.id),
      description_ar: c.description_ar ? stripHtml(c.description_ar) : null,
      parent_id:      c.parent_id ?? null,
      sort_order:     c.sort_order ?? 0,
    }));
  }
  return _cats;
}

function allArticlesLocal(): Article[] {
  if (!_arts) {
    const catMap = new Map(allCategoriesLocal().map((c) => [c.id, c.name_ar]));
    const thumbs = allThumbnails();
    _arts = loadJSON<any>("articles.json")
      .filter((a: any) => a.is_published !== false)
      .map((a: any) => ({
        id:               a.id,
        category_id:      a.category_id ?? null,
        title_ar:         stripHtml(a.title_ar ?? ""),
        slug:             a.slug ?? String(a.id),
        content_html:     null,
        thumbnail_url:    thumbs[String(a.id)] ?? null,
        author_name:      a.author_name ?? null,
        published_at:     a.published_at ?? null,
        views:            a.views ?? 0,
        is_published:     a.is_published !== false,
        has_attachments:  a.has_attachments ?? false,
        original_thread_id: a.original_thread_id ?? null,
        category_name:    catMap.get(a.category_id) ?? undefined,
      }));
  }
  return _arts;
}

function readArticleContent(id: number): string | null {
  const file = path.join(CONTENT_DIR, `${id}.html`);
  if (!fs.existsSync(file)) return null;
  try { return fs.readFileSync(file, "utf-8"); }
  catch { return null; }
}

// ── Exported query functions ─────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (API_URL) return apiFetch<Category[]>("/categories.php", 3600);
  return allCategoriesLocal().sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (API_URL) {
    const all = await getCategories();
    return all.find((c) => c.slug === slug) ?? null;
  }
  return allCategoriesLocal().find((c) => c.slug === slug) ?? null;
}

export async function getLatestArticles(limit = 20, offset = 0): Promise<Article[]> {
  if (API_URL) return apiFetch<Article[]>(`/articles.php?limit=${limit}&offset=${offset}`);
  return allArticlesLocal().slice(offset, offset + limit);
}

export async function getArticlesByCategory(
  categoryId: number,
  limit = 20,
  offset = 0,
): Promise<Article[]> {
  if (API_URL)
    return apiFetch<Article[]>(`/articles.php?category=${categoryId}&limit=${limit}&offset=${offset}`);
  return allArticlesLocal()
    .filter((a) => a.category_id === categoryId)
    .slice(offset, offset + limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (API_URL) {
    try { return await apiFetch<Article>(`/article.php?slug=${encodeURIComponent(slug)}`, 60); }
    catch { return null; }
  }
  const meta = allArticlesLocal().find((a) => a.slug === slug) ?? null;
  if (!meta) return null;
  return { ...meta, content_html: readArticleContent(meta.id) };
}

export async function incrementViews(_articleId: number): Promise<void> {
  // handled server-side in article.php on every read
}

export async function countArticles(categoryId?: number): Promise<number> {
  if (API_URL) {
    const path = categoryId !== undefined
      ? `/count.php?category=${categoryId}`
      : `/count.php`;
    const data = await apiFetch<{ count: number }>(path, 60);
    return data.count;
  }
  if (categoryId !== undefined)
    return allArticlesLocal().filter((a) => a.category_id === categoryId).length;
  return allArticlesLocal().length;
}

export async function searchArticles(query: string, limit = 20): Promise<Article[]> {
  if (API_URL)
    return apiFetch<Article[]>(`/search.php?q=${encodeURIComponent(query)}&limit=${limit}`, 0);
  const q = query.toLowerCase();
  return allArticlesLocal()
    .filter((a) =>
      a.title_ar.toLowerCase().includes(q) ||
      (a.author_name ?? "").toLowerCase().includes(q),
    )
    .slice(0, limit);
}

export async function getArticleMedia(_articleId: number) {
  return [];
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (API_URL) {
    try {
      return await apiFetch<Record<string, string>>("/settings.php", 86400);
    } catch {
      return {};
    }
  }
  return {};
}
