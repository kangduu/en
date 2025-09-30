import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

for (let i = 0; i < 13; i++) {
  const filename = `s5-${`${i + 1}`.padStart(2, "0")}.md`;

  const filePath = join(__dirname, filename);
  const content = `---
title: "BBC in a minute"
date: ${new Date().toISOString()}
tags:
  - a minute
  - session 5
  - Phrases
categories:
  - BBC
description: 记得填写描述内容哦~~~
---`;
  writeFileSync(filePath, content, "utf8");
}
