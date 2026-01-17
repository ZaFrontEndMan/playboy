import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import QueryProvider from "@/providers/QueryProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/providers/ThemeProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FUTURE WEAR - Luxury Streetwear",
  description: "Premium streetwear for the digital age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* or just "dark light" — order doesn't matter */}
      </head> 
      <link href="https://cdn.jsdelivr.net/combine/npm/daisyui@5/base/rootscrollgutter.css,npm/daisyui@5/base/scrollbar.css,npm/daisyui@5/base/rootcolor.css,npm/daisyui@5/base/rootscrolllock.css,npm/daisyui@5/base/reset.css,npm/daisyui@5/base/svg.css,npm/daisyui@5/base/properties.css,npm/daisyui@5/components/modal.css" rel="stylesheet" type="text/css" />
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <QueryProvider>
              <div className="grid-background" />
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </QueryProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
