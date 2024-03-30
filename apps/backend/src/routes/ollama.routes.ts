import KoaRouter from 'koa-joi-router';
import { OllamaService } from '../services/ollama';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

// Get a response from Ollama for a prompt
router.route({
  method: 'GET',
  path: '/',
  validate: {
    type: 'json',
    query: {
      model: Joi.string().required(),
    },
    body: Joi.object({ prompt: Joi.string().required() }),
  },
  meta: {
    swagger: {
      summary: 'Get a response from Ollama for a prompt',
      description: 'Get a response from Ollama for a prompt',
      tags: ['ollama'],
    },
  },
  handler: async (ctx) => {
    const model = ctx.query.model;
    const ollamaService = new OllamaService(model);

    const prompt = ctx.request.body.prompt;
    const response = await ollamaService.generateResponse(prompt);

    ctx.body = {
      prompt,
      response,
    };
  },
});

export default router;
