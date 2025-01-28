import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFingerprint } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg p-8">
                    {/* Login */}
                    <div className="text-center mb-6">
                        {/* <FaFingerprint className="text-blue-500 mx-auto text-5xl" /> */}
                        <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
                    </div>
                    <form id="formAuthentication" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                id="email"
                                name="email-username"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                    <i className="bx bx-hide"></i>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember Me </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={() => navigate("/dashboards/home")}
                                className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        <span>New on our platform? </span>
                        <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;