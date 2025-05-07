import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Welcome to SecureAuth
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your trusted platform for secure authentication and account management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Secure Login
              </h2>
              <p className="text-gray-600">
                Experience seamless and secure authentication with our advanced security features.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                Account Management
              </h2>
              <p className="text-gray-600">
                Easily manage your account settings and security preferences in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
