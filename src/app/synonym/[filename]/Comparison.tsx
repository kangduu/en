"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Synonym } from "@/lib/actions";
import React, { useMemo } from "react";

interface ComparisonTableProps {
  words: Synonym["words"];
  data: Synonym["comparison_table"];
}

export default function ComparisonTable({ words, data }: ComparisonTableProps) {
  const header = useMemo(() => {
    return data.reduce(
      (prev, curr) => {
        prev.push(curr.aspect);
        return prev;
      },
      ["Word"]
    );
  }, [data]);

  return (
    <Table className="mt-4">
      <TableCaption>Comparison Table</TableCaption>
      <TableHeader>
        <TableRow>
          {header.map((name: string) => {
            return <TableHead key={name}>{name}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {words.map((word) => (
          <TableRow key={word}>
            <TableCell>{word}</TableCell>
            {data.map((record) => (
              <TableCell key={record.aspect}>{record[word]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
