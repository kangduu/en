import { cn } from "@/utils";
import React, { type PropsWithChildren } from "react";

export interface ListProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}
export default function List({
  title,
  description,
  children,
  className,
}: PropsWithChildren<ListProps>) {
  return (
    <div
      className={cn("mb-2 grid grid-cols-[25px_1fr] items-start", className)}
    >
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {description && <p className="text-sm">{description}</p>}
        {children && (
          <p className="text-sm text-muted-foreground">{children}</p>
        )}
      </div>
    </div>
  );
}
