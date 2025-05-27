"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  title,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { title?: string }) {
  const hasTitle = title !== undefined && title !== null && title !== "";
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        hasTitle ? "flex items-center justify-center my-4" : "",
        className
      )}
      {...props}
    >
      {title && (
        <div className="bg-[var(--background)] font-medium px-2 leading-none text-blue-400">
          {title}
        </div>
      )}
    </SeparatorPrimitive.Root>
  );
}

export { Separator };
