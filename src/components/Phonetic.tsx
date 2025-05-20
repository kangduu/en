"use client";

import React from "react";
import { vowels, consonants } from "@/lib/phonetic.json";
import { toast } from "sonner";

type DataType = Record<
  string,
  { symbol: string; example: string; phonetic: string }[]
>;

function RenderList(data: DataType) {
  const handleCopy = (symbol: string) => {
    const success = () => {
      toast.success("Copy successfully!", {
        description: "It has been successfully copied to the clipboard.",
      });
    };

    const fail = (error: unknown) => {
      toast.error("Copy failed!", {
        description: (error as { message: string }).message,
      });
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(symbol).then(success, fail);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = symbol;
      textarea.style.position = "fixed"; // 避免滚动到页面底部
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        success();
      } catch (err) {
        fail(err);
      }
      document.body.removeChild(textarea);
    }
  };
  return Object.keys(data).map((key) => {
    const value = data[key];
    return (
      <div key={key} className="px-4 pt-2 mb-4">
        <div className="capitalize text-primary-400">
          {key}：({value.length})
        </div>
        {value.map(({ symbol, example, phonetic }) => {
          return (
            <div
              key={symbol}
              className="float-left text-lg cursor-pointer"
              onClick={handleCopy.bind(null, symbol)}
            >
              <span key={symbol} className="font-bold">
                {symbol}
              </span>
              <span className="ml-2 mr-4">
                [{example} {phonetic}]
              </span>
            </div>
          );
        })}
        <div className="clear-left" />
      </div>
    );
  });
}

export default function Phonetic() {
  return (
    <section className="rounded-lg bg-red-50 dark:bg-red-100  border-red-300 border-1 dark:text-black">
      <div className="font-bold text-center capitalize border-red-300 border-b-1  py-1">
        vowels
      </div>
      {vowels && RenderList(vowels)}
      <div className="font-bold text-center capitalize border-red-300 border-b-1 border-t-1 py-1">
        consonants
      </div>
      {consonants && RenderList(consonants)}
    </section>
  );
}
