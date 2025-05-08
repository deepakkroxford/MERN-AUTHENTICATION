import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import AppContext from '../context/AppContext';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      axios.defaults.withCredentials = true;
      if (state === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (response.data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          console.log(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (response.data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_bottom_right,#0892d0,#4b0082)] px-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-600">
            {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4" autoComplete="off">
          {state === 'Sign Up' && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full outline-none"
              autoComplete="off"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 relative shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full outline-none pr-10"
              autoComplete="new-password"
              required
            />
            <span
              className="absolute right-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p onClick={() => navigate('/reset-password')} className="text-right text-sm text-indigo-600 cursor-pointer hover:underline mb-2">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {state}
          </button>

          <p className="text-sm text-center text-gray-600">
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  className="text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => setState('Login')}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  className="text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => setState('Sign Up')}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
