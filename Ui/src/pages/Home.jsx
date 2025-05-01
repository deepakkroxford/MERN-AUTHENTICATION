import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-amber-300">Welcome to the Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
