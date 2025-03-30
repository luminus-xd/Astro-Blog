/**
 * OGP画像生成のデフォルト設定
 */
export default {
	// 画像サイズ設定
	size: {
		width: 1200,
		height: 630,
	},

	// タイトル設定
	title: {
		maxLength: 80,
		fontSize: 56,
		fontWeight: 700,
		lineHeight: 1.3,
		letterSpacing: "-0.02em",
	},

	// 背景設定
	background: {
		color: "#4158D0",
		gradient: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
	},

	// 内部コンテナ設定
	container: {
		backgroundColor: "rgba(24, 27, 41, 1)",
		borderRadius: "20px",
		boxShadow: "0 8px 29px rgba(0, 8, 38, 0.2)",
		padding: {
			top: "3rem",
			right: "4rem",
			bottom: "2.5rem",
			left: "4rem",
		},
	},

	// 著者情報設定
	author: {
		fontSize: "28px",
		fontWeight: "bold",
		color: "#ffffff",
		icon: {
			size: 68,
			borderColor: "rgba(255, 255, 255, 0.2)",
			borderWidth: "1px",
		},
		position: {
			bottom: "2.6rem",
			left: "4rem",
		},
	},

	// デフォルトの著者情報
	defaultAuthor: {
		name: "Luminus",
		iconPath: "../../public/images/icons/icon-512x512.png",
	},

	// フォント設定
	font: {
		path: "./fonts/mobo/MOBO-Bold.otf",
		color: "#f3f3f3",
		textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
	},

	// 出力設定
	output: {
		defaultPath: "tools/generate-ogp/output/ogp.png",
	},
};
