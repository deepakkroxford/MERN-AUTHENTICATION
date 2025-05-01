import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, userData, setUserData, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state == 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (response.data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          console.log(data.message);
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (response.data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-600">
            {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === 'Sign Up' && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <img src={assets.person_icon} alt="person" className="w-5 h-5 mr-2" />
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

          <div className="flex items-center border rounded-lg px-3 py-2">
            <img src={assets.mail_icon} alt="email" className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          <p onClick={() => navigate('/reset-password')} className="text-right text-sm text-indigo-600 cursor-pointer hover:underline mb-2">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
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
