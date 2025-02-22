import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen pb-[80px]">
      <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-96 scale-150">
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-4">Login</h2>
        <form onSubmit={() => navigate("/Email")}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account? <a href="#" className="text-pink-500 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default Home;
