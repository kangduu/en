"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./styles.module.css";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <article
      // note: resolve text color error in dark mode use dark:prose-invert.
      className={`prose dark:prose-invert max-w-none dark:text-white ${styles.md}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
