export type PromptBlock = {
  id: string;
  title: string;
  slug: string;
  type: PromptTypes;
  content: string;
};

export type PromptTypes = 'safety' | 'query' | 'data' | 'instruction';

export const PROMPT_TYPES = ['safety', 'query', 'data', 'instruction'];

export type CreatePromptBlockDTO = {
  title: string;
  slug: string;
  type: 'safety' | 'query' | 'data' | 'instruction';
  content: string;
};
