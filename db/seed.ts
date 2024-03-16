import { db, Like } from 'astro:db';

export default async function () {
	await db.insert(Like).values([
		{ id: 1, articleId: "npq5cyvzr3" },
		{ id: 2, articleId: "ki_pi9fgwk1" },
	])
}