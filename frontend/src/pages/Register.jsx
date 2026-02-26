import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      toast.success("Registration successful! Welcome aboard!");

      if (res.data.user.role === "student") {
        navigate("/student");
      } else {
        navigate("/academy");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8">
          {/* Logo/Title */}
          <div className="text-center mb-6 sm:mb-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-2xl shadow-lg">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Edu
              </span>
              <span className="text-white">Platform</span>
            </h1>
            <p className="text-gray-400 text-sm font-medium">Create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "student" })}
                  className={`py-4 px-4 rounded-lg font-medium transition-all duration-300 ${
                    form.role === "student"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-400 border border-gray-600 hover:border-blue-500 hover:text-white"
                  }`}
                >
                  <div className="text-2xl mb-1">🎓</div>
                  <div className="text-sm">Student</div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "academy" })}
                  className={`py-4 px-4 rounded-lg font-medium transition-all duration-300 ${
                    form.role === "academy"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-400 border border-gray-600 hover:border-blue-500 hover:text-white"
                  }`}
                >
                  <div className="text-2xl mb-1">🏫</div>
                  <div className="text-sm">Academy</div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-bold rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}