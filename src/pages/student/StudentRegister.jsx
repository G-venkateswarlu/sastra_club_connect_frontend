import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";


const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const registerHandler = async(e) => {
    e.preventDefault();

   try{
      const data = new FormData();
      data.append("name", formData.name);
      data.append("password", formData.password);
      data.append("email", formData.email);
      if (photo) {
        data.append("profilepic", photo);
      }
      const res=await axios.post(`http://localhost:5000/api/auth/student/register`,
        data,
        { withCredentials: true });
  
    toast.success("Registered successfully");
     navigate("/student/home");

   }catch(err)
   {
      toast.error(err.response?.data?.message || "student creation failed");
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Student Registration
        </h1>

        <form onSubmit={registerHandler} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Full Name</label>
            <input
              type="name"
              name="name"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name||""}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email||""}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>

          {/* Upload Photo */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="border border-blue-500 rounded-xl px-4 py-2 text-blue-600 cursor-pointer"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/student/login")}
          >
            Login
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

export default StudentRegister;
