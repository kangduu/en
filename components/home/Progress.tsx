"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Chapter from "../kit/Chapter";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { Progress, type ProgressBarProps } from "../ui/progress";
import { StudyList } from "./utils";
import Marking from "./Marking";

interface ProgressItemProps extends ComponentCssProps {
  name: React.ReactNode;
  desc: React.ReactNode;
  bgClassName: string;
  icon: React.ReactNode;
}
function ProgressItem(props: PropsWithChildren<ProgressItemProps>) {
  return (
    <Card
      className={cn(
        "flex-1 border-gray-100 bg-gray-50 dark:bg-gray-700 p-4",
        props.className
      )}
    >
      <CardTitle className="flex items-center">
        <div className="mr-auto">
          <div className="font-[500] text-xl">{props.name}</div>
          <div className="text-muted text-sm font-normal mt-1">
            {props.desc}
          </div>
        </div>
        <Marking className={props.bgClassName}>{props.icon}</Marking>
      </CardTitle>
      <CardContent className="p-0">{props.children}</CardContent>
    </Card>
  );
}

interface ProgressCompProps extends ComponentCssProps, ProgressBarProps {
  value: number;
  total: number;
}
function ProgressComp({
  value,
  total,
  className,
  ...props
}: ProgressCompProps) {
  const percent = Number((((value || 0) / (total || 0)) * 100).toFixed(0));
  return (
    <>
      <Progress value={percent} className={cn("h-3", className)} {...props} />
      <div className="flex text-[0.8rem] mt-1 text-muted">
        <span>{percent}%</span>
        <span className="ml-auto">目标：{total}</span>
      </div>
    </>
  );
}

export default function StudyingProgress({ className }: ComponentCssProps) {
  // todo 获取具体的进度
  return (
    <div className={cn("mt-[-1rem]", className)}>
      <Card className="px-6 " hovered={false}>
        <CardTitle>
          <Chapter title="学习进度" desc="继续你的学习之旅，保持良好势头！" />
        </CardTitle>
        <div className="lg:flex flex-wrap gap-4 space-y-4 lg:space-y-0">
          {StudyList.map(
            ({ key, title, action, icon, styles, current, total }) => {
              return (
                <ProgressItem
                  key={key}
                  name={title}
                  desc={action?.(` ${current}/${total} `)}
                  icon={icon}
                  className={cn(styles?.text, "lg:flex-1/3 xl:flex-1")}
                  bgClassName={cn(styles?.bg)}
                >
                  <ProgressComp
                    value={current}
                    total={total}
                    className={cn(styles?.bg)}
                    barClassName={cn(styles?.bar)}
                  />
                </ProgressItem>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
}
