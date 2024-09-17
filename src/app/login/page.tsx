"use client"
import React ,{useState} from 'react'

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  
    const handleLogin = async (e:any) => {
      e.preventDefault();
      setError('');
  
      try {
        const res = await fetch(`/api/User?email=${email}&password=${password}`);
        const data = await res.json();
  
        if (res.ok) {
          // Store token in localStorage or cookie
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId',data.userId);

        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Something went wrong.');
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="mt-4">
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>
      </div>)
}

export default Page
