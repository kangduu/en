"use client";

import { MDViewer } from "@/components/kit";
import Empty from "@/components/svg/Empty";
import Loading from "@/components/svg/Loading";
import { Request_Github_REST_API } from "@/requests";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      setLoading(true);
      const comments = await Request_Github_REST_API<CommentType[]>(url);
      if (comments) setComments(comments);
      setLoading(false);
    }
    if (url) getComments();
  }, [url]);

  if (loading) return <Loading />;
  if (!comments?.length) return <Empty.list />;
  return (
    <>
      <hr />
      <h2 className="text-primary-500 uppercase mt-8">comments</h2>
      {comments?.map(({ body, id }) => (
        <div
          key={id}
          className="px-4 py-2 mb-4 bg-yellow-100/50 dark:bg-slate-600 rounded"
        >
          <MDViewer content={body} />
        </div>
      ))}
    </>
  );
}
