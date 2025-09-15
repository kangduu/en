import { Bill, FontSizeTwo, Message, OrderedList } from "@icon-park/react";

export const StudyEnum = {
  WORD: "单词",
  PHRASE: "短语",
  GRAMMAR: "语法",
  ARTICLE: "文章",
} as const;

export type StudyKey = keyof typeof StudyEnum;

export interface StudyValue {
  key: StudyKey;
  title: (typeof StudyEnum)[StudyKey];
  theme?: "orange" | "green" | "purple";
  total: number;
  current: number;
  icon: React.ReactNode;
  description: React.ReactNode;
  img: string;
  action: (value: string) => React.ReactNode;
}

export const StudyList: StudyValue[] = [
  {
    key: "WORD",
    title: "单词",
    // theme: "primary",
    total: 26654,
    current: 1200,
    icon: <FontSizeTwo theme="outline" size="18" />,
    img: "/static/word.jpg",
    description: "掌握常用英语单词，丰富你的词汇量，提高听说读写能力",
    action: (value) => `已学习${value}`,
  },
  {
    key: "PHRASE",
    title: "短语",
    theme: "orange",
    total: 3625,
    current: 235,
    icon: <Message theme="outline" size="18" />,
    img: "/static/phrase.png",
    description: "学习实用英语短语和表达，提升日常交流能力和语感",
    action: (value) => `已练习${value}`,
  },
  {
    key: "GRAMMAR",
    title: "语法",
    theme: "green",
    total: 625,
    current: 12,
    icon: <OrderedList theme="outline" size="18" />,
    img: "/static/grammar.jpg",
    description: "系统学习英语语法知识，掌握正确的句子结构和表达方式",
    action: (value) => `已掌握${value}`,
  },
  {
    key: "ARTICLE",
    title: "文章",
    theme: "purple",
    total: 59,
    current: 3,
    icon: <Bill theme="outline" size="18" />,
    img: "/static/article.jpg",
    description: "阅读精选英语文章，提高阅读理解能力，了解多元文化",
    action: (value) => `已阅读${value}篇`,
  },
];
