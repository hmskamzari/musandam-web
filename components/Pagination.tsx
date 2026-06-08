import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: Props) {
  if (totalPages <= 1) return null;

  const prev = currentPage - 1;
  const next = currentPage + 1;

  return (
    <nav className="flex items-center justify-center gap-3 mt-10">
      {prev >= 1 ? (
        <Link
          href={`${baseUrl}?page=${prev}`}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--teal-dim))" }}
        >
          ← السابق
        </Link>
      ) : (
        <span className="px-5 py-2.5 rounded-xl text-sm font-bold opacity-30 cursor-default select-none" style={{ background: "var(--border)", color: "var(--muted)" }}>
          ← السابق
        </span>
      )}

      <span className="text-sm text-[--muted] px-2 font-medium">
        {currentPage.toLocaleString("ar")} / {totalPages.toLocaleString("ar")}
      </span>

      {next <= totalPages ? (
        <Link
          href={`${baseUrl}?page=${next}`}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg, var(--teal-dim), var(--green))" }}
        >
          التالي →
        </Link>
      ) : (
        <span className="px-5 py-2.5 rounded-xl text-sm font-bold opacity-30 cursor-default select-none" style={{ background: "var(--border)", color: "var(--muted)" }}>
          التالي →
        </span>
      )}
    </nav>
  );
}
