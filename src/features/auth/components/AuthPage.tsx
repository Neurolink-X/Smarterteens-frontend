import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthPageProps {
    initialMode?: 'login' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [showPassword] = useState(false);
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
        <div className="relative min-h-screen min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto">
            <img
                src="/UpperImg.jpg"
                alt=""
                className="absolute top-0 left-0 w-full h-16 sm:h-20 object-cover pointer-events-none"
            />
            <img
                src="/LowerImg.jpg"
                alt=""
                className="absolute bottom-0 left-0 w-full h-16 sm:h-20 object-cover pointer-events-none"
            />
            <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex justify-center items-center z-10 relative py-6 sm:py-8 px-4 sm:px-6">
                    <div className="max-w-md w-full bg-white/90 backdrop-blur-lg py-6 sm:py-8 px-4 sm:px-6 md:px-8 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/SmaterTeensLogo.jpg"
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
                                    className="w-full min-h-[44px] px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 rounded-t transition-colors"
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
className="w-full min-h-[44px] px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 rounded-t transition-colors"
                                    value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                required
className="w-full min-h-[44px] px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 rounded-t transition-colors"
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
className="w-full min-h-[44px] px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 rounded-t transition-colors"
                                    value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({ ...formData, confirmPassword: e.target.value })
                                        }
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        required
                                        className="w-full min-h-[44px] px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 rounded-t transition-colors"
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
                                className="w-full min-h-[48px] flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img src="/GoogleLogo.png" alt="Google" className="w-5 mr-2" />
                                Sign in with Google
                            </button>

                            <button
                                type="button"
                                onClick={handleAppleSignIn}
                                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-gray-900 text-white border border-gray-800 rounded-xl py-3 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Sign in with Apple
                                <img src="/Applelogo.png" alt="Apple" className="w-5 mr-2 ml-10" />
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full min-h-[48px] bg-purple-600 text-white rounded-xl font-medium py-3 hover:bg-purple-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
