"use client";
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Safely access localStorage after the component mounts
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData(prevState => ({
        ...prevState,
        userId
      }));
    }
  }, []);

  const handleSubmit = async (e: any) => {
    console.log(formData);
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/Blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Blog created successfully!');
        setFormData({ title: '', description: '', userId: formData.userId });
      } else {
        setError(data.error || 'Error creating blog.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Blog</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter blog description"
              required
            ></textarea>
          </div>
          <button className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
