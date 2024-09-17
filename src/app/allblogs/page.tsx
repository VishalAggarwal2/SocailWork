"use client";
import React, { useState, useEffect } from "react";

const Page = () => { 
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get userId from localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found in localStorage");
      return;
    }

    // Fetch blogs from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/Blogs?userId=${userId}`);

        if (!response.ok) {
          throw new Error("Error fetching blogs");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error:any) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 bg-blue-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">User Blogs</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog:any) => (
              <div key={blog.id} className="p-6 bg-white rounded-lg shadow-md border border-blue-200">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{blog.title}</h2>
                <p className="text-gray-700">{blog.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-blue-500">No blogs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
