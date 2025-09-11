import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          contact: formData.contact,
        };

    const url = isLogin
      ? 'http://backend/login'
      : 'http://backend/signin';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'Something went wrong!');
      } else {
        alert(isLogin ? 'Login successful!' : 'Registered successfully!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          contact: '',
        });
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = '/auth/google';
  };

  const handleAppleSignIn = () => {
    window.location.href = '/auth/apple';
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
    >
      <img
        src="/UpperImg.jpg"
        alt="Top"
        className="absolute top-0 w-full h-20 object-cover"
      />
      <img
        src="/LowerImg.jpg"
        alt="Bottom"
        className="absolute bottom-0 w-full h-20 object-cover"
      />
      <div className="flex h-full">
        <div className="w-full md:w-1/2 flex justify-center items-center z-10 relative">
          <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-blur-lg py-8 px-15 rounded-2xl shadow-xl m-6">
            <div className="flex mb-6">
              <img
                src="/SmaterTeensLogo.jpg"
                alt="SmaterTeensLogo"
                className="w-12 h-12 mt-2 mr-2"
              />
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Smarter<span className="text-yellow-500">Teens</span>
                </h1>
                <p className="text-sm text-gray-500">Learn, Grow, Succeed</p>
              </div>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              {!isLogin && (
                <>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    required
                    className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                  />

                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                </>
              )}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center border border-blue-500 rounded-3xl py-2 hover:bg-gray-100"
              >
                <img src="/GoogleLogo.png" alt="Google" className="w-5 mr-2" />
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                className="w-full flex items-center justify-center bg-white text-black border border-gray-800 rounded-3xl py-2 hover:opacity-90"
              >
                Sign in with Apple
                <img src="/Applelogo.png" alt="Apple" className="w-5 mr-2 ml-10" />
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white rounded-3xl py-2 hover:bg-purple-700 disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                className="text-purple-600 underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/middleImg.jpg"
            alt="Right Side Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
