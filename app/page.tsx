"use client";

import { NCE, Progress, Study, Notes } from "@/components/home";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOne, Help } from "@icon-park/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* slogan */}
      <section className="w-full bg-primary">
        <div className="res-box py-8 md:py-20 text-white block md:flex justify-between items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl m-0">
              提升你的英语能力
            </h1>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl m-0 mt-2">
              从这里开始
            </h2>

            <div className="block mt-2 md:mt-4">
              全面的英语学习平台，包含单词、短语、语法、文章和NCE课本内容，助你高效学习英语
            </div>

            <div className="mt-4 md:mt-12">
              <a href="#start">
                <Button
                  className="text-primary relative bg-white hover:bg-white top-0 hover:top-[-0.5rem] duration-500"
                  size="lg"
                >
                  开始学习
                  <ArrowRight theme="outline" size="24" fill="var(--primary)" />
                </Button>
              </a>
              <a href="#nce">
                <Button
                  className="text-white ml-6 bg-blue-700 hover:bg-blue-400 duration-700 ease-in-out "
                  size="lg"
                  variant="secondary"
                >
                  新概念英语
                  <BookOne theme="outline" size="24" fill="#fff" />
                </Button>
              </a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:mr-8 ml-0 md:ml-8 rounded-xl md:rounded-2xl overflow-hidden rotate-0 md:rotate-2 hover:rotate-0 duration-700 ease-in-out">
            <Image
              className="max-w-fill"
              width={480}
              height={270}
              src="/static/home.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      <div className="res-box">
        <Progress />
        <Study className="mt-12" />
        <NCE className="mt-12" />
        <Notes className="my-12" />
      </div>
    </>
  );
}
