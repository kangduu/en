"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import DarkModel from "./DarkModel";
import { HeaderLinks } from "@/lib/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bookshelf, HamburgerButton } from "@icon-park/react";
import Slogan from "@/components/slogan";
import { SearchKit } from "./search";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <header className="w-full h-fit py-4 md:py-4 border-b-1 sticky top-0 bg-[var(--background)] z-50">
      <div className="res-box flex items-center justify-between">
        {/* 移动导航 (隐藏于桌面端) */}
        <div className="md:hidden flex items-center mr-2">
          <NativeNavMenu />
        </div>

        {/* Home */}
        <span className="hidden md:block bg-primary rounded-[4px] leading-none p-2 mr-2">
          <Bookshelf theme="outline" size="24" fill="#fff" />
        </span>
        <Slogan className="mr-auto" />

        {/* 桌面导航 (隐藏于移动端) */}
        <div className="hidden md:block">
          <NavMenu />
        </div>

        <SearchKit buttonProps={{ className: "ml-auto" }} />

        {/* dark mode */}
        <DarkModel className="mx-2 cursor-pointer" variant="outline" />
      </div>
    </header>
  );
}

// mobile menu
// todo refactor
function NativeNavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button variant="ghost" className="ml-2 p-1">
          <HamburgerButton onClick={() => setOpen(true)} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 pt-0 min-h-[74vh]">
        <DrawerHeader>
          <DrawerTitle className="text-center">ENGLISH</DrawerTitle>
        </DrawerHeader>
        {HeaderLinks.map(({ id, title, url, children }) => {
          return (
            <div key={id}>
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
      </DrawerContent>
    </Drawer>
  );
}

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
