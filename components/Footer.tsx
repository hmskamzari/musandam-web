export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f1923 0%, #1a1a1a 50%, #0d1a1a 100%)" }}>

      {/* Decorative ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 30% 100%, rgba(41,185,199,0.07) 0%, transparent 70%)",
      }} />

      {/* Top accent gradient bar */}
      <div className="h-[3px]" style={{
        background: "linear-gradient(90deg, transparent 0%, var(--yellow) 20%, var(--teal) 50%, var(--green) 80%, transparent 100%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6 text-sm" style={{ direction: "ltr" }}>

          {/* Social media */}
          <div className="flex items-center gap-2.5">
            <a href="https://x.com/musandamnet1" target="_blank" rel="noopener noreferrer" aria-label="X (تويتر)"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/musandamnet" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(193,53,132,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center" style={{ direction: "rtl" }}>
            <p className="text-white/45 text-xs">© {year} مسندم نت — جميع الحقوق محفوظة</p>
          </div>

          {/* Brand */}
          <div className="text-right sm:text-left" style={{ direction: "rtl" }}>
            <p className="text-base font-black tracking-wide" style={{ color: "var(--yellow)" }}>
              مسندم نت
            </p>
            <p className="text-white/40 text-xs mt-0.5">وجهة الأخبار وجمال المكان</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
