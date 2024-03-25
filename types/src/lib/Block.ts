export type PromptBlock = {
  id: string;
  title: string;
  slug: string;
  type: 'safety' | 'query' | 'data';
  content: string;
};
