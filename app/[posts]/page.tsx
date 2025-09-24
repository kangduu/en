import Link from "next/link";
import { getAllSlugsByFolder } from "@/lib/markdown";
import { Chapter } from "@/components/kit";
import type { PropsWithChildren } from "react";
import Empty from "@/components/svg/Empty";
import dayjs from "dayjs";

const Folders = ["blog", "nce-course", "bbc"] as const;
type PostsFolder = (typeof Folders)[number];

const View = async ({
  children,
  folder,
}: PropsWithChildren & { folder: PostsFolder }) => {
  const posts = await getAllSlugsByFolder(folder);
  if (!posts?.length) return null;
  return (
    <section className="mb-4">
      {children}
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link href={`/${folder}/${post.slug}`}>{post.title}</Link>
              {post.date && <span> — {dayjs(post.date).format("YYYY-MM-DD HH:mm")}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

type Props = {
  params: Promise<{ posts: PostsFolder }>;
};

/**
 * 笔记博客页面
 * @desc 可根据 lib/posts 目录展示不同的页面内容
 * @param param0
 * @returns
 */
export default async function NoteListPage({ params }: Props) {
  const { posts } = await params;
  if (!Folders.includes(posts)) return <Empty.page />;
  return (
    <main className="res-box">
      {posts === "blog" && (
        <View folder="blog">
          <Chapter title="我的笔记" desc="学习笔记，好记性不如烂笔头！" />
        </View>
      )}
      {posts === "nce-course" && (
        <View folder="nce-course">
          <Chapter title="新概念课堂笔记" desc="todo" />
        </View>
      )}
      {posts === "bbc" && (
        <View folder="bbc">
          <Chapter title="BBC短语学习" desc="todo" />
        </View>
      )}
    </main>
  );
}
