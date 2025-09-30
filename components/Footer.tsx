import React from "react";
import Logo from "@/components/slogan";
import {
  Copyright,
  FacebookOne,
  Github,
  Gitlab,
  Local,
  SendEmail,
  Twitter,
} from "@icon-park/react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="res-box md:flex gap-12 justify-between py-12">
        <div>
          <Logo fill="var(--primary)" iconClassName="bg-white" />

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
              <Link href="/#start-word">单词学习</Link>
            </li>
            <li>
              <Link href="/#start-phrase">短语表达</Link>
            </li>
            <li>
              <Link href="/#start-grammar">语法知识</Link>
            </li>
            <li>
              <Link href="/#start-article">阅读文章</Link>
            </li>
            {/* <li>
              <a href="#">听力练习</a>
            </li> */}
            <li>
              <Link href="/#nce">NCE课本</Link>
            </li>
          </ul>
        </div>
        {/* study content */}
        <div className="leading-4 mt-8 md:mt-0">
          <h2 className="mb-6">推荐学习资源</h2>
          <ul className="space-y-3 space-x-9 md:space-x-3 flex flex-wrap">
            <li>
              <a
                href="https://www.bbc.co.uk/learningenglish/"
                target="_blank"
              >
                BBC.LEARNING.ENGLISH
              </a>
            </li>
            <li>
              <a
                href="https://bec.neea.cn/html1/folder/1507/1856-1.htm"
                target="_blank"
              >
                剑桥商务英语考试
              </a>
            </li>
            <li>
              <a href="https://pets.neea.edu.cn/" target="_blank">
                全国英语等级考试
              </a>
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
      </div>

      <div className="flex items-center gap-1 py-4 mx-auto w-fit text-white whitespace-nowrap text-[0.9rem]">
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
