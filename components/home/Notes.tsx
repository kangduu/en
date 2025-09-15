import React from "react";
import Chapter from "../kit/Chapter";
import { cn } from "@/lib/utils";

export default function Notes({ className }: ComponentCssProps) {
  return (
    <div className={cn("", className)}>
      <Chapter
        title="我的笔记"
        desc="记录学习过程中的重点和难点，方便复习和巩固"
      />
    </div>
  );
}
