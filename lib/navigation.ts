import {
  NewConceptBookKeys,
  NewConceptBookNames,
  type NewConceptBookKey,
} from "./utils";

export interface LinkStore {
  title: string;
  url: string;
}

export interface BookLink extends LinkStore {
  id: NewConceptBookKey; // Book key for the book
  description?: string; // Optional description for the book
}

//  This file contains the navigation structure for the books
//  and their respective links
export const NewConceptBooks: BookLink[] = NewConceptBookKeys.map((key) => {
  return {
    id: key,
    title: NewConceptBookNames[key],
    url: `/nce/${key}`, // URL for the book
  };
});

export interface HeaderLink extends LinkStore {
  id: number | NewConceptBookKey;
  children?: HeaderLink[];
}

// This file contains the navigation structure for the header links
// and their respective links
export const HeaderLinks: HeaderLink[] = [
  {
    id: 1,
    title: "新概念英语",
    url: "/nce",
    children: NewConceptBooks,
  },
  { id: 2, title: "同义词", url: "/synonym" },
  { id: 3, title: "语言基础", url: "/base" },
  { id: 4, title: "我的笔记", url: "/blog" },
];
