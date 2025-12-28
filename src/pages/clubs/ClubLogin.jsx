import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const ClubLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

 const loginHandler = async (e) => {

  
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiBaseUrl}/api/auth/club/login`,
        { name, password },
        { withCredentials: true }
      );

    
        toast.success("Logged in successfully");
        navigate("/club/home");
    } catch (err) {
     
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Club Login
        </h1>
        <form onSubmit={loginHandler} className="space-y-6">
          {/* Name*/}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Club Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Club Name"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {/* Eye icon */}
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          {/* Login Button */}
          <button  
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/clubs/register")}
          >
            Register
          </span>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubLogin;

