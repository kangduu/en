// import { readFileSync, writeFileSync } from "node:fs";
// import { join, dirname } from "node:path";
// import { fileURLToPath } from "node:url";

// // 获取当前目录（替代 __dirname）
// const __dirname = dirname(fileURLToPath(import.meta.url));

// // 正确拼接 JSON 文件路径
// const data = readFileSync(join(__dirname, "../../books/one.json"), "utf8");
// const json = JSON.parse(data);
// json.forEach(({ name }, i) => {
//   // 第几册 - 第几课
//   const filename = `1-${`${i + 1}`.padStart(2, "0")}.md`;

//   const filePath = join(__dirname, filename);
//   const content = `---
// title: ${name}
// date: ${new Date().toISOString()}
// tags:
//   - First-Things-First
// categories:
//   - 新概念
// description: 记得填写描述内容哦~~~
// ---`;
//   writeFileSync(filePath, content, "utf8");
// });

