import { getPostBySlug } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string; posts: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug, posts } = await params;
  const doc = await getPostBySlug(slug, posts);
  return (
    <article className="md res-box">
      <h1>{doc.metadata.title}</h1>
      {doc.metadata.date && <p>{doc.metadata.date}</p>}
      <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
    </article>
  );
}
