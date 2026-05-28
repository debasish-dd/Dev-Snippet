import { db } from "./db";

export const initDatabase = async () => {

  await db.execAsync(`
  
    CREATE TABLE IF NOT EXISTS snippets (
    
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      title TEXT NOT NULL,

      language TEXT,

      code TEXT NOT NULL,
      is_bookmarked INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP

    );

  `);

};