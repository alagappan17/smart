export type PromptBlock = {
  id: string;
  type: 'safety' | 'query' | 'data';
  content: string;
};
