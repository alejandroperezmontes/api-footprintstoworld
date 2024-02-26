import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// Route index
import routes from './routes/index.js';

const app = express();

// Basic security configuration
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const corsConfig = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsConfig));

app.use('/footprintstoworld', routes);

export default app;
