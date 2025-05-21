import React, { type PropsWithChildren } from "react";

export interface ListProps {
  title: React.ReactNode;
  description: React.ReactNode;
}
export default function List({
  title,
  description,
  children,
}: PropsWithChildren<ListProps>) {
  return (
    <div className="mb-2 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm">{description}</p>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
