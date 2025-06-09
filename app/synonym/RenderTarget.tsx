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
        variant="secondary"
        className="whitespace-break-spaces h-fit"
      >
        <span>{name || path}</span>
      </Button>
    </Link>
  );
}
