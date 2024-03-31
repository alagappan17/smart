export type OllamaModels = 'llama2' | 'gemma';
export const OLLAMA_MODELS = ['llama2', 'gemma'];

export type OpenAiModels = 'gpt-3.5-turbo-instruct';
export const OPENAI_MODELS = ['gpt-3.5-turbo-instruct'];

export type CohereModels = 'cohere';
export const COHERE_MODELS = ['cohere'];

export type GoogleModels = 'gemini-pro';
export const GOOGLE_MODELS = ['gemini-pro'];

export type Model = OllamaModels | OpenAiModels | CohereModels | GoogleModels;
export type Host = 'ollama' | 'openai' | 'cohere' | 'google';

export type LLMModel = { name: Model; host: Host };

export const LLM_MODELS: LLMModel[] = [
  { name: 'llama2', host: 'ollama' },
  { name: 'gemma', host: 'ollama' },
  { name: 'gpt-3.5-turbo-instruct', host: 'openai' },
  { name: 'cohere', host: 'cohere' },
  { name: 'gemini-pro', host: 'google' },
];
