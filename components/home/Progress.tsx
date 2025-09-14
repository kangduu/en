"use client";

import Container from "@/components/kit/Container";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Chapter from "./Chapter";
import { cn } from "@/lib/utils";
import { Bill, FontSizeTwo, Message, OrderedList } from "@icon-park/react";
import type { PropsWithChildren } from "react";
import { Progress, type ProgressBarProps } from "../ui/progress";

interface ProgressItemProps extends ComponentCssProps {
  name: string;
  desc: string;
  bgColor: string;
  icon: React.ReactNode;
}
function ProgressItem(props: PropsWithChildren<ProgressItemProps>) {
  return (
    <Card
      className={cn("flex-1 border-gray-100 bg-gray-50 p-4", props.className)}
    >
      <CardTitle className="flex items-center">
        <div>
          <div className="font-[500] text-xl">{props.name}</div>
          <div className="text-muted text-sm font-normal mt-1">
            {props.desc}
          </div>
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center ml-auto",
            props.bgColor
          )}
        >
          {props.icon}
        </div>
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

export default function StudyingProgress() {
  // todo 获取具体的进度
  return (
    <div className="mx-4 md:mx-0">
      <Container className="mt-[-1rem]">
        <Card className="px-6" hovered={false}>
          <CardTitle>
            <Chapter title="学习进度" desc="继续你的学习之旅，保持良好势头！" />
          </CardTitle>

          <div className="md:flex gap-4 space-y-4 md:space-y-0">
            <ProgressItem
              name="单词"
              desc="已学习 402/2353 "
              icon={<FontSizeTwo theme="outline" size="18" />}
              className="text-primary"
              bgColor="bg-primary/10"
            >
              <ProgressComp
                value={402}
                total={2353}
                className="bg-primary/10"
              />
            </ProgressItem>
            <ProgressItem
              name="短语"
              desc="已学习 10/12 "
              icon={<Message theme="outline" size="18" />}
              className="text-[orange]"
              bgColor="bg-[orange]/10"
            >
              <ProgressComp
                value={10}
                total={12}
                barClassName="bg-[orange]"
                className="bg-[orange]/10"
              />
            </ProgressItem>
            <ProgressItem
              name="语法"
              desc="已学习 47/123 单元"
              icon={<OrderedList theme="outline" size="18" />}
              className="text-[green]"
              bgColor="bg-[green]/10"
            >
              <ProgressComp
                value={47}
                total={123}
                barClassName="bg-[green]"
                className="bg-[green]/10"
              />
            </ProgressItem>
            <ProgressItem
              name="文章"
              desc="已阅读 20/233 篇"
              icon={<Bill theme="outline" size="18" />}
              className="text-[purple]"
              bgColor="bg-[purple]/10"
            >
              <ProgressComp
                value={20}
                total={233}
                barClassName="bg-[purple]"
                className="bg-[purple]/10"
              />
            </ProgressItem>
          </div>
        </Card>
      </Container>
    </div>
  );
}
