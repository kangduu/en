// app/actions.ts
"use server";

import { readSynonymDirFile } from "@/lib/synonym";
export async function getSynonyms(filename: string) {
  return readSynonymDirFile(filename);
}
