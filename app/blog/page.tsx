"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hexToRgb } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { GetReposLabels } from "@/requests";
import Loading from "@/components/svg/Loading";

interface LabelType {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export default function Blog() {
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLabels = async () => {
    setLoading(true);
    const labels = await GetReposLabels<LabelType[]>();
    if (labels) setLabels(labels);
    setLoading(false);
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const router = useRouter();
  if (loading) return <Loading />;
  return (
    <div className="res-box md:flex flex-wrap gap-4 space-y-4 md:space-y-0">
      {labels?.map(({ id, name, color, description }) => (
        <Card
          key={id}
          style={{ backgroundColor: `${hexToRgb(color, 0.8)}` }}
          className="flex-1 px-4"
          onClick={() => router.push(`/blog/${name}`)}
        >
          <h2 className="capitalize font-bold text-white text-2xl">{name}</h2>
          <div className="text-gray-200">{description}</div>
        </Card>
      ))}
    </div>
  );
}
