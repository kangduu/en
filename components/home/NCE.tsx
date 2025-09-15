import React from "react";
import Chapter from "../kit/Chapter";
import { cn } from "@/lib/utils";

export default function NCE({ className }: ComponentCssProps) {
  return (
    <div className={cn("", className)}>
      <Chapter
        title="NCE课本"
        desc="按照NCE课本同步学习，巩固课堂知识，提高学习效率"
      />
    </div>
  );
}
