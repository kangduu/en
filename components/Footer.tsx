import React from "react";
import Container from "@/components/kit/Container";
import Slogan from "@/components/slogan";
import {
  Bookshelf,
  Copyright,
  FacebookOne,
  Github,
  Gitlab,
  Local,
  SendEmail,
  Twitter,
} from "@icon-park/react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-800 text-white px-6 md:px-0">
      <Container className="md:flex gap-12 justify-between py-12">
        <div>
          <div className="flex items-center">
            <span className="bg-white rounded-[4px] leading-none p-2 mr-2">
              <Bookshelf theme="outline" size="24" fill="var(--primary)" />
            </span>
            <Slogan />
          </div>

          <div className="my-4">
            全面的英语学习平台，助你高效学习英语，提升语言能力
          </div>

          <div className="flex space-x-4">
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              href="https://github.com/kangduu/en"
              target="_blank"
            >
              <Github theme="outline" size="18" fill="#fff" />
            </a>
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              href="#"
            >
              <Twitter theme="outline" size="18" fill="#fff" />
            </a>
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              href="#"
            >
              <FacebookOne theme="outline" size="18" fill="#fff" />
            </a>
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              href="#"
            >
              <Gitlab theme="outline" size="18" fill="#fff" />
            </a>
          </div>
        </div>
        {/* study content */}
        <div className="leading-4 mt-8 md:mt-0">
          <h2 className="mb-6">学习内容</h2>
          <ul className="space-y-3 space-x-9 md:space-x-3 flex flex-wrap">
            <li>
              <a href="#">单词学习</a>
            </li>
            <li>
              <a href="#">短语表达</a>
            </li>
            <li>
              <a href="#">语法知识</a>
            </li>
            <li>
              <a href="#">阅读文章</a>
            </li>
            <li>
              <a href="#">听力练习</a>
            </li>
            <li>
              <a href="#">NCE课本</a>
            </li>
          </ul>
        </div>
        {/* connect us */}
        <div className="leading-4 mt-8 md:mt-0">
          <h2 className="mb-6">联系方式</h2>
          <ul className="space-y-4">
            <li className="flex gap-4 items-center">
              <Local theme="outline" />
              中国 成都
            </li>
            <li className="flex gap-4 items-center">
              <SendEmail theme="outline" />
              dukang1127@163.com
            </li>
          </ul>
        </div>
      </Container>

      <div className="flex items-center gap-1 py-4 mx-auto w-fit text-white">
        <Copyright />
        {year} EnglishHub.
        <a
          href="https://github.com/kangduu"
          target="_blank"
          className="underline text-primary"
        >
          kangduu
        </a>
        保留所有权利
      </div>
    </footer>
  );
}
