const path = require("path");
const fs = require("fs");

function getFile(folderPath) {
  var dirs = [];
  const pathName = path.join(__dirname, folderPath);
  fs.readdir(pathName, function (err, files) {
    (function iterator(i) {
      if (i == files.length) {
        return;
      }
      fs.stat(path.join(pathName, files[i]), function (err, data) {
        if (data.isFile()) {
          dirs.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });
  return dirs;
}

module.exports = {
  base: "/en/",
  title: "New Concept English",
  description: "Learn New Concept English Volume 1 to 4",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  dest: "dist",

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "First Things First", link: "/one/1" },
      { text: "Practice and Progress", link: "/two/1" },
      { text: "Developing Skills", link: "/three/1" },
      { text: "Fluency in English", link: "/four/1" },
    ],
    sidebar: {
      "/one/": getFile("../one"),
      "/two/": getFile("../two"),
      "/three/": getFile("../three"),
      "/four/": getFile("../four"),
    },
  },
};
