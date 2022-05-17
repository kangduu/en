module.exports = {
  base: "/en/",
  title: "New Concepts English",
  description: "Learn New Concepts English Volume 1 to 4",

  dest: "dist",

  themeConfig: {
    logo: "/assets/logo.png",
    navbar: false,
    sidebar: [
      {
        title: "New Concepts English Volume 1", // 必要的
        path: "/volume-1/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/"],
      },
    ],
  },
};
