import { cn } from "@/utils";
import React, { type PropsWithChildren } from "react";

export interface SubheadProps {
  className?: React.CSSProperties;
  extra?: React.ReactNode;
}

export default function Subhead({
  children,
  className,
  extra,
}: PropsWithChildren<SubheadProps>) {
  return (
    <div className={cn("flex items-center my-4 border-b-1 pb-2", className)}>
      {/* <div className="w-1 h-4 mr-2 bg-blue-200 rounded-xs"></div> */}
      <h2 className="m-0 leading-none uppercase text-blue-500">{children}</h2>
      {extra && <div className="ml-auto">{extra}</div>}
    </div>
  );
}
