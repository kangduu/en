import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Navigation from "../components/Navigation";

const geistMono = localFont({
  src: "./fonts/kkk.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "English",
  description: "english-study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        role="contentinfo"
        className={`${geistMono.variable} antialiased bg-white dark:bg-slate-800 `}
      >
        <Navigation />
        <main className="px-6 w-full m-auto max-w-[1024px]">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
