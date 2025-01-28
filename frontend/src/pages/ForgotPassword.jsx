import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFingerprint } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // send the secure code to the backend
        console.log("Secure code sent successfully");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg px-8 py-12">
                    {/* Forgot Password */}
                    {/* <div className="text-center mb-6">
            <FaFingerprint className="text-blue-500 mx-auto text-5xl" />
          </div> */}
                    <div className='mb-2'>
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password? 🔒</h4>
                        <p className="text-gray-600 mb-6">Enter your email and we'll send you instructions to reset your password.</p>
                    </div>
                    <form id="formAuthentication" className="space-y-6" onSubmit={handleSubmit}>
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
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
                            <IoIosArrowBack />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
