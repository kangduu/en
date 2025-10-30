import type { NewConceptBookKey } from "../utils";

export interface Course {
  id: number; // course unique id
  name: string;
  course: string[];
  translation: string[];
  notes?: string[];
  audio: string;
  type?: "essay" | "dialogue"; // course type, default dialogue.
}

type ImportCourse = () => Promise<Course[]>;

export const books: Record<NewConceptBookKey, ImportCourse> = {
  "first-things-first": () =>
    import("./one.json").then((module) => module.default) as Promise<Course[]>,
  "practice-and-progress": () =>
    import("./two.json").then((module) => module.default) as Promise<Course[]>,
  "developing-skills": () =>
    import("./three.json").then((module) => module.default) as Promise<
      Course[]
    >,
  "fluency-in-english": () =>
    import("./four.json").then((module) => module.default),
};

/**
 * Get courses by book and id
 * @param book NewConceptBookKey
 * @param id  Course["id"]
 * @returns Course[] | Course | undefined
 */
export async function getCourses(
  book: NewConceptBookKey,
  id?: Course["id"]
): Promise<Course[] | Course | null> {
  const courses = await books[book]()
    .then((res) => res)
    .catch(() => []);
  if (id) {
    const course = courses.find((item) => item.id === id);
    if (course) return course;
    return null;
  }
  return courses;
}
