export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-10 text-white"
      style={{
        background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand) 60%, #1a3030 100%)",
      }}
    >
      {/* Yellow accent strip */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, var(--yellow), var(--teal), var(--green))" }} />

      <div className="max-w-6xl mx-auto px-4 py-8" style={{ direction: "ltr" }}>
        <div className="grid grid-cols-3 items-center gap-4 text-sm">

          {/* LEFT — social media icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/musandamnet1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (تويتر)"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/musandamnet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* CENTER — copyright */}
          <p className="text-white/50 text-xs text-center" style={{ direction: "rtl" }}>
            © {year} مسندم نت — جميع الحقوق محفوظة
          </p>

          {/* RIGHT — brand */}
          <div className="text-right" style={{ direction: "rtl" }}>
            <p className="text-base font-black tracking-wide" style={{ color: "var(--yellow)" }}>
              مسندم نت
            </p>
            <p className="text-white/50 text-xs mt-0.5">
             وجهة الأخبار وجمال المكان
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
