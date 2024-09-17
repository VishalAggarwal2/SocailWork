// app/all-ngos/page.tsx (or .js)

"use client";
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [ngos, setNgos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch NGOs from the API
    const fetchNgos = async () => {
      try {
        const response = await fetch('/api/NGO');
        if (!response.ok) {
          throw new Error('Failed to fetch NGOs');
        }
        const data = await response.json();
        setNgos(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchNgos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">All NGOs</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-6">
          {ngos.length > 0 ? (
            ngos.map((ngo: any) => (
              <div key={ngo.id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{ngo.name}</h2>
                <p className="text-gray-600 mb-2"><strong>Description:</strong> {ngo.description}</p>
                <p className="text-gray-600 mb-2"><strong>Field:</strong> {ngo.field}</p>
                <p className="text-gray-600 mb-2"><strong>Location:</strong> {ngo.location}</p>
                <p className="text-gray-600 mb-2"><strong>Email:</strong> {ngo.email}</p>
                <p className="text-gray-600 mb-2"><strong>Website:</strong> <a href={ngo.website} className="text-blue-500 hover:underline">{ngo.website}</a></p>
                <p className="text-gray-600 mb-2"><strong>Location Link:</strong> <a href={ngo.locationLink} className="text-blue-500 hover:underline">{ngo.locationLink}</a></p>
                <p className="text-gray-600 mb-2"><strong>Ratings:</strong> {ngo.ratings}</p>
                {ngo.photos && ngo.photos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Photos</h3>
                    <div className="flex space-x-4 mt-2">
                      {ngo.photos.map((photo: string, index: number) => (
                        <img key={index} src={photo} alt={`Photo ${index + 1}`} className="w-32 h-32 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No NGOs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
