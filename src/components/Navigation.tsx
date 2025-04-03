"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

const GitHubSvg = () => (
  <svg
    height="20"
    viewBox="0 0 24 24"
    width="20"
    aria-hidden="true"
    focusable="false"
    tabIndex={-1}
  >
    <path
      clipRule="evenodd"
      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      fill="currentColor"
      fillRule="evenodd"
    ></path>
  </svg>
);

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderMenu = (wrapper: "nav" | "menu", className?: string) => {
    const menuItems = [{ path: "/lexical", label: "Lexical" }];
    const areActive = (path: string) => path === pathname;

    const Item = wrapper === "nav" ? NavbarItem : NavbarMenuItem;

    return menuItems.map(({ path, label }) => {
      const isActive = areActive(path);

      return (
        <Item key={path} isActive={isActive}>
          <Link
            onClick={() => {
              if (isMenuOpen) setIsMenuOpen(false);
            }}
            aria-current="page"
            className={`${isActive ? "text-primary-500" : ""} ${
              className || ""
            } font-normal transition-colors select-none`}
            color="foreground"
            href={path}
          >
            {label}
          </Link>
        </Item>
      );
    });
  };

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="font-bold text-inherit" color="foreground" href="/">
            ENGLISH
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {renderMenu("nav")}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="https://github.com/kangduu/en" target="_blank">
            <GitHubSvg />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>{renderMenu("menu", "w-full")}</NavbarMenu>
    </Navbar>
  );
}
