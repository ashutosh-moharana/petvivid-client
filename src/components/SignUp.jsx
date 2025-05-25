// Signup.js
import { useState,useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData,{withCredentials : true}) 
   if(res.data.success){
        
      }else{
        
      }
      alert(res.data.message);
   
    }
    catch(err){+
      
      console.error('Error:', err.response?.data || err.message);
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join PetVivid! 🐱</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          

          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}