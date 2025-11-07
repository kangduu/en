// @ts-expect-error TS(1208): File cannot be compiled under '--isolatedModules', Remove this comment to see the full error message
import "./globals.css";
import type { Metadata } from "next";
import { SiteTitle } from "@/lib/utils";
import IconParkProvider from "./IconParkProvider";

export const metadata: Metadata = {
  title: SiteTitle,
  description:
    "english, en, 英语, 自学, bbc, BBC, kangduu, dukang, personal blog, nce,",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body role="contentinfo">
        <IconParkProvider>{children}</IconParkProvider>
      </body>
    </html>
  );
}
