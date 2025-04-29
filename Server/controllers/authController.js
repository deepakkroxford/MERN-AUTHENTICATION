import userModel from "../models/user.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from "../config/nodemailer.js";

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
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const emailSubject = 'Welcome to Our Website';
        const emailText = `Welcome to our website ${name}, your account has been created with email ID ${email}`;
        await sendEmail(email, emailSubject, emailText);  // Using Brevo's sendEmail function

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
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

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
            message: 'You are logged in successfully',
            token
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // it means when we are on the production mode it only run on https not on http
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, message: 'logOut' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;
        console.info("from the controller userId is came", userId);
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const user = await userModel.findById(userId);
        console.log("the verifed user data", user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'Account already verified' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate 6-digit OTP
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiration

        await user.save();

        const emailSubject = 'OTP for Verification';
        const emailText = `Your OTP is ${otp}. Verify your account using this OTP.`;
        await sendEmail(user.email, emailSubject, emailText);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully for verification'
        });
    } catch (error) {
        console.error('Error in sendVerifyOtp:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const verfiyEmail = async (req, res) => {
    try {
        const userId = req.userId
        console.info("the userid recive in the verify email", userId);
        const { otp } = req.body;
        console.info('otp send by the user', otp);
        if (!userId || !otp) {
            return res.status(400).json({ success: false, message: 'required field is missing' })
        }

        const user = await userModel.findById(userId);
        if (user.isVerified === true) {
            return res.status(409).json({ success: false, message: 'User already Verified' });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid Otp' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'Otp is expired' });
        }
        user.isVerified = true;
        user.verfiyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.status(200).json({ success: true, message: 'Verified Succesfull' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error from Otp Verification' });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const resendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'email is missing in resend otp' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found so i can not send the resend Otp' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const emailSubject = 'OTP for ResetPassword';
        const emailText = `Your OTP is ${otp}. Reset your otp.`;
        await sendEmail(user.email, emailSubject, emailText);

        res.status(200).json({ success: false, message: 'Resend Otp send SuccessFully' });


    } catch {
        console.error('Error in restOtp:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const resetPassword = async (req, res) => {
    const { otp, newPassword, email } = req.body
    if (!otp || !newPassword || !email) {
        return res.status(400).json({ success: false, message: 'Required field is missing' });
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' });
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid otp so you can not reset your password' });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'Otp has expired' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password has reset Successfull' });

    } catch (error) {
        console.error('Error in restPassword:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}


export {
    userRegister, userLogin, userLogout, sendVerifyOtp, verfiyEmail, isAuthenticated, resendOtp, resetPassword
}