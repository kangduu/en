import type { Course } from "@/lib/books";

export default function getTalkerWidth(data: Course) {
  const { course, type } = data;
  let width = 0;
  if (type !== "essay") {
    let max = 0,
      min = 9999;

    course.forEach((sentence) => {
      const [talker] = sentence.split(":");
      const Len = talker.length;
      if (Len > max) max = Len;
      if (Len < min) min = Len;
    });

    width = Math.ceil((max + min) / 2);
  }
  return width;
}
