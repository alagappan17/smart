import KoaRouter from 'koa-joi-router';
import { PromptBlocks } from '../lib/models/Block';
import { QueryOptions } from 'mongoose';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

const BlockResponse = {
  id: Joi.string().required(),
  type: Joi.string().required(),
  content: Joi.string().required(),
  slug: Joi.string().required(),
  title: Joi.string().required(),
};

const BlockListResponse = {
  total: Joi.number().required(),
  results: Joi.array().items(Joi.object(BlockResponse)),
};

const CreateBlockRequest = {
  type: Joi.string().required(),
  content: Joi.string().required(),
  slug: Joi.string().required(),
  title: Joi.string().required(),
};

// Get all the blocks
router.route({
  method: 'GET',
  path: '/',
  validate: {
    query: {
      limit: Joi.number(),
      skip: Joi.number(),
    },
    output: {
      200: {
        body: BlockListResponse,
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Get all the blocks',
      description: 'Get all blocks',
      tags: ['blocks'],
    },
  },
  handler: async (ctx) => {
    const limit = parseInt(Array.isArray(ctx.query.limit) ? ctx.query.limit[0] : ctx.query.limit || '100') || 100;

    const skip = parseInt(Array.isArray(ctx.query.skip) ? ctx.query.skip[0] : ctx.query.skip || '0') || 0;

    const options: QueryOptions = {
      limit,
      skip,
      sort: { created: -1 },
    };

    const results = await PromptBlocks.find({}, null, options).exec();
    const blocks = results.map((block) => block.toObject());

    const total = await PromptBlocks.countDocuments().exec();

    ctx.status = 200;
    ctx.body = {
      total,
      results: blocks,
    };
  },
});

// Create a new block
router.route({
  method: 'POST',
  path: '/',
  validate: {
    type: 'json',
    body: CreateBlockRequest,
    output: {
      201: {
        body: BlockResponse,
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Create a Block',
      description: 'Create a new block',
      tags: ['blocks'],
    },
  },
  handler: async (ctx) => {
    const { type, content, slug, title } = ctx.request.body;

    const newBlock = (await PromptBlocks.create({ type, content, slug, title })).toObject();

    ctx.status = 201;
    ctx.body = newBlock;
  },
});

// Check if a slug is available
router.route({
  method: 'GET',
  path: '/:slug/available',
  validate: {
    params: {
      slug: Joi.string().required(),
    },
    output: {
      200: {
        body: Joi.object({
          available: Joi.boolean().required(),
        }),
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Check if a slug is available',
      description: 'Check if a slug is available',
      tags: ['blocks'],
    },
  },
  handler: async (ctx) => {
    const { slug } = ctx.params;

    const block = await PromptBlocks.findOne({ slug }).exec();

    ctx.status = 200;
    ctx.body = {
      available: !block,
    };
  },
});

export default router;
