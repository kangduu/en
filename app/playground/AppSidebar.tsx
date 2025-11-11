"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "@/components/slogan";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Home */}
        <Logo
          fill="white"
          iconClassName="bg-primary"
          path="/station"
          title="Playground"
        />
      </SidebarHeader>
      <SidebarContent>菜单列表</SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
