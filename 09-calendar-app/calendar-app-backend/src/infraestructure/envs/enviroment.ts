import 'dotenv/config';
import Joi from 'joi';

const envVarsSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required()
}).unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const enviromentConfig = {
  mongoURL: envVars.MONGO_URL,
  port: envVars.HTTP_PORT,
  jwtSecret: envVars.JWT_SECRET
};
