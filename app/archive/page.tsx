// Archive page — links back to the original vBulletin forums on musandam.net

const OLD_SITE = "https://www.musandam.net";

const SECTIONS = [
  { id: 1,  name: "الساحة الرئيسية",              icon: "🏠", desc: "المنتدى الرئيسي والأخبار العامة" },
  { id: 17, name: "مسندميات",                      icon: "🌊", desc: "كل ما يخص محافظة مسندم" },
  { id: 96, name: "تغطيات مسندم نت الخاصة",        icon: "📰", desc: "تغطيات وتقارير موقع مسندم نت" },
  { id: 25, name: "الساحة العلمية",                icon: "🎓", desc: "التعليم، البحث، والثقافة" },
  { id: 57, name: "الساحة الإبداعية",              icon: "🎨", desc: "الفنون، الأدب، والإبداع" },
  { id: 3,  name: "الساحة الترفيهية",              icon: "🎭", desc: "الترفيه والرياضة والمنوعات" },
  { id: 30, name: "الساحة التقنية",                icon: "💻", desc: "التقنية، البرمجة، والتكنولوجيا" },
  { id: 34, name: "الساحة الإدارية",               icon: "📋", desc: "الإعلانات والأنظمة والتعليمات" },
];

export default function ArchivePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">

      {/* Header banner */}
      <div
        className="rounded-2xl px-6 py-8 mb-8 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--brand-deep) 0%, #1a3030 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5 text-white text-[18rem] font-black leading-none select-none flex items-center justify-center"
          aria-hidden
        >أ</div>
        <div className="relative">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: "var(--teal)", color: "#fff" }}>
            أرشيف المنتدى
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">منتدى مسندم نت القديم</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
            هذه الصفحة تحتفظ بروابط أقسام المنتدى الأصلي لمسندم نت — محتوى تاريخي يمتد لأكثر من 15 عاماً.
            <br />للأخبار الجديدة، تصفّح الموقع الحالي.
          </p>
        </div>
      </div>

      {/* Archive sections grid */}
      <h2 className="section-title mb-5">أقسام المنتدى</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`${OLD_SITE}/forumdisplay.php?f=${s.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <span className="text-3xl shrink-0">{s.icon}</span>
            <div className="min-w-0">
              <p className="font-bold text-[--text] group-hover:text-[--teal] transition-colors">
                {s.name}
              </p>
              <p className="text-xs text-[--muted] mt-0.5 truncate">{s.desc}</p>
            </div>
            <span className="shrink-0 text-[--muted] group-hover:text-[--teal] transition-colors mr-auto text-lg">←</span>
          </a>
        ))}
      </div>

      {/* Note */}
      <div
        className="rounded-xl px-5 py-4 text-sm text-center"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        <p className="text-[--muted]">
          جميع الروابط أعلاه تفتح <strong>منتدى مسندم نت الأصلي</strong> في نافذة جديدة.
          المحتوى محفوظ كأرشيف ولا يُضاف إليه محتوى جديد.
        </p>
      </div>

    </main>
  );
}
