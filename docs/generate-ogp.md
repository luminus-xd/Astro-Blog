# OGP画像生成ツール

このツールは@vercel/ogを使用して、記事タイトルと著者情報を含むOGP画像を生成します。

## 必要条件

- Node.js v18以上
- 以下のnpmパッケージ:
  - @vercel/og
  - sharp

## 使用方法

### 基本的な使用法

```bash
# npmスクリプトを使用
npm run generate-ogp -- --title "記事タイトル" --authorName "著者名"

# bunを使用
bun run generate-ogp --title "記事タイトル" --authorName "著者名"

# 直接実行
node tools/generate-ogp/index.js --title "記事タイトル" --authorName "著者名"
```

### オプション

オプションの値は、このプロジェクトで利用しているフォントファイルと著者アイコンのパスを指定しています。

| オプション | 説明 | デフォルト値 |
|----------|------|------------|
| `--title` | 記事タイトル（必須） | - |
| `--authorName` | 著者名 | "Luminus" |
| `--authorIconPath` | 著者アイコンのパス | "public/images/icons/icon-512x512.png" |
| `--outputPath` | 出力先のパス | "tools/output/ogp.png" |
| `--fontPath` | フォントファイルのパス | "tools/generate-ogp/fonts/mobo/MOBO-Bold.otf" |

### 使用例

```bash
# 基本的な例
npm run generate-ogp -- --title "Next v13.3からのSitemap.xml生成"

# 全オプションを指定
npm run generate-ogp -- --title "Next v13.3からのSitemap.xml生成" --authorName "Luminus" --authorIconPath "./public/images/author.jpg" --outputPath "./tools/output/article-1.png" --fontPath "./tools/generate-ogp/fonts/custom-font.ttf"
```

## OGP画像のカスタマイズ

OGP画像のデザインをカスタマイズする場合は、`tools/generate-ogp/index.js`ファイルを編集してください。
このスクリプトは@vercel/ogを使用しており、HTMLライクなオブジェクト構文でデザインを変更できます。

## 生成されたOGP画像の使用方法

生成されたOGP画像は`tools/output/ogp.png`（または指定した出力先）に保存されます。
この画像は記事のメタデータに設定して使用できます。

## Vercel OGの詳細情報

このツールはVercel OG（@vercel/og）を利用しています。Vercel OGは内部でsatoriを使用しており、ブラウザやNode.jsでOGP画像を生成できるライブラリです。
詳細は以下のリンクを参照してください。

- [Vercel OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) 