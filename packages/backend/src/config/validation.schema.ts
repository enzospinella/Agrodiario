import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api/v1'),

  // CORS
  CORS_ORIGIN: Joi.string().default('http://localhost:5173'),

  // Database
  DB_TYPE: Joi.string().default('postgres'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),

  // JWT (optional for now)
  JWT_SECRET: Joi.string().optional(),
  JWT_EXPIRATION: Joi.string().default('1d'),
});
