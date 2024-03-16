import { defineDb, defineTable, column } from 'astro:db';

const Favorite = defineTable({
  columns: {
    articleId: column.text(),
    publishDate: column.date(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Favorite }
});
