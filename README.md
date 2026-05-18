# 二里半教育 × 二里科技 官网（静态多页面）

本项目为原生 **HTML + CSS + JavaScript** 实现的多页面静态企业官网。

## 页面结构

- `index.html` 首页（品牌展示 + 三大业务入口）
- `mechanical.html` 机械设计培训
- `embedded.html` 嵌入式开发培训
- `automation.html` 自动化解决方案
- `about.html` 关于我们
- `contact.html` 联系合作

## 资源结构

- `css/style.css` 全站样式
- `js/main.js` 全站脚本（导航、内容渲染）
- `content/site.json` 全站核心文案与链接配置
- `assets/images/` 网站图片目录

## 说明

- 所有核心文案、项目名称、项目介绍、按钮文字、问卷链接统一维护在 `content/site.json`。
- 联系合作页“填写需求”按钮读取：
  - `mechanicalFormUrl`
  - `embeddedFormUrl`
  - `automationFormUrl`
- 当前问卷链接默认配置为 `#`，后续可替换为腾讯问卷链接。

## 本地预览

可直接双击 HTML 文件打开，或使用任意静态服务器（如 VSCode Live Server）预览。
