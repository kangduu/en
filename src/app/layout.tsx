import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
// import Providers from "./providers";
// import Navigation from "./header";
import { Back2Top } from "../components";
import { Toaster } from "@/components/ui/sonner";

// const geistMono = localFont({
//   src: "./fonts/kkk.ttf",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
        className={`antialiased bg-white dark:bg-slate-900 dark:text-white`}
      >
        {/* <Navigation /> */}
        <main className="px-4 pt-4 pb-6 w-full m-auto max-w-[1024px]">
          {children}
          <Back2Top />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
