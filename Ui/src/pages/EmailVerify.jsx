import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { backendUrl,isLoggedin,getUserData,userData } = useContext(AppContext);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success('Email verified successfully!');
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    isLoggedin && userData && userData.isVerified && navigate('/')
  },[isLoggedin,userData])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <img src={assets.mail_icon} alt="Email" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter the 6-digit verification code sent to your email address
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full outline-none"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Verify Email
          </button>

          <p className="text-sm text-center text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => navigate('/resend-otp')}
            >
              Resend OTP
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
