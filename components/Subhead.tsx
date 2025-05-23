import { cn } from "@/lib/utils";
import React, { type PropsWithChildren } from "react";

export interface SubheadProps {
  className?: React.CSSProperties;
}

export default function Subhead({
  children,
  className,
}: PropsWithChildren<SubheadProps>) {
  return (
    <div className={cn("flex items-center my-4", className)}>
      <div className="w-1 h-4 mr-2 bg-blue-200 rounded-xs"></div>
      <h2 className="m-0 leading-none uppercase text-blue-500">{children}</h2>
    </div>
  );
}
