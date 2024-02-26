import app from './app.js';
import { startDatabaseConnection } from './database.js';
import config from './config.js';

const { PORT } = config;

startDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log({ error });
  });
