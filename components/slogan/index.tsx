"use client";
import React from "react";
import Link from "next/link";
import "./index.css";
import { cn, SiteTitle } from "@/lib/utils";
import { Bookshelf } from "@icon-park/react";

interface LogoProps extends ComponentCssProps {
  fill: string;
  iconClassName?: string;
}
export default function Logo({ className, fill, iconClassName }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <span
        className={cn("rounded-[4px] leading-none p-2 mr-2", iconClassName)}
      >
        <Bookshelf theme="outline" size="24" fill={fill} />
      </span>
      <Slogan />
    </Link>
  );
}

export function Slogan({ className }: ComponentCssProps) {
  return (
    <span className={cn("gradient-slogan font-bold text-xl", className)}>
      {SiteTitle}
    </span>
  );
}
