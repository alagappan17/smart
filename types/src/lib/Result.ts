export type ModelResult = {
  id: string;
  model: string; // LLM name or identifier
  prompt: string;
  response: string;
  responseTime: number;
  created: Date;
};
