"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Chapter from "../kit/Chapter";
import {
  cn,
  NewConceptBookNames,
  NewConceptBookKeys,
  NCEBookElaborate,
} from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { StudyList } from "./utils";

const Styles = StudyList.map(({ styles }) => styles);
const Names = NewConceptBookKeys.map((key) => ({
  key,
  name: NewConceptBookNames[key],
  ...NCEBookElaborate[key],
}));

export default function NCE({ className }: ComponentCssProps) {
  const router = useRouter();
  return (
    <div id="nce" className={cn("", className)}>
      <Chapter
        title="NCE课本"
        desc="按照NCE课本同步学习，巩固课堂知识，提高学习效率"
      />

      <div className="lg:flex flex-wrap space-y-4 lg:space-y-0 gap-4 mt-8">
        {Names.map(({ name, alias, lesson, target, key }, i) => {
          const styles = Styles[i];
          return (
            <Card
              key={key}
              className="lg:flex-1/3 xl:flex-1 overflow-hidden"
              onClick={() => {
                router.push(`/nce/${key}`);
              }}
            >
              <CardHeader className="flex gap-4 items-center text-nowrap">
                <div
                  className={cn(
                    "w-12 min-w-12 h-12 min-h-12 rounded-[0.5rem] font-[500] text-xl flex items-center justify-center",
                    styles?.bg,
                    styles?.text
                  )}
                >
                  0{i + 1}
                </div>
                <div>
                  <h2 className="m-0">{name}</h2>
                  <div className="text-muted">
                    {alias}【共 {lesson} 课】
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-justify text-muted">
                {target}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
