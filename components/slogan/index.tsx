"use client";

import "./index.css";
import React from "react";
import Link from "next/link";
import { cn, SiteTitle } from "@/lib/utils";
import { Bookshelf } from "@icon-park/react";

interface SloganProps extends ComponentCssProps {
  title?: string;
}

export function Slogan({ className, title }: SloganProps) {
  return (
    <span className={cn("gradient-slogan font-bold text-xl", className)}>
      {title ?? SiteTitle}
    </span>
  );
}

interface LogoProps extends SloganProps {
  fill: string;
  iconClassName?: string;
  path?: string;
}
export default function Logo({
  className,
  fill,
  iconClassName,
  path = "/",
  title,
}: LogoProps) {
  return (
    <Link href={path} className={cn("flex items-center", className)}>
      <span
        className={cn("rounded-[4px] leading-none p-1.5 mr-2", iconClassName)}
      >
        <Bookshelf theme="outline" size="24" fill={fill} />
      </span>
      <Slogan title={title} />
    </Link>
  );
}
