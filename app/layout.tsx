import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchiveBanner from "@/components/ArchiveBanner";

export const metadata: Metadata = {
  title: "مسندم نت — أخبار مسندم",
  description: "آخر أخبار محافظة مسندم وولاياتها الأربع: خصب، بخاء، دبا، مدحاء — سلطنة عُمان",
  other: { "content-language": "ar" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col bg-[--bg] text-[--text]">
        <Header />
        <div className="flex-1">{children}</div>
        <ArchiveBanner />
        <Footer />
      </body>
    </html>
  );
}
