export const prerender = false;

import type { APIRoute } from "astro";
import { Like, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
    const { articleId } = await request.json();

    if (!articleId) {
        return new Response(null, {
            status: 404,
            statusText: "Not found",
        });
    }

    await db.insert(Like).values({ articleId });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};