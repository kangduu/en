"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/slogan";
import { Button } from "@/components/ui/button";
import { cn, NewConceptBooks, type NewConceptBookKey } from "@/lib/utils";
import { HamburgerButton } from "@icon-park/react";

interface HeaderLink extends LinkStore {
  id: number | NewConceptBookKey;
  children?: HeaderLink[];
}

// This file contains the navigation structure for the header links
// and their respective links
export const HeaderLinks: HeaderLink[] = [
  {
    id: 1,
    title: "新概念英语",
    url: "/nce",
    children: NewConceptBooks,
  },
  { id: 6, title: "新概念课堂", url: "/nce-course" },
  { id: 2, title: "同义词", url: "/synonym" },
  { id: 3, title: "语言基础", url: "/base" },
  { id: 4, title: "我的笔记", url: "/blog" },
  { id: 5, title: "BBC in a Minute", url: "/bbc" },
];

// default menu
function NavMenu() {
  // const pathname = usePathname();
  const router = useRouter();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {HeaderLinks.map(({ id, title, url, children }) => {
          // const isActive = url === pathname;
          return (
            <NavigationMenuItem key={id}>
              {children && children.length > 0 ? (
                <>
                  <NavigationMenuTrigger
                    className="cursor-pointer"
                    onClick={() => router.push(url)}
                  >
                    {title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {children?.map(({ id, title, url }) => {
                      return (
                        <Link
                          className="block font-normal mt-1 whitespace-nowrap hover:underline"
                          key={id}
                          href={url}
                        >
                          {title}
                        </Link>
                      );
                    })}
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={url} passHref>
                  <NavigationMenuLink
                    asChild
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    <span>{title}</span>
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={cn(
        "w-full h-16 bg-[var(--background)]",
        "shadow shadow-gray-300 dark:shadow-gray-900",
        "fixed left-0 top-0 z-100"
      )}
    >
      <div className="h-full res-box py-0 flex items-center justify-between">
        {/* Home */}
        <Logo className="mr-auto" fill="white" iconClassName="bg-primary" />
        {/* 桌面导航 (隐藏于移动端) */}
        <div className="hidden md:block mr-auto">
          <NavMenu />
        </div>
        {/* 移动导航 (隐藏于桌面端) */}
        <Button
          variant="ghost"
          className="h-full w-8 p-0 md:hidden ml-auto justify-end"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <HamburgerButton />
        </Button>
      </div>
      {/* mobile menu */}
      <div
        style={{ display: open ? "block" : "none" }}
        className="md:hidden min-h-screen bg-gray-900/80"
        onClick={() => {
          setOpen(false);
        }}
      >
        <div
          className="bg-[var(--background)] border-t p-4 shadow"
          onClick={(e) => e.stopPropagation()}
        >
          {HeaderLinks.map(({ id, title, url, children }) => {
            return (
              <div key={id} className="py-1">
                <Link
                  className="mt-2 font-bold"
                  href={url}
                  onClick={() => setOpen(false)}
                >
                  {title}
                </Link>
                {children && (
                  <>
                    {children?.map(({ id, title, url }) => {
                      return (
                        <Link
                          className="block font-normal mt-1 pl-4"
                          key={id}
                          href={url}
                          onClick={() => setOpen(false)}
                        >
                          {title}
                        </Link>
                      );
                    })}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
