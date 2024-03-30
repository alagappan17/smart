import KoaRouter from 'koa-joi-router';
import { openAiService } from '../services/openai';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

// Get a response from OpenAI for a prompt
router.route({
  method: 'GET',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object({ prompt: Joi.string().required() }),
  },
  meta: {
    swagger: {
      summary: 'Get a response from OpenAI for a prompt',
      description: 'Get a response from OpenAI for a prompt',
      tags: ['openai'],
    },
  },
  handler: async (ctx) => {
    const prompt = ctx.request.body.prompt;
    const response = await openAiService.generateResponse(prompt);

    ctx.body = {
      prompt,
      response,
    };
  },
});

export default router;
