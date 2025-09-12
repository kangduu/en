"use client";

import Container from "@/components/Container";
// import LexicalComp from "@/components/Lexical";
import Phonetic from "@/components/Phonetic";
import Subhead from "@/components/Subhead";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@icon-park/react";

export default function Home() {
  return (
    <>
      <div className="w-full bg-primary">
        <Container className="py-8 md:py-20 px-2 md:px-0 text-white">
          <h1 className="text-4xl md:text-5xl m-0">提升你的英语能力</h1>
          <h2 className="text-4xl md:text-5xl m-0">从这里开始</h2>

          <desc className="block mt-4">
            全面的英语学习平台，包含单词、短语、语法、文章和NEC课本内容，助你高效学习英语
          </desc>

          <div className=" mt-8 md:mt-12">
            <Button className="bg-white text-primary" size="lg">
              开始学习
              <ArrowRight theme="outline" size="24" fill="var(--primary)" />
            </Button>
            <Button className="text-primary ml-4" size="lg" variant="secondary">
              了解更多
              <ArrowRight theme="outline" size="24" fill="var(--primary)" />
            </Button>
          </div>
        </Container>
      </div>

      {/* <Subhead>Lexical</Subhead>
      <LexicalComp /> */}
      {/* <Subhead>phonetic</Subhead> */}
      {/* <Phonetic /> */}
      {/* <h1 className="my-4">Part 3 Practices</h1> */}
      {/* <h1 className="my-4">Part 4 Exam</h1> */}
    </>
  );
}
