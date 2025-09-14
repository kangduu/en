import React from "react";
import Container from "../kit/Container";
import Chapter from "./Chapter";

export default function Notes() {
  return (
    <Container className="mt-16 px-4 md:px-0">
      <Chapter
        title="我的笔记"
        desc="记录学习过程中的重点和难点，方便复习和巩固"
      />
    </Container>
  );
}
