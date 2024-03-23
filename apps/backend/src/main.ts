import koa from 'koa';
import mount from 'koa-mount';
import cors from '@koa/cors';

import { init as mongoInitialization } from './lib/models/db';
import config from './config';

import healthCheckRoutes from './routes/health.routes';
import blockRoutes from './routes/block.routes';

import Debug from 'debug';
import Pino from 'pino';

const debug = Debug('smart:be:main');
const log = Pino(config.log);

debug('Starting Server Initialization...');

const app = new koa();

app.use(cors({ isSecureContext: true }));
app.keys = [config.sessionKey];

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    log.error(`Error processing route: ${ctx.request.url}: ${err}`);
    ctx.status = 500;
    ctx.body = 'Server Error';
  }
});

// Add routes here
app.use(healthCheckRoutes.middleware());
app.use(mount('/blocks', blockRoutes.middleware()));

async function startup() {
  await mongoInitialization();
  app.listen(config.port);
}

startup()
  .then(() => {
    debug(`Server is running on port ${config.port}`);
  })
  .catch((err) => {
    debug(err);
    console.error(err);
    process.exit(1);
  });
