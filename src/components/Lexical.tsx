"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Spin, GridLayout } from "./ui";
import { GetReposLabels } from "../requests";
import { hexToRgb } from "@/lib/utils";

interface LabelType {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export default function Lexical() {
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
  if (loading) return <Spin />;
  return (
    <GridLayout>
      {labels?.map(({ id, name, color }) => (
        <Card
          key={id}
          style={{ backgroundColor: `${hexToRgb(color, 0.8)}` }}
          onClick={() => router.push(`/lexical/${name}`)}
        >
          <div className="capitalize font-bold text-white">{name}</div>
        </Card>
      ))}
      {/* <Card clickable={false}>
        <h2>Word Formation</h2>
        <h3>
          <Link href="#">0. Root Creation</Link>
        </h3>

        <h3>1. Derivation (Prefixes & Suffixes)</h3>
        <i>
          Adding affixes to a base word to change its meaning or grammatical
          category.
        </i>
        <ul className="list-disc ml-8">
          <li>Prefixes (change meaning, not word class.)</li>
          <ol className="ml-8 list-disc">
            <li>
              un-(negative): happy → <strong>un</strong>happy
            </li>
            <li>
              re-(again): write → <strong>re</strong>write
            </li>
          </ol>
          <li>Suffixes (often change word class)</li>
          <ol className="ml-8 list-disc">
            <li>
              -ness(adj. → noun): kind → kind<strong>ness</strong>
            </li>
            <li>
              -ize(noun → verb): modern → modern<strong>ize</strong>
            </li>
          </ol>
        </ul>

        <h3>2. Compounding</h3>
        <h3>3. Conversion</h3>
        <h3>4. Abbreviation</h3>
        <h3>5. Blending</h3>
        <h3>6. Back-formation</h3>
        <h3>7. Borrowing</h3>
        <h3>8. Onomatopoeia</h3>
        <h3>9. Reduplication</h3>
      </Card> */}
    </GridLayout>
  );
}
