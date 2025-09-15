"use client";
import React from "react";
import Link from "next/link";
import "./index.css";
import { cn, SiteTitle } from "@/lib/utils";

export default function Slogan({ className }: ComponentCssProps) {
  return (
    <Link
      className={cn("gradient-slogan font-bold text-xl", className)}
      href="/"
    >
      {SiteTitle}
    </Link>
  );
}
