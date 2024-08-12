---
home: true
icon: home
heroImage: /img/me.jpeg
heroText: VuePress Theme Hope
tagline: 一个具有强大功能的 vuepress 主题✨

copyright: false
---

## 🛠 安装

在当前目录下的 `[dir]` 文件夹内创建 vuepress-theme-hope 项目:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest [dir]
```

:::

要将 vuepress-theme-hope 作为文档构建器添加到现有项目中，请在项目根目录中运行以下命令:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest add [dir]
```

:::

## 🚀 使用

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // 站点选项
  // ...

  theme: hopeTheme({
    // 主题选项
    // ...
  }),
});
```

@tab JS

```js title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // 站点选项
  // ...

  theme: hopeTheme({
    // 主题选项
    // ...
  }),
};
```
