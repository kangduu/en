import React from "react";
import type { Synonym } from "@/lib/synonym";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import List from "@/components/List";

interface ExplanationProps {
  explanation: Synonym["explanation"];
}
export default function ExplanationList({ explanation }: ExplanationProps) {
  const { overview, details } = explanation || {};
  return (
    <Card>
      <CardHeader>
        <CardDescription>{overview}</CardDescription>
      </CardHeader>
      <CardContent>
        {details?.map(({ word, meaning, example }) => (
          <List key={word} title={word} description={meaning}>
            {example}
          </List>
        ))}
      </CardContent>
    </Card>
  );
}
