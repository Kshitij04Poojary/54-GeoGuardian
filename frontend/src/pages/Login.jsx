import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      const res = await axios.post(URL+"/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/dashboard/analytics");
    } catch (err) {
      setError(true);
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-900">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm text-center">Invalid email or password</p>}
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            New on our platform?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
