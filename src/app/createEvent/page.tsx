"use client"
import { useState, useEffect } from 'react';

export default function Page() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [ngoId, setNgoId] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve NGO ID from local storage on component mount
    const storedNgoId = localStorage.getItem('ngoId');
    if (storedNgoId) {
      setNgoId(storedNgoId);
    } else {
      // Handle the case where ngoId is not available in local storage
      setError('NGO ID is not available in local storage.');
    }
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/Events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, startDate, endDate, status, ngoId: localStorage.getItem("ngoId") }),
      });
  
      if (!response.ok) {
        const text = await response.text(); // Read response as text to handle non-JSON responses
        throw new Error(`Error ${response.status}: ${text}`);
      }
  
      const result = await response.json();
      console.log('Event created:', result);
      // Handle success (e.g., redirect or show a success message)
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input 
            type="text" 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input 
            type="date" 
            id="startDate"
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
          <input 
            type="date" 
            id="endDate"
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="STARTED">Started</option>
            <option value="ENDED">Ended</option>
          </select>
        </div>
        <div>
          <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700">NGO ID:</label>
          <input 
            type="text" 
            id="ngoId"
            value={ngoId} 
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 focus:outline-none sm:text-sm"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
