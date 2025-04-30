import {
  NewConceptBookKeys,
  NewConceptBookNames,
  type NewConceptBookKey,
} from "../utils/constant";

export const HeaderLinkPathMapping = {
  NCE: "/nce",
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
    url: `${HeaderLinkPathMapping["NCE"]}/${key}`, // URL for the book
  };
});

export interface HeaderLink extends LinkStore {
  id: number;
}

// This file contains the navigation structure for the header links
// and their respective links
export const HeaderLinks: HeaderLink[] = [
  { id: 1, title: "NCE", url: "/nce" },
  { id: 2, title: "Lexical", url: "/lexical" },
  { id: 3, title: "PETS", url: "/pets" },
];
