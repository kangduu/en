import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import List from "@/components/List";
import type { Synonym } from "@/lib/synonyms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { matchSentence } from "@/lib/utils";

interface ExplanationProps {
  explanation: Synonym["explanation"];
}
export default function ExplanationList({ explanation }: ExplanationProps) {
  const { overview, details } = explanation || {};
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardDescription>{overview}</CardDescription>
      </CardHeader>
      <CardContent>
        {details?.map(({ word, meaning, example, pronunciation }) => {
          const { english, translate } = matchSentence(example);
          const Word = <span className="capitalize">{word}</span>;
          const title = pronunciation ? (
            <span className="inline-flex items-center gap-2">
              {Word}
              <Badge variant="outline">[uk] {pronunciation.uk}</Badge>
              <Badge variant="outline">[us] {pronunciation.us}</Badge>
            </span>
          ) : (
            Word
          );
          return (
            <List key={word} title={title} description={meaning}>
              <Popover>
                <PopoverTrigger className="text-left">
                  <span>{english}</span>
                </PopoverTrigger>
                {translate && (
                  <PopoverContent>
                    <span>{translate}</span>
                  </PopoverContent>
                )}
              </Popover>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
}
