import type { NewConceptBookKey } from "@/src/utils/constant";

export interface Course {
  id: number;
  name: string;
  course: string[];
  translation: string[];
  notes?: unknown[];
  audio?: string
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
