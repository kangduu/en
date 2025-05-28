import List from "@/components/List";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Synonym } from "@/lib/actions";
import { matchSentence } from "@/utils";
import React from "react";
interface LifeExamplesProps {
  examples: Synonym["life_examples"];
}
export default function LifeExamples({ examples }: LifeExamplesProps) {
  return (
    <Card className="flex-1">
      <CardContent>
        {examples.map(({ scene, ...rest }) => {
          return (
            <div key={scene} className="last:mt-6">
              <div className="mb-4 font-medium">{scene}</div>
              {Object.keys(rest).map((key) => {
                const sentence = rest[key];
                const { english, translate } = matchSentence(sentence);
                const included = english.includes(key);
                return (
                  <List
                    key={key}
                    title={
                      <Popover>
                        <PopoverTrigger className="text-left">
                          {included ? (
                            english.split(key).map((part, index) => (
                              <React.Fragment key={index}>
                                {part}
                                {index < english.split(key).length - 1 && (
                                  <span className="text-blue-400">{key}</span>
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <span>{english}</span>
                          )}

                          {!included && (
                            <span className="text-blue-400">（{key}）</span>
                          )}
                        </PopoverTrigger>
                        <PopoverContent>
                          <span>{translate}</span>
                        </PopoverContent>
                      </Popover>
                    }
                    className="mb-4"
                  />
                );
              })}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
