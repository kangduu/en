"use server";
import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";

/**
 * read synonym directory json file list
 * @returns {Promise<string[]>}
 */
function readSynonymDir(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    try {
      const files: string[] = fs.readdirSync(
        path.join(process.cwd(), "lib", "synonym"),
        "utf8"
      );
      const dir: string[] = files
        .filter((filename) => /\.json$/.test(filename))
        .map((filename) => filename.replace(".json", ""));
      resolve(dir);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const errorWithCode = err as { code: string };
        if (errorWithCode.code === "ENOENT") {
          console.error("目录不存在");
        } else if (errorWithCode.code === "ENOTDIR") {
          console.error("路径不是目录");
        } else if (errorWithCode.code === "EACCES") {
          console.error("没有访问权限");
        } else {
          console.error("未知错误:", err);
        }
      } else {
        console.error("未知错误:", err);
      }
      reject(err);
    }
  });
}
export const getSynonymDir = unstable_cache(readSynonymDir);

export interface Synonym {
  words: string[];
  explanation: {
    overview: string;
    details: {
      word: string;
      meaning: string;
      example: string;
      pronunciation?: { uk?: string; us?: string };
    }[];
  };
  comparison_table: {
    aspect: string;
    [key: string]: string;
  }[];
  life_examples: {
    scene: string;
    [key: string]: string;
  }[];
  common_errors: {
    error: string;
    correction: string;
  }[];
  mini_test: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
  additional_notes: {
    extended_words: string[];
    [key: string]:
      | Record<string, string | number | boolean>
      | string[]
      | string;
  };
}

/**
 * import synonym json file
 * @returns {Promise<Synonym | null>}
 */
export const getSynonyms = unstable_cache(async function (
  filename: string
): Promise<Synonym | null> {
  try {
    const data = await import(`@/lib/synonym/${filename}.json`);
    return data.default;
  } catch (error) {
    console.log(error);
    return null;
  }
});
