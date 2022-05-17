module.exports = {
  base: "/en/",
  title: "New Concepts English",
  description: "Learn New Concepts English Volume 1 to 4",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  dest: "dist",

  themeConfig: {
    logo: "/logo.png",
    navbar: false,
    sidebar: [
      {
        title: "The Volume One", // 必要的
        path: "/one/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
      },
    ],
  },
};
