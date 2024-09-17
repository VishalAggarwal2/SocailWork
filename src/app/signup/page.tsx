"use client"
import React ,{useState} from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        address: ''
      });
      const [error, setError] = useState('');

    
      const handleSignup = async (e:any) => {
        e.preventDefault();
        setError('');
    
        try {
          const res = await fetch('/api/User', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const data = await res.json();
          if (res.ok) {
            // router.push('/login'); // Redirect to login page
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Something went wrong.');
        }
      };
    
      const handleChange = (e:any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
            <form onSubmit={handleSignup} className="mt-4">
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Your address"
                  required
                ></textarea>
              </div>
              <button className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </p>
          </div>
        </div>
      );
}

export default page
