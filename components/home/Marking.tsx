import { cn } from "@/lib/utils";
import React, { type PropsWithChildren } from "react";

export default function Marking({
  className,
  children,
}: PropsWithChildren<ComponentCssProps>) {
  return (
    <div
      className={cn(
        "w-10 h-10 min-w-10 min-h-10 rounded-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
