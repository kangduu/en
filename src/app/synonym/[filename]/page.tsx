import React from "react";
import GoBack from "@/src/components/GoBack";
import ComparisonTable from "./Comparison";
import ExplanationList from "./Explanation";
import { getSynonyms } from "@/lib/actions";
import LifeExamples from "./LifeExamples";
import CommonErrors from "./CommonErrors";
import MiniTest from "./MiniTest";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  const { filename } = await params;
  const synonymous = await getSynonyms(filename);

  if (!synonymous) return <div>No synonyms found</div>;

  const {
    words,
    explanation,
    comparison_table,
    life_examples,
    common_errors,
    mini_test,
    ...rest
  } = synonymous;

  console.log(rest);
  // todo  additional_notes
  return (
    <>
      <GoBack>{words.join("、")}的区别</GoBack>

      {/* explanation end life-examples */}
      <div className="gap-4 flex flex-col md:flex-row">
        <ExplanationList explanation={explanation} />
        <LifeExamples examples={life_examples} />
      </div>

      {/* comparison */}
      <ComparisonTable data={comparison_table} words={words} />

      {/* common errors */}
      <CommonErrors errors={common_errors} />

      {/* tests */}
      <MiniTest tests={mini_test} />
    </>
  );
}
