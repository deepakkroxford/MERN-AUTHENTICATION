import express from 'express';
import { getUserData } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

// Added proper route prefixing to match the app.js configuration
userRouter.get('/data', userAuth, getUserData);

export default userRouter;