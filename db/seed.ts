import { db, Favorite } from 'astro:db';

export default async function () {
	let today = await new Date();
	await db.insert(Favorite).values([
		{ articleId: "npq5cyvzr3", publishDate: today },
		{ articleId: "npq5cyvzr3", publishDate: today },
	])
}