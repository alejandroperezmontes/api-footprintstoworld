import 'dotenv/config.js';

const config = {
  JWT_SECRET_KEY: process.env.TOKEN_SCRET || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PWD: process.env.DATABASE_PWD || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  DATABASE_PORT: process.env.DATABASE_PORT || '',
  PORT: process.env.PORT || 3000,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  APP_BASE_URL: process.env.APP_BASE_URL
};

export default config;
