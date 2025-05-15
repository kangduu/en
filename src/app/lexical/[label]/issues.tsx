"use client";
import { MarkdownViewer } from "@/src/components";
import { Spin, Collapse } from "@/src/components/ui";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Comments from "./comments";
import { GetReposIssues } from "@/src/requests";

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

  if (loading) return <Spin />;
  return (
    <>
      {active && (
        <>
          <h1 id={active.id + ""} className="text-primary-500">
            {active.title}
          </h1>
          <MarkdownViewer content={active.body} />
          {active.comments > 0 && <Comments url={active.comments_url} />}
        </>
      )}
      {issues.length > 0 && !loading && (
        <Collapse title="Catalogue" style={{ marginTop: 20 }}>
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
        </Collapse>
      )}
    </>
  );
}
