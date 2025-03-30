#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";
import { fileURLToPath } from "node:url";
import defaultConfig from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * OGP画像を生成する
 * @param {object} options - オプション
 * @param {string} options.title - 記事タイトル
 * @param {string} options.authorName - 著者名
 * @param {string} options.authorIconPath - 著者アイコンのパス
 * @param {string} options.fontPath - フォントファイルのパス
 * @param {string} options.outputPath - 出力先のパス
 * @param {object} options.config - カスタム設定（デフォルト設定を上書き）
 */
async function generateOgpImage({
	title,
	authorName,
	authorIconPath,
	fontPath,
	outputPath,
	config = {},
}) {
	// デフォルト設定とカスタム設定をマージ
	const mergedConfig = { ...defaultConfig, ...config };

	// 各値の設定
	authorName = authorName || mergedConfig.defaultAuthor.name;
	authorIconPath =
		authorIconPath || path.join(__dirname, mergedConfig.defaultAuthor.iconPath);
	fontPath = fontPath || path.join(__dirname, mergedConfig.font.path);
	outputPath = outputPath || mergedConfig.output.defaultPath;

	try {
		// 著者アイコンをBase64に変換
		let authorIconBase64 = "";
		if (authorIconPath && fs.existsSync(authorIconPath)) {
			const authorIconBuffer = fs.readFileSync(authorIconPath);
			authorIconBase64 = `data:image/png;base64,${authorIconBuffer.toString("base64")}`;
		}

		// フォントファイルの読み込み
		let fontData = null;
		if (fontPath && fs.existsSync(fontPath)) {
			fontData = fs.readFileSync(fontPath);
		}

		// タイトルの文字数制限
		const MAX_TITLE_LENGTH = mergedConfig.title.maxLength;
		let displayTitle = title;
		if (title.length > MAX_TITLE_LENGTH) {
			displayTitle = `${title.substring(0, MAX_TITLE_LENGTH)}...`;
		}

		const html = {
			type: "div",
			props: {
				style: {
					height: "100%",
					width: "100%",
					display: "flex",
					backgroundColor: mergedConfig.background.color,
					backgroundImage: mergedConfig.background.gradient,
					color: mergedConfig.font.color,
					justifyContent: "center",
					alignItems: "center",
					padding: "0 2rem",
					fontFamily: fontData
						? 'CustomFont, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
						: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
					textShadow: mergedConfig.font.textShadow,
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								padding: `${mergedConfig.container.padding.top} ${mergedConfig.container.padding.right} ${mergedConfig.container.padding.bottom} ${mergedConfig.container.padding.left}`,
								backgroundColor: mergedConfig.container.backgroundColor,
								justifyContent: "space-between",
								borderRadius: mergedConfig.container.borderRadius,
								width: "100%",
								height: "90%",
								position: "relative",
								boxShadow: mergedConfig.container.boxShadow,
							},
							children: [
								// タイトル部分
								{
									type: "p",
									props: {
										style: {
											fontSize: mergedConfig.title.fontSize,
											fontWeight: mergedConfig.title.fontWeight,
											lineHeight: mergedConfig.title.lineHeight,
											letterSpacing: mergedConfig.title.letterSpacing,
											margin: "0 0 2rem 0",
										},
										children: displayTitle,
									},
								},
								// 著者情報部分
								{
									type: "div",
									props: {
										style: {
											display: "flex",
											alignItems: "center",
											position: "absolute",
											bottom: mergedConfig.author.position.bottom,
											left: mergedConfig.author.position.left,
										},
										children: [
											authorIconBase64
												? {
														type: "div",
														props: {
															style: {
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																borderRadius: "50%",
																overflow: "hidden",
																width: `${mergedConfig.author.icon.size}px`,
																height: `${mergedConfig.author.icon.size}px`,
																marginRight: "1.24em",
																border: `${mergedConfig.author.icon.borderWidth} solid ${mergedConfig.author.icon.borderColor}`,
															},
															children: [
																{
																	type: "img",
																	props: {
																		src: authorIconBase64,
																		width: mergedConfig.author.icon.size,
																		height: mergedConfig.author.icon.size,
																		alt: `${authorName}のアイコン`,
																		style: {
																			width: "100%",
																			height: "100%",
																			objectFit: "cover",
																		},
																	},
																},
															],
														},
													}
												: null,
											{
												type: "div",
												props: {
													style: {
														display: "flex",
														flexDirection: "column",
													},
													children: [
														{
															type: "div",
															props: {
																style: {
																	fontSize: mergedConfig.author.fontSize,
																	fontWeight: mergedConfig.author.fontWeight,
																	color: mergedConfig.author.color,
																},
																children: authorName,
															},
														},
													],
												},
											},
										].filter(Boolean),
									},
								},
							],
						},
					},
				],
			},
		};

		// OGP画像生成のオプション
		const options = {
			width: mergedConfig.size.width,
			height: mergedConfig.size.height,
		};

		// フォントデータが存在する場合はfontsオプションを追加
		if (fontData) {
			options.fonts = [
				{
					name: "CustomFont",
					data: fontData,
					weight: 400,
					style: "normal",
				},
				{
					name: "CustomFont",
					data: fontData,
					weight: 700,
					style: "normal",
				},
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
		console.log(`✅ OGP画像が生成されました: ${outputPath}`);
	} catch (error) {
		console.error("❌ OGP画像の生成に失敗しました:", error);
	}
}

// コマンドライン引数を解析
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i++) {
	const arg = args[i];
	if (arg.startsWith("--")) {
		const key = arg.slice(2);
		const value = args[i + 1];
		if (value && !value.startsWith("--")) {
			params[key] = value;
			i++;
		} else {
			params[key] = true;
		}
	}
}

if (!params.title) {
	console.error('❌ エラー: タイトルを指定してください (--title "タイトル")');
	process.exit(1);
}

// OGP画像を生成
generateOgpImage(params);
