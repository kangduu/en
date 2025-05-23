import React from "react";
import GoBack from "@/src/components/GoBack";
import { readSynonymDirFile, type Synonym } from "@/lib/synonym";
import ComparisonTable from "./Comparison";
import ExplanationList from "./Explanation";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  const { filename } = await params;
  const synonymous = await readSynonymDirFile(filename);

  if (!synonymous) return (synonymous as Record<string, unknown>).toString(); // todo Empty

  const { words, explanation, comparison_table } = synonymous as Synonym;

  // todo life_examples、common_errors、mini_test、additional_notes
  return (
    <>
      <GoBack>{words.join("、")}的区别</GoBack>

      {/* explanation */}
      <ExplanationList explanation={explanation} />

      {/* comparison */}
      <ComparisonTable data={comparison_table} words={words} />
    </>
  );
}
