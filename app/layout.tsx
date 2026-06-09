import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchiveBanner from "@/components/ArchiveBanner";
import { getSiteSettings } from "@/lib/queries";

const SITE_URL  = "https://portal.musandam.net";
const SITE_NAME = "مسندم نت";
const LOGO      = `${SITE_URL}/logo.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "مسندم نت — أخبار مسندم",
    template: "%s — مسندم نت",
  },
  description:
    "آخر أخبار محافظة مسندم وولاياتها الأربع: خصب، بخاء، دبا، مدحاء — سلطنة عُمان. تغطيات، فعاليات، سياحة، ومجتمع.",
  keywords: ["مسندم", "أخبار مسندم", "خصب", "بخاء", "دبا", "مدحاء", "سلطنة عمان", "عمان", "أخبار عمان"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ar_OM",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "مسندم نت — أخبار مسندم",
    description: "آخر أخبار محافظة مسندم وولاياتها الأربع — سلطنة عُمان",
    images: [{ url: LOGO, width: 320, height: 125, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@musandamnet1",
    creator: "@musandamnet1",
    title: "مسندم نت — أخبار مسندم",
    description: "آخر أخبار محافظة مسندم وولاياتها الأربع — سلطنة عُمان",
    images: [LOGO],
  },
  other: { "content-language": "ar" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const gtmId = settings.gtm_id ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO,
    sameAs: [
      "https://x.com/musandamnet1",
      "https://www.instagram.com/musandamnet",
    ],
    description: "بوابة أخبار محافظة مسندم — سلطنة عُمان",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "محافظة مسندم",
      containedInPlace: { "@type": "Country", name: "سلطنة عُمان" },
    },
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[--bg] text-[--text]">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Header />
        <div className="flex-1">{children}</div>
        <ArchiveBanner />
        <Footer />
      </body>
    </html>
  );
}
