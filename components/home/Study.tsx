import React from "react";
import Chapter from "./Chapter";
import Container from "../kit/Container";

export default function Study() {
  return (
    <Container className="mt-16 px-4 md:px-0">
      <Chapter
        title="学习内容"
        desc="探索我们丰富的英语学习资源，从单词到文章，全面提升你的英语能力"
      />
    </Container>
  );
}
