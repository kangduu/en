"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="w-fit mx-auto my-4">
      <Link href="/" className="p-4">
        Home
      </Link>
      <Link href="/report" className="p-4">
        Report
      </Link>
      <Link href="/about" className="p-4">
        About
      </Link>
    </header>
  );
}
