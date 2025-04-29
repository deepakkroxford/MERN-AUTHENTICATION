
import jwt from 'jsonwebtoken'
import userModel from '../models/user.js';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    console.info("token from the middleware : ",token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing' });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const verfiedUser = await userModel.findOne({email:decodeToken.email});
        console.info("the verfiedUser ",verfiedUser)

        // Assigning the decoded token's ID to req.userId
        req.userId = verfiedUser._id;
        console.log("the requserId setting in middleware ",req.userId);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        console.error('Authentication error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default userAuth;