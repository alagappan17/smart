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
  created: Joi.date().required(),
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

const UpdateBlockRequest = {
  id: Joi.string(),
  type: Joi.string(),
  content: Joi.string(),
  slug: Joi.string(),
  title: Joi.string(),
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

// Update a block
router.route({
  method: 'PUT',
  path: '/:blockId',
  validate: {
    type: 'json',
    params: {
      blockId: Joi.string().required(),
    },
    body: UpdateBlockRequest,
    output: {
      200: {
        body: BlockResponse,
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Update Block',
      description: 'Update a block',
      tags: ['blocks'],
    },
  },
  handler: async (ctx) => {
    const blockId = ctx.params.blockId.trim();

    const block = (await PromptBlocks.findOne({ id: blockId })).toObject();

    if (!block) {
      ctx.status = 404;
      ctx.body = {
        message: 'Block not found',
      };

      return;
    }

    const { title, content, slug, type } = ctx.request.body;

    const updatedBlock = (await PromptBlocks.findOneAndUpdate({ id: blockId }, { title, content, slug, type }, { new: true, runValidators: true })).toObject();

    ctx.status = 200;
    ctx.body = updatedBlock;
  },
});

// Delete a block
router.route({
  method: 'DELETE',
  path: '/:blockId',
  validate: {
    params: {
      blockId: Joi.string().required(),
    },
  },
  meta: {
    swagger: {
      summary: 'Delete Block',
      description: 'Delete a block',
      tags: ['blocks'],
    },
  },
  handler: async (ctx) => {
    const blockId = ctx.params.blockId.trim();

    const block = await PromptBlocks.findOne({ id: blockId });

    if (!block) {
      ctx.status = 404;
      ctx.body = {
        message: 'Block not found',
      };

      return;
    }

    const result = await PromptBlocks.deleteOne({ id: blockId });

    if (result) {
      ctx.status = 200;
      ctx.body = { message: 'Block deleted' };
    }
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
