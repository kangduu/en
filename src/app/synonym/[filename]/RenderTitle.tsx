import { cn } from "@/lib/utils";
import React from "react";

export default function RenderTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("font-medium mb-4", className)}>{children}</div>;
}
