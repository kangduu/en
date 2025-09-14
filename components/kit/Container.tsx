import { cn } from "@/lib/utils";
import React, { type PropsWithChildren } from "react";

export default function Container({
  children,
  className,
  style,
}: PropsWithChildren<ComponentCssProps>) {
  return (
    <div
      style={style}
      className={cn("w-full md:max-w-[var(--size)] m-auto ", className)}
    >
      {children}
    </div>
  );
}
