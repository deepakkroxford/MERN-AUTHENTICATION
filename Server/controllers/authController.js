import userModel from "../models/user.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRegister = async (req, res) => {
    const { email, name, password } = req.body;
    console.log(email)
    
    try {
        // Check if user exists - use findOne instead of find
        const existedUser = await userModel.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ success: false, message: 'User Already Exists' });
        }
        
        // Validate required fields
        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Hash password correctly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Pass salt as second argument
        
        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        
        // Generate JWT token - fixed typo in JWT_SECRETE to JWT_SECRET
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE, { expiresIn: '7d' });
        
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        // Return response - remove token from response since it's in cookie
        return res.status(201).json({ 
            success: true, 
            dataUser: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    } catch (error) {
        console.error('Registration error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found. Please register first' });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Fix typo in JWT_SECRETE to JWT_SECRET and use correct user reference
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRETE, { expiresIn: '7d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Return user data without sensitive information
        return res.status(200).json({ 
            success: true, 
            dataUser: {
                _id: userData._id,
                name: userData.name,
                email: userData.email
            },
            message: 'You are logged in successfully' ,
            token
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const userLogout = async(req,res) =>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // it means when we are on the production mode it only run on https not on http
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({success:true,message:'logOut'});
    } catch(error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}


export {
    userRegister, userLogin, userLogout
}