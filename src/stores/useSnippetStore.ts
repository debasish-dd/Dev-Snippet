import { create } from "zustand";

import { Snippet }
  from "../types/snippet";

import {

  createSnippet,

  getAllSnippets,

  deleteSnippet,

  updateSnippet

} from "../database/snippetQueries";



interface SnippetStore {

  snippets: Snippet[];

  loadSnippets: () => Promise<void>;

  addSnippet: (

    title: string,

    language: string,

    code: string

  ) => Promise<void>;

  removeSnippet: (
    id: number
  ) => Promise<void>;

  editSnippet: (
    id: number,
    title: string,
    language: string,
    code: string
  ) => Promise<void>;
}



export const useSnippetStore =
  create<SnippetStore>((set) => ({
    snippets: [],

    loadSnippets: async () => {

      const snippets =
        await getAllSnippets();

      set({ snippets });

    },

    addSnippet: async (

      title,

      language,

      code

    ) => {

      await createSnippet(
        title,
        language,
        code
      );

      const snippets =
        await getAllSnippets();

      set({ snippets });

    },

    removeSnippet: async (
      id
    ) => {

      await deleteSnippet(id);

      const snippets =
        await getAllSnippets();

      set({ snippets });

    },

    editSnippet: async (
      id,
      title,
      language,
      code
    ) => {

      await updateSnippet(
        id,
        title,
        language,
        code
      );

      const snippets =
        await getAllSnippets();

      set({ snippets });

    },

  }));