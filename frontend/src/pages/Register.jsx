import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Citizen'); // Default selection
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg p-8">
                    {/* Register Card */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mt-2">Sign Up</h2>
                    </div>
                    <form id="formAuthentication" className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* User Type Dropdown */}
                        <div>
                            <label htmlFor="userType" className="block mb-1 text-sm font-medium text-gray-700">
                                User Type
                            </label>
                            <select
                                id="userType"
                                name="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="Admin">Admin</option>
                                <option value="Organization">Organization</option>
                                <option value="NGO">NGO</option>
                                <option value="Citizen">Citizen</option>
                            </select>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                id="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                required
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="my-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" required />
                                <span className="ml-2 text-sm text-gray-700">
                                    I agree to the
                                    <Link to="#" className="text-blue-500 mx-1">privacy policy & terms</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign up
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-sm mt-6">
                        <span>Already have an account?</span>
                        <Link to="/login" className="text-blue-500 hover:underline mx-1">Sign in instead</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
