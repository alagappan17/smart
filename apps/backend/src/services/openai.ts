import { OpenAI } from '@langchain/openai';
import config from '../config';

class OpenAIService {
  private model: OpenAI;

  constructor() {
    this.model = new OpenAI({
      modelName: 'gpt-3.5-turbo-instruct', // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
      temperature: 0.9,
      openAIApiKey: config.llm.openAiApiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const res = await this.model.invoke(prompt);
    return res[0][1];
  }
}
export const openAiService = new OpenAIService();
