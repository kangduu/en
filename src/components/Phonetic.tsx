"use client";

import React from "react";
import { vowels, consonants } from "@/src/db/phonetic.json";

type DataType = Record<
  string,
  { symbol: string; example: string; word: string }[]
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
      <div key={key} className="px-4">
        <h3>{key}</h3>
        {value.map(({ symbol, example }) => {
          return (
            <div
              key={symbol}
              className="float-left text-lg cursor-pointer"
              onClick={handleCopy.bind(null, symbol)}
            >
              <span className=" " key={symbol}>
                {symbol}
              </span>
              <span className="ml-1 mr-4">({example})</span>
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
    <section className="rounded-lg bg-red-100/30  border-1 block py-1 dark:text-black">
      <h2 className="text-center capitalize border-b-1 py-1">vowels</h2>
      {vowels && RenderList(vowels)}
      <h2 className="text-center capitalize border-b-1 border-t-1 py-1">
        consonants
      </h2>
      {consonants && RenderList(consonants)}
    </section>
  );
}
