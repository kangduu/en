import {
  NewConceptBookKeys,
  NewConceptBookNames,
  type NewConceptBookKey,
} from "../utils/constant";

export const HeaderLinkPathMapping = {
  Handwriting: "/handwriting",
  Lexical: "/lexical",
};

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
    url: `${HeaderLinkPathMapping["Handwriting"]}/${key}`, // URL for the book
  };
});

export interface HeaderLink extends LinkStore {
  id: number;
}

// This file contains the navigation structure for the header links
// and their respective links
export const HeaderLinks: HeaderLink[] = [
  { id: 1, title: "Handwriting", url: "/handwriting" },
  { id: 2, title: "Lexical", url: "/lexical" },
  { id: 3, title: "Practices", url: "/practices" },
];
