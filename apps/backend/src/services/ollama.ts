import { Ollama } from '@langchain/community/llms/ollama';
import config from '../config';

export class OllamaService {
  private model: Ollama;

  constructor(model: string) {
    this.model = new Ollama({
      baseUrl: config.llm.ollama.baseUrl,
      model,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const stream = await this.model.stream(prompt);

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const response = chunks.join('');

    return response;
  }
}
