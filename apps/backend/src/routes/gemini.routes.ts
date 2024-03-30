import KoaRouter from 'koa-joi-router';
import { geminiService } from '../services/gemini';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

// Get a response from Gemini for a prompt
router.route({
  method: 'GET',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object({ prompt: Joi.string().required() }),
  },
  meta: {
    swagger: {
      summary: 'Get a response from Gemini for a prompt',
      description: 'Get a response from Gemini for a prompt',
      tags: ['gemini'],
    },
  },
  handler: async (ctx) => {
    const prompt = ctx.request.body.prompt;
    const response = await geminiService.generateResponse(prompt);

    ctx.body = {
      prompt,
      response,
    };
  },
});

export default router;
