import * as Joi from 'joi';

export const JoiValidation = Joi.object({
  HOST_API: Joi.string().default('localhost'),
  JWT_SECRET: Joi.string().default('secret'),
  STAGE: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),

  MONGO_URI: Joi.string().default('mongodb://localhost:27017'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('user'),
  DB_PASS: Joi.string().default('password'),
  DB_NAME: Joi.string().default('database'),
});
