# text-diff · 線上文字差異比對

[简体中文](./README.md) · [English](./README.en.md) · **繁體中文** · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

仿 Beyond Compare 的**純前端**文字差異比對工具。所有運算都在瀏覽器本機完成，**文字不會上傳到任何伺服器**——貼上設定檔、日誌、合約這類敏感內容也不必擔心。

![text-diff 預覽](./public/og.png)

## 線上使用

<https://diff.shigc.top/>

免安裝、免登入，開啟即可使用。

## 功能

- **兩種檢視**：並排（split）/ 統一單欄（unified），行內字元級差異醒目提示
- **差異導覽**：上一個 / 下一個差異快速跳轉，即時統計新增 / 刪除 / 修改行數
- **比對選項**：忽略空白字元、忽略大小寫、空白符號可視化
- **彈性輸入**：貼上、選擇檔案、拖曳檔案到編輯區
- **一鍵匯出**：HTML 差異報告 / PDF / CSV
- **多語介面**：簡中 / 繁中 / 英 / 日 / 韓 / 西 / 法 / 德 / 俄 / 葡，即時切換並記住選擇
- **極輕依賴**：執行時僅依賴 [jsdiff](https://github.com/kpdecker/jsdiff)，建置產物為純靜態檔案

## 本機開發

需要 Node.js 18 以上版本。

```bash
npm install
npm run dev        # 開發伺服器，預設 http://localhost:5173
```

常用指令：

```bash
npm run build            # tsc 嚴格型別檢查 + 正式建置
npm run preview          # 本機預覽建置產物
npm run typecheck        # 僅型別檢查
npm run lint             # ESLint
npm run format           # Prettier 格式化
npm run build:obfuscated # 啟用 JS 混淆的建置（預設關閉）
```

正式建置預設**不做混淆**，產物可讀、方便除錯與稽核。若部署時要混淆，可設定 `OBFUSCATE=1` 或執行 `npm run build:obfuscated`。

## 部署到 Cloudflare Pages

### 方式一：Git 整合（建議）

在 Cloudflare Pages 連接本儲存庫，建置設定如下：

| 設定項目         | 值              |
| ---------------- | --------------- |
| Framework        | 無（None）      |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

之後每次推送到 `main` 就會自動部署。`public/_headers` 會自動生效，為網站加上 CSP 等安全回應標頭。

### 方式二：命令列部署

```bash
npx wrangler login   # 瀏覽器授權，或改用 API Token
npm run deploy       # 建置 + 部署
```

使用 API Token 時，將 `.env.example` 複製為 `.env` 並填入：

```dotenv
CLOUDFLARE_API_TOKEN=你的API權杖
CLOUDFLARE_ACCOUNT_ID=你的帳戶ID
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` 會讀取 `.env` 中的 `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH`，因此 fork 後只要改成自己的專案名稱即可。`.env` 已被 `.gitignore` 排除，不會進入版本庫。

## 專案結構

```text
.
├─ index.html            單頁骨架（含 SEO / OG 中繼資訊）
├─ public/               robots.txt、sitemap.xml、_headers、社群預覽圖
├─ scripts/              建置與部署腳本（跨平台）
├─ src/
│  ├─ main.ts            進入點：串接狀態、渲染與互動
│  ├─ state.ts           全域狀態
│  ├─ styles.css         所有樣式
│  ├─ diff/              差異計算與型別（jsdiff 封裝）
│  ├─ export/            HTML / PDF / CSV 匯出
│  ├─ i18n/              多語框架與 10 種語言文案
│  └─ ui/                輸入、渲染、導覽、語言切換
└─ .github/              CI、Dependabot、issue / PR 範本
```

## 隱私說明

- 所有文字處理都在目前瀏覽器分頁內完成，不存在上傳介面
- 無分析、埋點、廣告、錯誤回報腳本，頁面不請求任何第三方資源
- `localStorage` 只儲存介面語言偏好
- 匯出檔案由瀏覽器本機產生，僅在你點擊下載時落地

## 瀏覽器支援

支援現代瀏覽器（Chrome / Edge / Firefox / Safari 最近兩個大版本）。建置目標為 ES2020，不支援 IE。

## 參與貢獻

歡迎 issue 與 PR，請先閱讀 [CONTRIBUTING.md](./CONTRIBUTING.md) 與 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)。安全性問題請依 [SECURITY.md](./SECURITY.md) 私下回報。

## 致謝

差異演算法來自 [jsdiff](https://github.com/kpdecker/jsdiff)（MIT）；互動與視覺參考 [Beyond Compare](https://www.scootersoftware.com/)。

## License

[MIT](./LICENSE) © shigc
