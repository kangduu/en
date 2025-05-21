import { readSynonymDirFile } from "@/lib/synonym";
import React from "react";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  const { filename } = await params;
  const synonymous = await readSynonymDirFile(filename);

  if (!synonymous) return null; // todo Empty
  return <div>{filename}</div>;
}
