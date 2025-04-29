import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnection from './config/databaseConnection.js';
import authRouter from './routes/authRouter.js';

configDotenv();
dbConnection();


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(cors({credentials:true}));

app.get('/',(req,res)=>{
    res.send('api is working perfectly');
})

app.use('/api/user',authRouter)

const PORT = process.env.PORT || 4040;
app.listen(PORT,()=>{
    console.log(`serve is running on port http://localhost:${PORT}`);
})