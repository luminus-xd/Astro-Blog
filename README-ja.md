# Luminus Astro Blog

![Luminus Astro Blog](/public/images/top-ogp.png)

[English version here](./README.md)

Luminus Astro Blogはブログサイトです。このプロジェクトをローカルにクローンした後、以下のコマンドを使用して依存関係をインストールしてください。

## 設定

### NPMパッケージのインストール

| パッケージマネージャー | コマンド        |
| --------------- | -------------- |
| npm             | `npm install`  |
| yarn            | `yarn install` |
| pnpm            | `pnpm install` |
| bun             | `bun install`  |

### .envファイルの追加

ビルドに必要な.envファイルを作成してください。  
このファイルがないと、ビルドとローカル環境の両方が正常に機能しません。

```env
MICROCMS_SERVICE_DOMAIN="{ microCMS domain }"
MICROCMS_API_KEY="{ microCMS API KEY }"
BUN_VERSION="{ Bun version }"
BASE_URL="{　Page URL　}"
```

## スクリプト

| スクリプト (例) | 説明                                |
| ---------------- | ------------------------------------ |
| npm run dev      | ローカル開発サーバーを起動します。 |
| npm run build    | 本番用にプロジェクトをビルドします。   |
| npm run preview  | ビルドされたプロジェクトをプレビューします。          |

## ドキュメント

より詳細なドキュメントについては、[docsディレクトリ](./docs/README.md)を参照してください。
