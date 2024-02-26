import { Sequelize } from 'sequelize';
import config from './config.js';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.DATABASE_USER,
  host: config.DATABASE_HOST,
  database: config.DATABASE_NAME,
  password: config.DATABASE_PWD,
  port: parseInt(config.DATABASE_PORT, 10)
});

export function startDatabaseConnection() {
  console.log('Trying to connect Database... Wait please ...');

  return new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then(() => {
        console.log('Connected to the Database!');
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
