import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";


const ClubRegister = () => {
  const navigate = useNavigate();

   const [formData, setFormData] = useState({
    name: "",
    password: "",
    description: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerHandler = async(e) => {
    e.preventDefault();

   try{
    const data=new FormData();
   data.append("name", formData.name);
      data.append("password", formData.password);
      data.append("description", formData.description);

      if (photo) {
        data.append("photo", photo);
      }
        const res= await axios.post(
        `http://localhost:5000/api/auth/club/register`,
         data,
        { withCredentials: true }
    );
    toast.success("club created successfully");
     navigate("/club/home");

   }catch(err)
   {
      toast.error(err.response?.data?.message || "club creation failed");
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Club Registration
        </h1>

        <form onSubmit={registerHandler} className="space-y-6">
          {/* Club Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Club Name</label>
            <input
              type="text"
              name="name"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter club name"
              required
            />
          </div>

          {/* Club Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 mb-2">Club Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          {/* Club Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Club Description</label>
            <textarea
              rows="3"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your club"
              required
            />
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
            Register Club
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/club/login")}
          >
            Login
          </span>
        </div>

        {/* Back to Home */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <AiOutlineArrowLeft size={18} />
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClubRegister;
