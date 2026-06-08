import Link from "next/link";

const OLD_SITE = "https://www.musandam.net";

const SECTIONS = [
  { id: 1,  name: "الساحة الرئيسية",         icon: "🏠" },
  { id: 17, name: "مسندميات",                 icon: "🌊" },
  { id: 96, name: "تغطيات مسندم نت",          icon: "📰" },
  { id: 25, name: "الساحة العلمية",           icon: "🎓" },
  { id: 57, name: "الساحة الإبداعية",         icon: "🎨" },
  { id: 3,  name: "الساحة الترفيهية",         icon: "🎭" },
  { id: 30, name: "الساحة التقنية",           icon: "💻" },
  { id: 34, name: "الساحة الإدارية",          icon: "📋" },
];

export default function ArchiveBanner() {
  return (
    <section className="mt-12 mb-2">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--brand-deep) 0%, #162828 100%)" }}
        >
          {/* Top accent strip */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, var(--yellow), var(--teal), var(--green))" }} />

          <div className="px-6 py-6">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg font-black text-white mb-0.5">
                  أرشيف منتدى مسندم نت
                </h2>
                <p className="text-white/45 text-xs">
                  محتوى تاريخي يمتد لأكثر من 15 عاماً — للقراءة فقط
                </p>
              </div>
              <a
                href={OLD_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-4 py-2 rounded-full transition-colors shrink-0"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--teal)" }}
              >
                المنتدى القديم ←
              </a>
            </div>

            {/* Sections grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`${OLD_SITE}/forumdisplay.php?f=${s.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-center transition-all duration-200 hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors leading-tight">
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
