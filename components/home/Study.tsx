import React from "react";
import Chapter from "../kit/Chapter";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { StudyList } from "./utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import Marking from "./Marking";

export default function Study({ className }: ComponentCssProps) {
  return (
    <div className={cn("", className)}>
      <Chapter
        title="学习内容"
        desc="探索我们丰富的英语学习资源，从单词到文章，全面提升你的英语能力"
      />

      <div className="flex gap-4 mt-8">
        {StudyList.map(({ key, img, theme, icon }) => {
          const bgColor = theme ? `bg-${theme}-300` : "bg-primary/10";
          const styles = {
            className: theme ? `text-[${theme}]` : "text-primary",
            bgColor,
          };
          return (
            <Card key={key} className="flex-1 p-0 overflow-hidden">
              <CardHeader className="p-0 h-50 overflow-hidden flex items-center">
                {img && (
                  <Image
                    className="min-w-[100%] hover:scale-110 duration-500"
                    width={160}
                    height={90}
                    src={img}
                    alt=""
                  />
                )}
              </CardHeader>
              <CardContent {...styles}>
                <Marking className={cn("bg-li")}>{icon}</Marking>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
