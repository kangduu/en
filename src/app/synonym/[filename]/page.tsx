import React from "react";
import GoBack from "@/src/components/GoBack";
import { readSynonymDirFile } from "@/lib/synonym";
import ComparisonTable from "./Comparison";
import ExplanationList from "./Explanation";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  alert(0);
  const { filename } = await params;
  const synonymous = await readSynonymDirFile(filename);

  alert(123);

  if (!synonymous) return null; // todo Empty

  alert(345);

  const { words, explanation, comparison_table } = synonymous;

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
