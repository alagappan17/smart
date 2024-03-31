import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import config from '../config';

class GoogleService {
  private model: ChatGoogleGenerativeAI;

  constructor() {
    this.model = new ChatGoogleGenerativeAI({
      apiKey: config.llm.googleApiKey,
      modelName: 'gemini-pro',
      maxOutputTokens: 2048,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.model.invoke([['human', prompt]]);
    return response.content as string;
  }
}

export const googleService = new GoogleService();
