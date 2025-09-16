"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RenderTargetProps {
  path: string;
  name?: string;
}

export default function RenderTarget({ name, path }: RenderTargetProps) {
  return (
    <Link href={`/synonym/${path}`}>
      <Button
        asChild
        className="whitespace-break-spaces h-fit bg-blue-400 dark:bg-blue-100 dark:hover:bg-blue-300 hover:-translate-y-1 duration-300"
      >
        <span>{name || path}</span>
      </Button>
    </Link>
  );
}
