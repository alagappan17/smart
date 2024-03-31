import KoaRouter from 'koa-joi-router';
import { ModelResults } from '../lib/models/Result';
import { QueryOptions, SortOrder } from 'mongoose';

const Joi = KoaRouter.Joi;
const router = KoaRouter();

const StorageResult = {
  id: Joi.string().required(),
  prompt: Joi.string().required(),
  model: Joi.string().required(),
  response: Joi.string().required(),
  responseTime: Joi.number(),
  created: Joi.date().required(),
};

const CreateStorageResult = {
  prompt: Joi.string().required(),
  model: Joi.string().required(),
  response: Joi.string().required(),
  responseTime: Joi.number(),
};

const StorageListResults = {
  total: Joi.number().required(),
  results: Joi.array().items(Joi.object(StorageResult)),
};

// Get all the results
router.route({
  method: 'GET',
  path: '/results',
  validate: {
    query: {
      limit: Joi.number(),
      skip: Joi.number(),
    },
    output: {
      200: {
        body: StorageListResults,
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Get all the results',
      description: 'Get all results',
      tags: ['results'],
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

    console.log('Skip and limit', skip, limit);

    const response = await ModelResults.find({}, null, options).exec();
    const results = response.map((block) => block.toObject());

    const total = await ModelResults.countDocuments().exec();

    ctx.status = 200;
    ctx.body = {
      total,
      results,
    };
  },
});

// Create a new result
router.route({
  method: 'POST',
  path: '/result',
  validate: {
    type: 'json',
    body: CreateStorageResult,
    output: {
      201: {
        body: StorageResult,
      },
    },
  },
  meta: {
    swagger: {
      summary: 'Store a new result',
      description: 'Store a new result',
      tags: ['results'],
    },
  },
  handler: async (ctx) => {
    const { prompt, response, responseTime, model } = ctx.request.body;

    const newResult = (await ModelResults.create({ prompt, response, responseTime, model })).toObject();

    ctx.status = 201;
    ctx.body = newResult;
  },
});

// Delete a result
router.route({
  method: 'DELETE',
  path: '/results/:resultId',
  validate: {
    params: {
      resultId: Joi.string().required(),
    },
  },
  meta: {
    swagger: {
      summary: 'Delete a Result',
      description: 'Delete a result',
      tags: ['results'],
    },
  },
  handler: async (ctx) => {
    const resultId = ctx.params.resultId.trim();

    const response = await ModelResults.findOne({ id: resultId });

    if (!response) {
      ctx.status = 404;
      ctx.body = {
        message: 'Result not found',
      };

      return;
    }

    const result = await ModelResults.deleteOne({ id: resultId });

    if (result) {
      ctx.status = 200;
      ctx.body = { message: 'Model result deleted' };
    }
  },
});

export default router;
