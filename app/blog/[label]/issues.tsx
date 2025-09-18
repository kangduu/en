"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Comments from "./comments";
import { GetReposIssues } from "@/requests";
import Loading from "@/components/svg/Loading";
import Empty from "@/components/svg/Empty";
import { Card } from "@/components/ui/card";
import { MDViewer } from "@/components/kit";

interface IssueType {
  id: number;
  title: string;
  html_url: string;
  body: string;
  comments: number;
  comments_url: string;
}

export default function IssuesPage({ label }: { label: string }) {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    const issues = await GetReposIssues<IssueType[]>(label);
    setLoading(false);
    if (issues) setIssues(issues);
  }, [label]);

  // mount
  useEffect(() => {
    if (label) fetchIssues();
  }, [label, fetchIssues]);

  const [active, setActive] = useState<IssueType | null>(null);
  useEffect(() => {
    setActive(issues[0]);
  }, [issues]);

  useLayoutEffect(() => {
    if (active) {
      const h1 = document.getElementById(active.id + "");
      h1?.scrollIntoView({ block: "start" });
    }
  }, [active]);

  console.log(issues);

  if (loading) return <Loading />;
  if (!issues?.length) return <Empty.list />;
  return (
    <div className="md py-6 res-box w-full">
      {active && (
        <>
          <h1 id={active.id + ""} className="text-primary">
            {active.title}
          </h1>
          <MDViewer content={active.body} />
          {active.comments > 0 && <Comments url={active.comments_url} />}
        </>
      )}
      {issues.length > 0 && !loading && (
        <Card className="px-4">
          {issues.map((item, index) => {
            const isActive = active?.id === item.id;
            return (
              <div
                key={item.id}
                className={`text-sm mb-2 hover:underline ${
                  isActive ? "text-primary-500" : ""
                }`}
                onClick={() => {
                  if (isActive) return;
                  setActive(item);
                }}
              >
                {index + 1}. {item.title}
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}
