"use client"
import { useState, useEffect } from 'react';

export default function Page() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch NGO ID from local storage on component mount
    const ngoId = localStorage.getItem('ngoId');
    if (ngoId) {
      fetchEvents(ngoId);
    } else {
      setError('NGO ID is not available in local storage.');
    }
  }, []);

  const fetchEvents = async (ngoId:any) => {
    try {
      const response = await fetch(`/api/Events?ngoId=${ngoId}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event:any) => (
            <li key={event.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-1">{event.description}</p>
              <p className="text-gray-500 mb-1">
                {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
              <p className={`text-sm font-medium ${event.status === 'UPCOMING' ? 'text-blue-600' : event.status === 'STARTED' ? 'text-yellow-600' : 'text-gray-600'}`}>
                {event.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
