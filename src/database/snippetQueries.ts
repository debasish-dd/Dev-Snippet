import { db } from "./db";

import { Snippet } from "../types/snippet";

export const createSnippet = async (
  title: string,
  language: string,
  code: string,
) => {
  await db.runAsync(
    `
    INSERT INTO snippets
    (title, language, code)
    VALUES (?, ?, ?)
    `,

    [title, language, code],
  );
};

export const getAllSnippets = async (): Promise<Snippet[]> => {
  const result = await db.getAllAsync<Snippet>(
    `
      SELECT *
      FROM snippets
      ORDER BY created_at DESC
      `,
  );

  return result;
};

export const updateSnippet = async (
  id: number,
  title: string,
  language: string,
  code: string,
) => {
  try {
    const result = await db.runAsync(
      `
        UPDATE snippets
        SET 
          title = ?,
          language = ?,
          code = ?
        WHERE id = ?
      `,
      [title, language, code, id],
    );

    return result;
  } catch (error) {
    console.error("Failed to update snippet:", error);
    throw error;
  }
};

export const deleteSnippet = async (id: number) => {
  await db.runAsync(
    `
    DELETE FROM snippets
    WHERE id = ?
    `,

    [id],
  );
};

export const toggleBookmark =
async (
  id: number,
  currentValue: number
) => {

  await db.runAsync(

    `
    UPDATE snippets
    SET is_bookmarked = ?
    WHERE id = ?
    `,

    [
      currentValue ? 0 : 1,
      id
    ]

  );
  
};

export const getBookmarkedSnippets =
async (): Promise<Snippet[]> => {

  const result =
    await db.getAllAsync<Snippet>(

      `
      SELECT *
      FROM snippets
      WHERE is_bookmarked = 1
      ORDER BY created_at DESC
      `

    );

  return result;

};