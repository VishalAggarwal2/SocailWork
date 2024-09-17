"use client"
import React ,{useState ,useEffect} from 'react'
import { useParams } from 'next/navigation'

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const para=useParams();
    const userId = para.userId;
  
    useEffect(() => {
      if (userId) {
        fetchBlogs();
      }
    }, [userId]);
  
    const fetchBlogs = async () => {
      setError('');
  
      try {
        const res = await fetch(`/api/blogs?userId=${userId}`);
        const data = await res.json();
  
        if (res.ok) {
          setBlogs(data);
        } else {
          setError(data.error || 'Error fetching blogs.');
        }
      } catch (err) {
        setError('Something went wrong.');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Blogs</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {blogs.length === 0 ? (
            <p className="text-center text-gray-700 mt-4">No blogs found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {blogs.map((blog:any) => (
                <div key={blog.id} className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="mt-2 text-gray-700">{blog.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default page
