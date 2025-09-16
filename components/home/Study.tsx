import React from "react";
import Chapter from "../kit/Chapter";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { StudyList } from "./utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import Marking from "./Marking";
import { Button } from "../ui/button";

export default function Study({ className }: ComponentCssProps) {
  return (
    <div id="start" className={cn("", className)}>
      <Chapter
        title="学习内容"
        desc="探索我们丰富的英语学习资源，从单词到文章，全面提升你的英语能力"
      />

      <div className="lg:flex flex-wrap space-y-4 lg:space-y-0 gap-4 mt-8">
        {StudyList.map(
          ({ key, img, styles, icon, title, description, total }) => {
            return (
              <Card key={key} className="lg:flex-1/3 xl:flex-1 p-0 overflow-hidden">
                <CardHeader className="p-0 h-50 overflow-hidden flex items-center">
                  {img && (
                    <Image
                      className="min-w-[100%] min-h-full max-w-[auto] hover:scale-110 duration-500"
                      width={160}
                      height={90}
                      src={img}
                      alt=""
                    />
                  )}
                </CardHeader>
                <CardContent className={cn(styles?.text)}>
                  <div className="flex items-center gap-2">
                    <Marking className={cn(styles?.bg)}>{icon}</Marking>
                    <h2 className="m-0 text-black dark:text-white">{title}</h2>
                  </div>
                  <div className="text-muted mt-2 mb-4">{description}</div>
                  <div
                    className={cn(
                      "md:flex items-center justify-between mb-4",
                      styles?.text
                    )}
                  >
                    <div className="font-bold">
                      {total}&nbsp;+&nbsp;&nbsp;&nbsp;{title}
                    </div>
                    <Button
                      className={cn(
                        styles?.bg,
                        styles?.text,
                        `hover:${styles?.bg} mt-4 md:mt-0 w-full md:w-fit`
                      )}
                    >
                      开始学习
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}
