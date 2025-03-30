#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from '@vercel/og';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * OGP画像を生成する
 * @param {object} options - オプション
 * @param {string} options.title - 記事タイトル
 * @param {string} options.authorName - 著者名
 * @param {string} options.authorIconPath - 著者アイコンのパス
 * @param {string} options.fontPath - フォントファイルのパス
 * @param {string} options.outputPath - 出力先のパス
 */
async function generateOgpImage({
  title,
  authorName,
  authorIconPath,
  fontPath,
  outputPath = 'tools/output/ogp.png'
}) {
  try {
    // 著者アイコンをBase64に変換
    let authorIconBase64 = '';
    if (authorIconPath && fs.existsSync(authorIconPath)) {
      const authorIconBuffer = fs.readFileSync(authorIconPath);
      authorIconBase64 = `data:image/png;base64,${authorIconBuffer.toString('base64')}`;
    }

    // フォントファイルの読み込み
    let fontData = null;
    if (fontPath && fs.existsSync(fontPath)) {
      fontData = fs.readFileSync(fontPath);
    }

    // HTML構造を定義
    const html = {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          padding: '60px',
          fontFamily: fontData ? 'CustomFont, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' : 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: 'relative'
        },
        children: [
          // タイトル部分
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '70%'
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 'bold',
                      lineHeight: 1.36,
                      letterSpacing: '-0.02em'
                    },
                    children: title
                  }
                }
              ]
            }
          },
          // 著者情報部分
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                bottom: '60px',
                left: '60px'
              },
              children: [
                authorIconBase64 ? {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      width: '60px',
                      height: '60px',
                      marginRight: '16px'
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: authorIconBase64,
                          width: 60,
                          height: 60,
                          alt: `${authorName}のアイコン`,
                          style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }
                        }
                      }
                    ]
                  }
                } : null,
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column'
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '24px',
                            fontWeight: 'bold'
                          },
                          children: authorName
                        }
                      }
                    ]
                  }
                }
              ].filter(Boolean)
            }
          }
        ]
      }
    };

    // OGP画像生成のオプション
    const options = {
      width: 1200,
      height: 630,
    };

    // フォントデータが存在する場合はfontsオプションを追加
    if (fontData) {
      options.fonts = [
        {
          name: 'CustomFont',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'CustomFont',
          data: fontData,
          weight: 700,
          style: 'normal',
        }
      ];
    }

    // OGP画像を生成（@vercel/ogのImageResponseを使用）
    const imageResponse = new ImageResponse(html, options);

    // ArrayBufferに変換
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 出力ディレクトリが存在しない場合は作成
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // ファイルに保存
    fs.writeFileSync(outputPath, buffer);
    console.log(`OGP画像が生成されました: ${outputPath}`);
  } catch (error) {
    console.error('OGP画像の生成に失敗しました:', error);
  }
}

// コマンドライン引数を解析
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = args[i + 1];
    if (value && !value.startsWith('--')) {
      params[key] = value;
      i++;
    } else {
      params[key] = true;
    }
  }
}

if (!params.title) {
  console.error('エラー: タイトルを指定してください (--title "タイトル")');
  process.exit(1);
}

// デフォルト値の設定
params.authorName = params.authorName || 'Luminus';
params.authorIconPath = params.authorIconPath || path.join(__dirname, '../../public/images/icons/icon-512x512.png');
params.outputPath = params.outputPath || 'tools/generate-ogp/output/ogp.png';
// フォントパスのデフォルト値を設定（例：fonts/customfont.ttf）
// フォントファイルが存在しない場合は指定しない
params.fontPath = params.fontPath || path.join(__dirname, './fonts/mobo/MOBO-Bold.otf');
if (!fs.existsSync(params.fontPath)) {
  params.fontPath = null;
}

// OGP画像を生成
generateOgpImage(params); 