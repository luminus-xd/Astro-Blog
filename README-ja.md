# Luminus Astro Blog

![Luminus Astro Blog](/public/images/top-ogp.png)

Luminus Astro BlogはAstro.jsを使用したブログサイトです。microCMSを利用して記事を表示しています。  
ホスティング先は任意で選択できますが、このリポジトリではCloudflare Pagesを使用しています。

## 設定

このリポジトリをローカルにクローンした後、以下のコマンドを使用して依存関係をインストールします。

### インストール

| パッケージマネージャ | コマンド       |
| -------------------- | -------------- |
| npm                  | `npm install`  |
| yarn                 | `yarn install` |
| pnpm                 | `pnpm install` |
| bun                  | `bun install`  |

### .envファイルの追加

ビルドに必要な.envファイルを作成してください。  
このファイルがないとBuildやローカルが正常に動きません

```env
MICROCMS_SERVICE_DOMAIN="{ microCMSのドメイン }"
MICROCMS_API_KEY="{ microCMS APIキー }"
BUN_VERSION="{ Bunのバージョン }"
BASE_URL="{　ページURL　}"
```

### スクリプト

| スクリプト (例) | 説明                                       |
| --------------- | ------------------------------------------ |
| npm run dev     | ローカルの開発サーバーを起動します。       |
| npm run build   | プロジェクトを本番用にビルドします。       |
| npm run preview | ビルドしたプロジェクトをプレビューします。 |

## ライセンス

このプロジェクトのライセンスはMITライセンスです。
