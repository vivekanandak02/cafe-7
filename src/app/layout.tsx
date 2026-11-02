import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cafe--7.vercel.app"),
  title: "Cafe 7 | Freshly Crafted. Served with Care.",
  description:
    "Cafe 7 offers premium burgers, coffee, wraps, wings and comfort food in a refined café setting in Chennai.",
  keywords: "Cafe 7,coffee,burgers,Chennai,premium cafe,wings,fries,digital menu,QR menu",
  openGraph: {
    title: "Cafe 7 — Premium Burgers • Fries • Coffee",
    description:
      "Freshly Crafted. Served with Care. Explore the newly updated menu with burgers, coffee and desserts.",
    url: "https://cafe--7.vercel.app/",
    siteName: "Cafe 7 Chennai",
    images: [
      {
        url: "/images/hero_burger.webp",
        width: 1200,
        height: 630,
        alt: "Cafe 7 Gourmet Burger Presentation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe 7 — Premium Burgers • Fries • Coffee",
    description:
      "Freshly Crafted. Served with Care. Explore the newly updated menu with burgers, coffee and desserts.",
    images: ["/images/hero_burger.webp"],
  },
  icons: {
    icon: "/cafe7-logo.svg",
    apple: "/cafe7-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#FBF8F4] text-[#3B312C] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
