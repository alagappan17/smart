import KoaRouter from 'koa-joi-router';
import { cohereService } from '../services/cohere';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

// Get a response from Cohere for a prompt
router.route({
  method: 'GET',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object({ prompt: Joi.string().required() }),
  },
  meta: {
    swagger: {
      summary: 'Get a response from Cohere for a prompt',
      description: 'Get a response from Cohere for a prompt',
      tags: ['cohere'],
    },
  },
  handler: async (ctx) => {
    const prompt = ctx.request.body.prompt;
    const response = await cohereService.generateResponse(prompt);

    ctx.body = {
      prompt,
      response,
    };
  },
});

export default router;
