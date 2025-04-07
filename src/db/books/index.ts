import type { NewConceptBookKey } from "@/src/utils/constant";

export interface Course {
  id: number;
  name: string;
  course: string[];
  translation: string[];
}

type ImportCourse = () => Promise<Course[]>;

export const books: Record<NewConceptBookKey, ImportCourse> = {
  "first-things-first": () =>
    import("./one.json").then((module) => module.default),
  "practice-and-progress": () =>
    import("./two.json").then((module) => module.default),
  "developing-skills": () =>
    import("./three.json").then((module) => module.default),
  "fluency-in-english": () =>
    import("./four.json").then((module) => module.default),
};
