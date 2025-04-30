"use client";

import { MarkdownViewer } from "@/src/components";
import React, { useEffect, useState } from "react";

interface CommentType {
  url: string;
  html_url: string;
  id: number;
  created_at: string;
  updated_at: string;
  body: string;
}

interface CommentsProps {
  url: string;
}
export default function Comments({ url }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    if (url)
      fetch(url)
        .then((res) => res.json())
        .then((data) => setComments(data));
  }, [url]);

  return (
    <>
      <hr />
      <h2 className="text-primary-500 uppercase mt-8">comments</h2>
      {comments?.map(({ body, id }) => (
        <div
          key={id}
          className="px-4 py-2 mb-4 bg-yellow-100/50 dark:bg-slate-600 rounded"
        >
          <MarkdownViewer content={body} />
        </div>
      ))}
    </>
  );
}
