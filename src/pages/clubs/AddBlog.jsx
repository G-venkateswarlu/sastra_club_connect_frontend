import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import { toast } from "react-toastify";

const AddBlog = () => {
     const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!title || !description || !coverImage) {
    toast.error("All fields are required");
    return;
  }

    const formData =new FormData();
    formData.append("title",title);
    formData.append("description",description);
    formData.append("coverimg",coverImage);
    relatedImages.forEach((img)=>formData.append("photos",img));

    try{
        const res=await axios.post(`${apiBaseUrl}/api/club/create-blog`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            },
            withCredentials:true,
        });
         setTitle("");
        setDescription("");
        setCoverImage(null);
        setRelatedImages([]);
        navigate(`/club/home?tab=allBlogs`);
        toast.success("Blog posted successfully!");
        }catch (error) {
        console.error(error);
        toast.error("Failed to post blog");
           }

   };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New Blog
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Blog Title (NO LABEL) */}
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Blog Description (NO LABEL) */}
          <textarea
            placeholder="Blog Description"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-lg resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Upload Cover Image */}
          <div className="mb-6">
            <p className="font-medium mb-2">Upload Cover Image</p>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </label>
              <span className="text-sm text-gray-500">
                {coverImage ? coverImage.name : "No chosen file"}
              </span>
            </div>
          </div>

          {/* Upload Related Images */}
          <div className="mb-6">
            <p className="font-medium mb-2">Upload Related Images</p>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                Choose Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setRelatedImages(Array.from(e.target.files))
                  }
                />
              </label>
              <span className="text-sm text-gray-500">
                {relatedImages.length > 0
                  ? `${relatedImages.length} file(s) selected`
                  : "No chosen files"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
                       hover:bg-blue-700 transition"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
