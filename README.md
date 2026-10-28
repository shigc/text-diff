# text-diff · 在线文本差异对比

**简体中文** · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

仿 Beyond Compare 的**纯前端**文本差异对比工具。所有计算在浏览器本地完成，**文本不会上传到任何服务器**——粘贴配置、日志、合同这类敏感内容也放心。

> A fully client-side text diff tool inspired by Beyond Compare. Everything runs in your browser — no backend, no upload, no tracking.

![text-diff 预览](./public/og.png)

## 在线使用

<https://diff.shigc.top/>

无需安装、无需登录，打开即用。

## 特性

- **两种视图**：并排（split）/ 统一单栏（unified），行内字符级差异高亮
- **差异导航**：上一个 / 下一个差异快速跳转，实时统计新增 / 删除 / 修改行数
- **对比选项**：忽略空白字符、忽略大小写、空白符号可视化
- **灵活输入**：粘贴、选择文件、拖拽文件到编辑区
- **一键导出**：HTML 差异报告 / PDF / CSV
- **多语言界面**：简中 / 繁中 / 英 / 日 / 韩 / 西 / 法 / 德 / 俄 / 葡，即时切换并记住选择
- **极轻依赖**：运行时仅依赖 [jsdiff](https://github.com/kpdecker/jsdiff)，构建产物为纯静态文件

## 本地开发

要求 Node.js 20.19+ 或 22.12+（与 Vite 8 的要求一致）。

```bash
npm install
npm run dev        # 开发服务器，默认 http://localhost:5173
```

常用命令：

```bash
npm run build            # tsc 严格类型检查 + 生产构建
npm run preview          # 本地预览构建产物
npm run typecheck        # 仅类型检查
npm run lint             # ESLint
npm run format           # Prettier 格式化
npm run build:obfuscated # 开启 JS 混淆的构建（默认关闭）
```

生产构建默认**不做混淆**，产物可读、便于调试与审计。若你希望部署时混淆，可设置 `OBFUSCATE=1` 或运行 `npm run build:obfuscated`。

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐）

在 Cloudflare Pages 中连接本仓库，构建配置：

| 配置项           | 值              |
| ---------------- | --------------- |
| Framework        | 无（None）      |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

之后每次推送 `main` 自动部署。`public/_headers` 会自动生效，为站点加上 CSP 等安全响应头。

### 方式二：命令行部署

```bash
npx wrangler login   # 浏览器授权，或改用 API Token
npm run deploy       # 构建 + 部署
```

使用 API Token 时，复制 `.env.example` 为 `.env` 并填写：

```dotenv
CLOUDFLARE_API_TOKEN=你的API令牌
CLOUDFLARE_ACCOUNT_ID=你的账户ID
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` 会读取 `.env` 中的 `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH`，因此 fork 后改成自己的项目名即可。`.env` 已被 `.gitignore` 排除，不会进入版本库。

## 项目结构

```text
.
├─ index.html            单页骨架（含 SEO / OG 元信息）
├─ public/               robots.txt、sitemap.xml、_headers、社交预览图
├─ scripts/              构建与部署脚本（跨平台）
├─ src/
│  ├─ main.ts            入口：串联状态、渲染与交互
│  ├─ state.ts           全局状态
│  ├─ styles.css         全部样式
│  ├─ diff/              差异计算与类型（jsdiff 封装）
│  ├─ export/            HTML / PDF / CSV 导出
│  ├─ i18n/              多语言框架与 10 种语言文案
│  └─ ui/                输入、渲染、导航、语言切换
└─ .github/              CI、Dependabot、issue / PR 模板
```

## 隐私说明

- 所有文本处理都发生在当前浏览器标签页内，不存在上传接口
- 无分析、埋点、广告、错误上报脚本，页面不请求任何第三方资源
- `localStorage` 只保存界面语言偏好
- 导出文件由浏览器本地生成，仅在你自己点击下载时落地

## 浏览器支持

面向现代浏览器（Chrome / Edge / Firefox / Safari 最近两个大版本）。构建目标为 ES2020，不支持 IE。

## 参与贡献

欢迎 issue 与 PR，请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 与 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)。安全问题请按 [SECURITY.md](./SECURITY.md) 私下报告。

## 致谢

差异算法来自 [jsdiff](https://github.com/kpdecker/jsdiff)（MIT）；交互与视觉参考 [Beyond Compare](https://www.scootersoftware.com/)。

## License

[MIT](./LICENSE) © shigc
