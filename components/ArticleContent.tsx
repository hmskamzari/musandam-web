"use client";

import DOMPurify from "isomorphic-dompurify";

// vBulletin [SIZE=N] was converted to font-size:Npt by the bbcode library.
// Npt are tiny by CSS standards (6pt ≈ 8px). Map to readable rem values.
const VB_PT_MAP: Record<number, string> = {
  1: "0.78rem",
  2: "0.85rem",
  3: "0.92rem",
  4: "1rem",
  5: "1.05rem",
  6: "1.15rem",
  7: "1.35rem",
  8: "1.5rem",
  9: "1.7rem",
};

function normalizeFontSizes(html: string): string {
  return html.replace(/font-size:\s*(\d+(?:\.\d+)?)pt/gi, (_, n) => {
    const pt = Math.round(parseFloat(n));
    const rem = VB_PT_MAP[pt] ?? (pt >= 10 ? `${(pt * 0.083).toFixed(2)}rem` : "1rem");
    return `font-size:${rem}`;
  });
}

export default function ArticleContent({ html }: { html: string }) {
  const normalized = normalizeFontSizes(html);
  const clean = DOMPurify.sanitize(normalized, {
    ALLOWED_TAGS: [
      "p","br","div","span","a","b","i","u","strong","em","s","strike",
      "ul","ol","li","blockquote","pre","code","h1","h2","h3","h4","h5","h6",
      "img","table","thead","tbody","tr","th","td","hr",
    ],
    ALLOWED_ATTR: ["href","src","alt","title","style","class","dir","align","width","height"],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div
      className="article-content"
      dir="rtl"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
