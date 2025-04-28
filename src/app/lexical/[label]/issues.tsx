"use client";
import { MarkdownViewer } from "@/src/components";
import { Spin } from "@/src/components/ui";
import Collapse from "@/src/components/ui/Collapse";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface IssueType {
  id: number;
  title: string;
  html_url: string;
  body: string;
}

export default function IssuesPage({ label }: { label: string }) {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    const issues = await fetch(
      `https://api.github.com/repos/kangduu/en/issues?labels=${label}&state=open&sort=updated`
    )
      .then((res) => res.json())
      .catch(() => []);

    setLoading(false);
    setIssues(issues);
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
          <h1 id={active.id + ""}>{active.title}</h1>
          <MarkdownViewer content={active.body} />
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
