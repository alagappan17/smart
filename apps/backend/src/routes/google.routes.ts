import KoaRouter from 'koa-joi-router';
import { googleService } from '../services/google';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

// Get a response from Google for a prompt
router.route({
  method: 'POST',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object({ prompt: Joi.string().required() }),
  },
  meta: {
    swagger: {
      summary: 'Get a response from Google for a prompt',
      description: 'Get a response from Google for a prompt',
      tags: ['google'],
    },
  },
  handler: async (ctx) => {
    const prompt = ctx.request.body.prompt;
    const response = await googleService.generateResponse(prompt);

    ctx.body = {
      prompt,
      response,
    };
  },
});

export default router;
