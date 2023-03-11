import express from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import dotevn from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';

dotevn.config({ path: '.env' });

connectDB();

import newsletters from './routes/newsletters';
// import auth from './routes/auth';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cookieParser());

app.use(cors());
app.use(mongoSanitize());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/v1/newsletters', newsletters);
// app.use('/api/v1/auth', auth);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});