import Link from "next/link";
import { getAllSlugsByFolder } from "@/lib/markdown";
import { Chapter } from "@/components/kit";
import type { PropsWithChildren } from "react";

const View = async ({
  children,
  folder,
}: PropsWithChildren & { folder: string }) => {
  const posts = await getAllSlugsByFolder(folder);
  if (!posts?.length) return null;
  return (
    <section className="mb-4">
      {children}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${folder}/${post.slug}`}>{post.title}</Link>
            {post.date && <span> — {post.date}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};

type Props = {
  params: Promise<{ posts: string }>;
};

// 笔记列表页面
export default async function NoteListPage({ params }: Props) {
  const { posts } = await params;
  return (
    <main className="res-box">
      <View folder="blog">
        <Chapter title="我的笔记" desc="学习笔记，好记性不如烂笔头！" />
      </View>
      <View folder="nce-course">
        <Chapter title="新概念课堂笔记" desc="todo" />
      </View>
      <View folder="bbc">
        <Chapter title="BBC短语学习" desc="todo" />
      </View>
    </main>
  );
}
