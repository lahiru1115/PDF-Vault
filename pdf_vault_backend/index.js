import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './config/routes.config.js';
import connectDB from './config/db.config.js';
import logger from './config/logger.config.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(morgan('dev', {
    stream: {
        write: message => logger.info(message.trim()),
    },
}));

app.use('/api', routes);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
