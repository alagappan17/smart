import { Cohere } from '@langchain/cohere';
import config from '../config';

class CohereService {
  private model: Cohere;

  constructor() {
    this.model = new Cohere({
      maxTokens: 20,
      apiKey: config.llm.cohereApiKey, // In Node.js defaults to process.env.COHERE_API_KEY
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.model.invoke(prompt);
    return response;
  }
}

export const cohereService = new CohereService();
