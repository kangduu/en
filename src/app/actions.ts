"use server";
import { unstable_cache } from "next/cache";

export const getSynonyms = unstable_cache(async function (filename: string) {
  try {
    const data = await import(`@/lib/synonym/${filename}.json`);
    return data.default;
  } catch (error) {
    console.log(error);
    return null;
  }
});
