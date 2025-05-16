"use client";

import React from "react";
import { vowels, consonants } from "@/src/db/phonetic.json";

type DataType = Record<
  string,
  { symbol: string; example: string; phonetic: string }[]
>;

function RenderList(data: DataType) {
  const handleCopy = (symbol: string) => {
    if (navigator.clipboard) {
      // 现代浏览器
      navigator.clipboard.writeText(symbol).then(
        () => console.log("复制成功"),
        (err) => console.error("复制失败: ", err)
      );
    } else {
      // 旧版浏览器
      const textarea = document.createElement("textarea");
      textarea.value = symbol;
      textarea.style.position = "fixed"; // 避免滚动到页面底部
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        console.log("复制成功");
      } catch (err) {
        console.error("复制失败: ", err);
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
