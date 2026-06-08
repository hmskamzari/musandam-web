import { getCategories } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تغطيات مسندم نت — أرشيف الفعاليات والأحداث",
  description: "أرشيف تغطيات وفعاليات موقع مسندم نت الخاصة",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

const SECTION_ICONS: Record<number, string> = {
  70:  "👁",
  76:  "⚽",
  78:  "🗳",
  79:  "⚽",
  97:  "🎮",
  98:  "📖",
  99:  "🌟",
  101: "📚",
  102: "📋",
  106: "⚽",
  108: "⚽",
  109: "⚽",
  111: "🎮",
  113: "👩",
  114: "🗳",
  116: "🎉",
  123: "👑",
  125: "⚽",
  126: "🏆",
  127: "⚽",
  128: "🌿",
  129: "🏕",
  131: "💼",
  134: "📖",
  135: "☀️",
  142: "⚽",
  143: "⚽",
  145: "⚽",
  147: "🚣",
  148: "🧭",
  149: "🗳",
  150: "⚽",
  151: "🕌",
  152: "⚽",
  153: "⚽",
  154: "⛵",
  155: "⚽",
  156: "💼",
  157: "🏫",
  158: "⚽",
  159: "⚽",
  160: "🗳",
  162: "🎖",
  163: "⚽",
  164: "⚽",
  165: "⚽",
  167: "⚽",
  168: "🧑",
  169: "⚽",
  171: "🦠",
};

export default async function TghtyatPage() {
  const allCats = await getCategories();

  // Extra category IDs to include even if not direct children of 95
  const EXTRA_IDS = new Set([116]);

  const sections = allCats
    .filter((c) => c.parent_id === 95 || EXTRA_IDS.has(c.id))
    .sort((a, b) => b.id - a.id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 border-r-4 border-[#29b9c7] pr-4">
        <h1 className="text-2xl font-bold text-gray-800">تغطيات مسندم نت</h1>
        <p className="text-gray-500 text-sm mt-1">أرشيف الفعاليات والأحداث الخاصة التي غطّاها الموقع</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((cat) => {
          const name = stripHtml(cat.name_ar);
          const icon = SECTION_ICONS[cat.id] ?? "📰";
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#29b9c7] transition-all duration-200"
            >
              <span className="text-2xl mt-0.5 flex-shrink-0">{icon}</span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 group-hover:text-[#29b9c7] transition-colors leading-snug line-clamp-2">
                  {name}
                </p>
                <p className="text-xs text-gray-400 mt-1">#{cat.id}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
