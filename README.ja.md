# text-diff · オンラインテキスト差分比較

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · **日本語** · [한국어](./README.ko.md) · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

Beyond Compare に着想を得た**完全クライアントサイド**のテキスト差分比較ツールです。処理はすべてブラウザ内で完結し、**テキストがサーバーへ送信されることはありません**。設定ファイルやログ、契約書などの機密性の高い内容を貼り付けても安心です。

![text-diff のプレビュー](./public/og.png)

## オンラインで使う

<https://diff.shigc.top/>

インストールもログインも不要です。

## 機能

- **2 つの表示モード**：並列（split）／統合（unified）、行内の文字単位で差分をハイライト
- **差分ナビゲーション**：前／次の差分へジャンプ、追加・削除・変更行数をリアルタイム集計
- **比較オプション**：空白文字を無視、大文字小文字を無視、空白記号の可視化
- **柔軟な入力**：貼り付け、ファイル選択、エディタへのドラッグ＆ドロップ
- **ワンクリック書き出し**：HTML レポート／PDF／CSV
- **多言語 UI**：簡体字中国語・繁体字中国語・英語・日本語・韓国語・スペイン語・フランス語・ドイツ語・ロシア語・ポルトガル語。即時切り替えと選択の記憶に対応
- **軽量な依存関係**：実行時の依存は [jsdiff](https://github.com/kpdecker/jsdiff) のみ。ビルド成果物は純粋な静的ファイルです

## ローカル開発

Node.js 20.19 以上、または 22.12 以上が必要です（Vite 8 と同じ要件）。

```bash
npm install
npm run dev        # 開発サーバー（既定: http://localhost:5173）
```

よく使うコマンド：

```bash
npm run build            # tsc による厳格な型チェック + 本番ビルド
npm run preview          # ビルド成果物をローカルでプレビュー
npm run typecheck        # 型チェックのみ
npm run lint             # ESLint
npm run format           # Prettier による整形
npm run build:obfuscated # JS 難読化を有効にしたビルド（既定は無効）
```

本番ビルドは既定で**難読化しません**。成果物が読める状態に保たれ、デバッグや監査が容易になります。配布時に難読化したい場合は `OBFUSCATE=1` を設定するか、`npm run build:obfuscated` を実行してください。

## Cloudflare Pages へのデプロイ

### 方法 1：Git 連携（推奨）

Cloudflare Pages でこのリポジトリを接続し、次のように設定します。

| 設定項目         | 値              |
| ---------------- | --------------- |
| Framework        | なし（None）    |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

以降は `main` へ push するたびに自動デプロイされます。`public/_headers` が有効になり、CSP などのセキュリティヘッダーが付与されます。

### 方法 2：コマンドライン

```bash
npx wrangler login   # ブラウザで認証、または API トークンを使用
npm run deploy       # ビルド + デプロイ
```

API トークンを使う場合は `.env.example` を `.env` にコピーして入力します。

```dotenv
CLOUDFLARE_API_TOKEN=あなたのAPIトークン
CLOUDFLARE_ACCOUNT_ID=あなたのアカウントID
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` は `.env` の `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH` を読み取るため、フォーク後はプロジェクト名を変えるだけで済みます。`.env` は `.gitignore` で除外され、コミットされません。

## プロジェクト構成

```text
.
├─ index.html            単一ページの雛形（SEO / OG メタ情報を含む）
├─ public/               robots.txt、sitemap.xml、_headers、SNS プレビュー画像
├─ scripts/              クロスプラットフォームなビルド・デプロイスクリプト
├─ src/
│  ├─ main.ts            エントリーポイント：状態・描画・操作の結線
│  ├─ state.ts           グローバル状態
│  ├─ styles.css         すべてのスタイル
│  ├─ diff/              差分計算と型（jsdiff のラッパー）
│  ├─ export/            HTML / PDF / CSV 書き出し
│  ├─ i18n/              多言語フレームワークと 10 言語の文言
│  └─ ui/                入力、描画、ナビゲーション、言語切り替え
└─ .github/              CI、Dependabot、issue / PR テンプレート
```

## プライバシー

- テキスト処理はすべて現在のブラウザタブ内で行われ、アップロード用のエンドポイントはありません
- 解析・トラッキング・広告・エラー報告のスクリプトはなく、外部リソースも読み込みません
- `localStorage` に保存するのは UI の言語設定のみです
- 書き出したファイルはブラウザ内で生成され、ダウンロードをクリックしたときだけ保存されます

## 対応ブラウザ

モダンブラウザ（Chrome / Edge / Firefox / Safari の直近 2 メジャーバージョン）を対象としています。ビルドターゲットは ES2020 で、IE はサポートしません。

## コントリビュート

issue と PR を歓迎します。まず [CONTRIBUTING.md](./CONTRIBUTING.md) と [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) をお読みください。セキュリティ上の問題は [SECURITY.md](./SECURITY.md) の手順に従って非公開で報告してください。

## 謝辞

差分アルゴリズムは [jsdiff](https://github.com/kpdecker/jsdiff)（MIT）、操作感とビジュアルは [Beyond Compare](https://www.scootersoftware.com/) を参考にしています。

## License

[MIT](./LICENSE) © shigc
