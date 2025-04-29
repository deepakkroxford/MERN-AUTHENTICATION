import express from 'express';
import { userRegister, userLogin, userLogout, sendVerifyOtp, verfiyEmail, isAuthenticated,resendOtp, resetPassword } from '../controllers/authController.js'
import userAuth from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/register', userRegister);
authRouter.post('/login', userLogin);
authRouter.post('/logout', userLogout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verfiyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-resend-otp',resendOtp);
authRouter.post('/reset-password',resetPassword);


export default authRouter;