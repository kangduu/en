import type { Metadata } from "next";
import Main from "./main";
import { SiteTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: SiteTitle,
  description: "english,kangduu,dukang,personal blog,nce,",
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
        className={`antialiased bg-[var(--background)] dark:text-white text-base`}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
