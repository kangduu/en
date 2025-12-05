import { getPostBySlug } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string; posts: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug, posts } = await params;
  const { contentHtml, metadata } = await getPostBySlug(slug, posts);
  return (
    <article className="md res-box">
      <h1>{metadata.title}</h1>
      <div className="flex items-center">
        {metadata.date && <p className="mr-auto">{metadata.date}</p>}
        {metadata.link && (
          <a href={metadata.link} target="_blank">
            原文
          </a>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
