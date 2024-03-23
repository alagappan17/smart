import KoaRouter from 'koa-joi-router';

const router = KoaRouter();

router.route({
  method: 'GET',
  path: '/',
  meta: {
    swagger: {
      summary: 'Health Check',
      description: 'Check whether or not the services are running',
      tags: ['utilities'],
    },
  },
  handler: async (ctx) => {
    ctx.body = 'Welcome to SMART bitches!';
  },
});

export default router;
