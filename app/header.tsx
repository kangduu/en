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
import DarkModel from "./dark";
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
import { Github, HamburgerButton } from "@icon-park/react";

export default function Navigation() {
  return (
    <header className="w-full h-fit py-4 md:py-2 border-b-1 sticky top-0 bg-[var(--background)] z-50">
      <div className="max-w-[1024px] px-4 mx-auto flex items-center justify-between">
        {/* 移动导航 (隐藏于桌面端) */}
        <div className="md:hidden flex items-center mr-2">
          <NativeNavMenu />
        </div>

        {/* Home */}
        <Link className="mr-auto font-bold leading-none" href="/">
          ENGLISH
        </Link>

        {/* 桌面导航 (隐藏于移动端) */}
        <div className="hidden md:block">
          <NavMenu />
        </div>

        {/* dark mode */}
        <span className="ml-auto mr-3 cursor-pointer">
          <DarkModel />
        </span>

        {/* github library */}
        <Link href="https://github.com/kangduu/en" target="_blank">
          <Github />
        </Link>
      </div>
    </header>
  );
}

// mobile menu
function NativeNavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <HamburgerButton onClick={() => setOpen(true)} />
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
