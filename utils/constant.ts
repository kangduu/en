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
