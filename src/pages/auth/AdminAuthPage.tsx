// AdminLoginPage.tsx
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://backend/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'Login failed');
      } else {
        alert('Admin login successful!');
        // TODO: redirect or save token
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center bg-no-repeat"
      style={{ backgroundImage: "url('/LoginImg.jpg')" }}
    >
      <div className="max-w-md w-full bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <div className="flex items-center mb-6">
          <img src="/AdminLogo.png" alt="Admin Logo" className="w-12 h-12 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
            <p className="text-sm text-gray-500">Manage Everything Smartly</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white rounded-3xl py-2 hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Admin Log In'}
          </button>
        </form> 
      </div>
    </div>
  );
};

export default AdminLoginPage;
