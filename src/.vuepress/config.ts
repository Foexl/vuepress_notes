import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "学习笔记",
  description: "学习知识在线汇总",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
