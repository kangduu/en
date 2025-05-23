import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Synonym } from "@/lib/actions";
import React from "react";
interface LifeExamplesProps {
  examples: Synonym["life_examples"];
}
export default function LifeExamples({ examples }: LifeExamplesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Life Examples</CardTitle>
      </CardHeader>
      <CardContent>
        {examples.map(({ scene, ...rest }) => {
          return (
            <div key={scene}>
              <div className="font-medium">{scene}</div>
              {Object.keys(rest).map((key) => {
                return (
                  <div key={key} className="mb-2">
                    <span className="text-muted-foreground mr-4">{key}</span>
                    <span>{rest[key]}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
