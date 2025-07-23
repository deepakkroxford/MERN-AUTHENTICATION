import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnection from './config/databaseConnection.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'

configDotenv();
dbConnection();
// https://mern-authentication-6yia.onrender.com
const allowedOrigin = ['http://localhost:5173/']

const app = express();
app.use(express.json());
app.use(express.urlencoded({}));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true               // Allow cookies to be sent
}));

app.get('/', (req, res) => {
    res.send('api is working perfectly');
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`serve is running on port http://localhost:${PORT}`);
})