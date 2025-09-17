import type { Metadata } from "next";
import Main from "./main";
import { SiteTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: SiteTitle,
  description:
    "english, en, 英语, 自学, bbc, BBC, kangduu, dukang, personal blog, nce,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        role="contentinfo"
        className={`antialiased bg-background dark:text-white text-base`}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
