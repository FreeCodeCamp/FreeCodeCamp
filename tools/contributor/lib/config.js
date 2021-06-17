const Joi = require('joi');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(3001),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  GITHUB_USERNAME: Joi.string().required(),
  GITHUB_ACCESS_TOKEN: Joi.string().required(),
  REPOSITORY_OWNER: Joi.string().required(),
  REPOSITORY: Joi.string().required(),
  DEFAULT_BASE: Joi.string().required(),
  PRODUCTION_RUN: Joi.boolean().default(false)
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  mongo: {
    host: envVars.MONGO_HOST
  },
  github: {
    id: envVars.GITHUB_USERNAME,
    secret: envVars.GITHUB_ACCESS_TOKEN,
    owner: envVars.REPOSITORY_OWNER,
    freeCodeCampRepo: envVars.REPOSITORY,
    defaultBase: envVars.DEFAULT_BASE
  },
  oneoff: {
    productionRun: envVars.PRODUCTION_RUN
  }
};

module.exports = config;
