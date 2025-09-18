import { Chapter } from "@/components/kit";
import React from "react";
import Phonetic from "./Phonetic";

export default function Base() {
  return (
    <div className="res-box">
      <div className="mb-8">
        <Chapter
          title="International Phonetic Alphabet"
          desc="英语音标（IPA）是记录英语发音的符号系统，包含元音和辅音。它准确表示每个音的发音方式和位置，帮助学习者克服拼写与发音不一致的困难，掌握标准地道的读音。"
        />
      </div>
      <Phonetic />
    </div>
  );
}
