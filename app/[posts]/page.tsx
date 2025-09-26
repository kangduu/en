import Link from "next/link";
import { getAllSlugsByFolder } from "@/lib/markdown";
import { Chapter } from "@/components/kit";
import type { PropsWithChildren } from "react";
import Empty from "@/components/svg/Empty";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
      <div className="my-4 md:flex flex-wrap md:gap-4 space-y-4 md:space-y-0">
        {posts.map(({ slug, title, tags, description, date }) => {
          return (
            <Card
              key={slug}
              className="min:width-fit flex-1 md:flex-1/3 xl:flex-1/4"
            >
              <CardHeader className="lg:flex items-center">
                <Link
                  href={`/${folder}/${slug}`}
                  className="text-xl font-bold block max-w-full overflow-hidden text-ellipsis whitespace-nowrap mr-auto"
                  title={title}
                >
                  {title}
                </Link>
                <div className="whitespace-nowrap ">
                  {tags?.map((val, i) => (
                    <span
                      key={val + i}
                      className="px-2 py-1 bg-red-100/80 rounded-sm text-gray-700 text-[0.8rem]"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>{description}</CardContent>
              <CardFooter>
                {date && (
                  <span className="text-muted text-[0.8rem] mr-4">
                    上次编辑：{date}
                  </span>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
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
          <Chapter title="新概念课堂笔记" />
        </View>
      )}
      {posts === "bbc" && (
        <View folder="bbc">
          <Chapter
            title="BBC English in a Minute"
            desc="How much English can you learn in a minute? "
          />
        </View>
      )}
    </main>
  );
}
