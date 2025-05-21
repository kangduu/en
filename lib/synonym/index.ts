import fs from "fs";

const DirName = "./lib/synonym";

/**
 * read synonym directory json file list
 * @returns {Promise<string[]>}
 */
export function readSynonymDir(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    try {
      const files: string[] = fs.readdirSync(DirName, "utf8");
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

export interface Synonym {
  words: string[];
  explanation: {
    overview: string;
    details: { word: string; meaning: string; example: string }[];
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
    [key: string]: unknown;
  };
}

/**
 * read synonym directory file target
 * @param filename  file name
 * @returns { Promise<Synonym | null>}
 */
export function readSynonymDirFile(filename: string): Promise<Synonym | null> {
  try {
    const data = fs.readFileSync(`${DirName}/${filename}.json`, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
}

export type SynonymousData = Record<
  string,
  { filename: string; data: Synonym }
>;
/**
 * read synonym directory files
 * @returns {Promise<SynonymousData>}
 */
export default function readSynonymDirFiles(): Promise<SynonymousData> {
  return new Promise<SynonymousData>(async (resolve, reject) => {
    const files: string[] = await readSynonymDir().catch((err) => {
      reject(err);
      return [];
    });

    const content: SynonymousData = {};

    for (let i = 0; i < files.length; i++) {
      try {
        const filename = files[i];
        const data = fs.readFileSync(`${DirName}/${filename}.json`, "utf8");
        content[filename] = {
          filename,
          data: JSON.parse(data),
        };
      } catch (error) {
        reject(error);
      }
    }

    resolve(content);
  });
}
