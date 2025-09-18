import React from "react";
import { GoBack } from "@/components/kit";
import ComparisonTable from "./Comparison";
import ExplanationList from "./Explanation";
import { getSynonyms } from "@/lib/actions";
import LifeExamples from "./LifeExamples";
import CommonErrors from "./CommonErrors";
import Additional from "./Additional";
import Test from "./Test";
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
    additional_notes,
  } = synonymous;

  return (
    <div className="res-box">
      <GoBack>{words.join(" / ")}</GoBack>

      {/* explanation end life-examples */}
      <div className="gap-4 flex flex-col md:flex-row">
        <ExplanationList explanation={explanation} />
        <LifeExamples examples={life_examples} />
      </div>

      {/* comparison */}
      <ComparisonTable data={comparison_table} words={words} />

      {/* common errors */}
      <CommonErrors errors={common_errors} />

      {/* additional notes */}
      <Additional notes={additional_notes} />

      <Test data={synonymous} />
    </div>
  );
}
