import React from "react";
import GoBack from "@/src/components/GoBack";
import ComparisonTable from "./Comparison";
import ExplanationList from "./Explanation";
import { getSynonyms } from "@/lib/actions";
import LifeExamples from "./LifeExamples";
import { Separator } from "@/components/ui/separator";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  const { filename } = await params;
  const synonymous = await getSynonyms(filename);

  if (!synonymous) return <div>No synonyms found</div>;

  const { words, explanation, comparison_table, life_examples } = synonymous;

  console.log(synonymous);
  // todo life_examples、common_errors、mini_test、additional_notes
  return (
    <>
      <GoBack>{words.join("、")}的区别</GoBack>

      <div className="gap-4 flex flex-col md:flex-row">
        {/* explanation */}
        <ExplanationList explanation={explanation} />
        <LifeExamples examples={life_examples} />
      </div>
      <Separator className="my-4" />
      {/* comparison */}
      <ComparisonTable data={comparison_table} words={words} />
    </>
  );
}
