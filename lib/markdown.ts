import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import dayjs from "dayjs";

const getSubfoldersByContentDirectory = (folder: string) =>
  path.join(process.cwd(), `lib/posts/${folder}`);

// 将标题文本转换为 id（类似 remark-slug 的功能）
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // 去掉特殊字符
    .replace(/\s+/g, "-"); // 空格转 -
}

type NodeType = {
  type: string;
  depth: number;
  children: NodeType[];
  value?: string;
  data?: { [key: string]: unknown };
};

// 根据 slug 获取文章内容 + metadata + HTML
export async function getPostBySlug(slug: string, folder: string) {
  const dir = getSubfoldersByContentDirectory(folder);
  const fullPathMd = path.join(dir, `${slug}.md`);
  let fullPath: string;
  if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  // format date
  if (data.date) data.date = dayjs(data.date).format("YYYY-MM-DD HH:mm:ss");

  const toc: {
    text: string;
    level: number;
    id: string;
  }[] = [];

  const processed = await remark()
    .use(remarkGfm) // 支持 GFM 表格、task list、strikethrough 等
    // .use(remarkRehype)
    .use(() => (tree: NodeType) => {
      const visit = (node: NodeType) => {
        if (node.type === "heading" && node.children) {
          const text = node.children.map((c) => c.value).join("");
          const id = slugify(text);
          toc.push({
            text,
            level: node.depth,
            id,
          });
          // 给 node 添加 id 属性
          node.data = node.data || {};
          node.data.hProperties = { id };
        }
        if (node.children) node.children.forEach(visit);
      };
      visit(tree);
    })
    .use(html)
    .process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    metadata: data, // title, date, etc.
    contentHtml,
    headings: toc,
  };
}

// 获取所有文章 slugs
export function getPostSlugs(folder: string) {
  const dir = getSubfoldersByContentDirectory(folder);
  const filenames = fs.readdirSync(dir);
  return filenames
    .filter((fn) => fn.endsWith(".md") || fn.endsWith(".mdx")) // 如果混用
    .map((fn) => fn.replace(/\.mdx?$/, ""));
}

export interface MarkdownMetadata {
  slug: string;
  date?: string;
  title?: string;
}

/**
 * 获取content文件夹下指定子文件夹中的所有markdown文件
 * @param folder 子文件名称
 * @returns
 */
export async function getAllSlugsByFolder(folder: string) {
  const filenames = getPostSlugs(folder);
  const posts: MarkdownMetadata[] = await Promise.all(
    filenames.map(async (slug) => {
      const { metadata } = await getPostBySlug(slug, folder);

      return {
        slug,
        ...metadata,
      } satisfies MarkdownMetadata;
    })
  );

  // 按metadata设置的date参数排序
  return posts.sort((a, b) => {
    if (b.date && a.date)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });
}
