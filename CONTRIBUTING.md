# 贡献指南

感谢关注 text-diff！这是一个纯前端工具，**没有后端、没有账号体系、不收集任何用户数据**。所有改动都应保持这个前提。

## 开发环境

- Node.js 20.19+ 或 22.12+（Vite 8 的要求）
- npm

```bash
npm install
npm run dev
```

## 常用命令

| 命令                       | 说明                               |
| -------------------------- | ---------------------------------- |
| `npm run dev`              | 启动开发服务器                     |
| `npm run build`            | `tsc --noEmit` 类型检查 + 生产构建 |
| `npm run preview`          | 本地预览构建产物                   |
| `npm run typecheck`        | 仅类型检查                         |
| `npm run lint`             | ESLint 检查                        |
| `npm run format`           | Prettier 格式化全部文件            |
| `npm run format:check`     | 校验格式（CI 使用）                |
| `npm run build:obfuscated` | 开启 JS 混淆的生产构建（默认关闭） |

提交前请至少保证 `npm run lint`、`npm run format:check`、`npm run build` 全部通过。

## 目录结构

```text
src/
  main.ts            入口，串联状态、渲染与交互
  state.ts           全局状态
  styles.css         全部样式
  diff/              差异计算（jsdiff 封装、类型）
  export/            HTML / PDF / CSV 导出
  i18n/              多语言框架与各语言文案
  ui/                输入、渲染、导航、语言切换
public/              静态资源（robots、sitemap、_headers、社交图）
scripts/             构建与部署脚本
```

## 新增界面文案

1. 在 `src/i18n/types.ts` 的 `TranslationKey` 中加入键名；
2. 在 `src/i18n/locales/` 下的**全部**语言文件里补上对应翻译；
3. 在 HTML 中使用 `data-i18n` / `data-i18n-placeholder` / `data-i18n-title`，或在 TS 中调用 `t()`。

缺少翻译时会回落到简体中文，但请不要把回落的英文键名留在代码里。

## 提交规范

提交信息使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```text
feat: 支持忽略行尾空白
fix: 修复统一视图下行号错位
docs: 补充部署说明
chore: 升级 jsdiff
```

## 隐私要求

以下改动不会被接受：

- 引入任何分析、埋点、错误上报等第三方请求
- 把用户文本发送到服务器，或引入远程字体 / CDN 资源
- 需要账号或后端的"云同步"功能

## 提交 PR

1. Fork 并创建分支：`git checkout -b feat/your-feature`
2. 保持改动聚焦，避免混入无关格式化
3. 填写 PR 模板中的自查清单
4. 涉及界面变化时请附截图
