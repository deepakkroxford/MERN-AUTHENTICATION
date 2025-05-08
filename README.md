**# MERN-AUTHENTICATION
**# MERN Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring:

## Features
- User registration and login
- JWT-based authentication
- Cookie-based session management
- Email verification with OTP
- Password reset functionality
- Protected routes
- CORS enabled for secure frontend-backend communication

## Tech Stack
- **Frontend**: React, TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Cookie-parser
- **API Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Toastify

## Installation

### Backend
1. Navigate to `Server/` directory
2. Run `npm install`
3. Create `.env` file with required environment variables
4. Start server with `npm start`

### Frontend
1. Navigate to `Ui/` directory
2. Run `npm install`
3. Start development server with `npm run dev`

## Environment Variables
Backend requires the following environment variables:
- PORT
- MONGO_URI
- JWT_SECRET
- EMAIL_USER
- EMAIL_PASS

## API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/verify - Email verification
- POST /api/auth/reset-password - Password reset
- GET /api/user/profile - Protected user profile

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
