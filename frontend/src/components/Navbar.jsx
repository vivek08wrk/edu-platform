import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Edu
                </span>
                <span className="text-white">Platform</span>
              </h1>
              <p className="text-xs text-gray-400 capitalize hidden sm:block">{role} Dashboard</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base font-medium rounded-lg border border-gray-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}