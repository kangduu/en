import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import List from "@/components/List";
import type { Synonym } from "@/lib/actions";
import { matchSentence } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        {details?.map(({ word, meaning, example }) => {
          const { english, translate } = matchSentence(example);
          return (
            <List key={word} title={word} description={meaning}>
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
