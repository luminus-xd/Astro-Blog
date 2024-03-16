import { defineDb, defineTable, column } from 'astro:db';

const Like = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    articleId: column.text(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Like }
});
