import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names
 * @param inputs Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SiteTitle = "EnglishHub";

export const NewConceptBookKeys = [
  "first-things-first",
  "practice-and-progress",
  "developing-skills",
  "fluency-in-english",
] as const;

export type NewConceptBookKey = (typeof NewConceptBookKeys)[number];

export const NewConceptBookNames: Record<NewConceptBookKey, string> = {
  "first-things-first": "First Things First",
  "practice-and-progress": "Practice and Progress",
  "developing-skills": "Developing Skills",
  "fluency-in-english": "Fluency in English",
} as const;

export const NewConceptBooks: BookLink[] = NewConceptBookKeys.map((key) => {
  return {
    id: key,
    title: NewConceptBookNames[key],
    url: `/nce/${key}`, // URL for the book
  };
});

export const NCEBookElaborate: Record<
  NewConceptBookKey,
  {
    lesson: number;
    alias: string;
    target: string;
  }
> = {
  "first-things-first": {
    target: "达到初中毕业英语水平，掌握约1500个单词和基础的英语语法、句型。",
    lesson: 144,
    alias: "英语初阶",
  },
  "practice-and-progress": {
    target:
      "达到高中毕业英语水平，掌握约4000个单词，能够分析句子结构，熟练掌握关键语法点。",
    lesson: 96,
    alias: "实践与进步",
  },
  "developing-skills": {
    target:
      "达到大学英语四级至六级的水平，能够熟练运用高级词汇和复杂句型，写出地道的英文文章。",
    lesson: 60,
    alias: "培养技能",
  },
  "fluency-in-english": {
    target:
      "接近英语专业八级水平，能够欣赏原文佳作，理解西方文化，实现英语的流利运用。",
    lesson: 48,
    alias: "流利英语",
  },
};

/**
 * Convert a color string in hex format to rgba format
 * @param hex color string in hex
 * @param alpha
 * @returns
 */
export function hexToRgb(hex: string, alpha: number = 0.7): string {
  const match = hex.match(/\w\w/g);
  if (!match) throw new Error("Invalid hex color format");
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type MatchSentenceReturn = {
  translate: string;
  english: string;
};

/**
 * 使用正则表达式匹配英文和中文部分
 * @param sentence
 * @returns {MatchSentenceReturn}
 */
export function matchSentence(sentence: string): MatchSentenceReturn {
  try {
    const regex = /^([^（]+)（([^）]+)）/;
    const match = sentence.match(regex);
    if (!match) return { english: sentence, translate: "" };
    return { english: match?.[1] || "", translate: match?.[2] || "" };
  } catch (error) {
    console.log(error);
    return { english: "", translate: "" };
  }
}
