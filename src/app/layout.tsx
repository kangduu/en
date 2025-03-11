import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Navigation from "../components/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lottery",
  description: "Analysis of lottery draw results.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-800 `}
      >
        <Navigation />
        <main className="px-6 w-full m-auto max-w-[1024px]">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
