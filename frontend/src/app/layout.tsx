import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "MobiQ × RE-LITH | Temiz Enerji Altyapısı",
  description:
    "Atık bataryaları sürdürülebilir şarj altyapısına dönüştüren MobiQ × RE-LITH kurumsal platformu.",
  openGraph: {
    title: "MobiQ × RE-LITH",
    description: "Bugünün atık bataryalarını, yarının temiz enerji altyapısına dönüştürüyoruz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${montserrat.variable} ${inter.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
