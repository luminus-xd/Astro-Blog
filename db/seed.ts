import { db, Like } from 'astro:db';

export default async function () {
	await db.insert(Like).values([
		{ articleId: "npq5cyvzr3" },
		{ articleId: "npq5cyvzr3" },
		{ articleId: "ki_pi9fgwk1" },
	])
}