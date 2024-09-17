"use client";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    field: "",
    location: "",
    email: "",
    website: "",
    locationLink: "",
    logo: "",
    photos: "",
    ratings: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/NGO", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("NGO created successfully!");
        setFormData({
          name: "",
          description: "",
          field: "",
          location: "",
          email: "",
          website: "",
          locationLink: "",
          logo: "",
          photos: "",
          ratings: "",
        });
      } else {
        setError(data.error || "Error creating NGO.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create NGO</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO name"
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
              placeholder="Enter NGO description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Field</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO field"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO website"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location Link</label>
            <input
              type="url"
              name="locationLink"
              value={formData.locationLink}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO location link"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Logo</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO logo URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Photos</label>
            <input
              type="text"
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO photos URLs (comma separated)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ratings</label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter NGO ratings"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <button className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Create NGO
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
