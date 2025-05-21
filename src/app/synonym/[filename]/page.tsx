import List from "@/components/List";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { readSynonymDirFile } from "@/lib/synonym";
import GoBack from "@/src/components/GoBack";
import React from "react";
import ComparisonTable from "./ComparisonTable";

interface WordProps {
  params: Promise<{ filename: string }>;
}

export default async function Word({ params }: WordProps) {
  const { filename } = await params;
  const synonymous = await readSynonymDirFile(filename);

  if (!synonymous) return null; // todo Empty

  console.log(synonymous);
  const { words, explanation, comparison_table } = synonymous;
  return (
    <>
      <GoBack>{words.join("、")}的区别</GoBack>
      <Card>
        <CardHeader>
          <CardDescription>{explanation?.overview}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* explanation */}
          {explanation?.details?.map(({ word, meaning, example }) => (
            <List key={word} title={word} description={meaning}>
              {example}
            </List>
          ))}

          {/* comparison */}
          <ComparisonTable data={comparison_table} words={words} />
        </CardContent>
      </Card>
    </>
  );
}
