import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AcademyDashboard() {
  const [form, setForm] = useState({
    subject: "",
    className: "",
    schoolName: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {
    if (!form.subject || !form.className || !form.schoolName || !form.file) {
      setError("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("subject", form.subject);
    data.append("className", form.className);
    data.append("schoolName", form.schoolName);
    data.append("file", form.file);

    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await api.post("/pdf/upload", data);
      setSuccess("PDF uploaded successfully!");
      setForm({ subject: "", className: "", schoolName: "", file: null });
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Upload PDF</h1>
          <p className="text-sm sm:text-base text-gray-400">Share educational content with students</p>
        </div>

        {/* Upload Form Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8">
          <div className="space-y-5">
            {/* Subject Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g., Mathematics, Physics"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            {/* Class Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Class
              </label>
              <input
                type="text"
                placeholder="e.g., 10th Grade, Class 12"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.className}
                onChange={(e) => setForm({ ...form, className: e.target.value })}
              />
            </div>

            {/* School Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                School/Academy Name
              </label>
              <input
                type="text"
                placeholder="e.g., ABC Academy"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
              />
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                PDF File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 text-sm file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:text-sm file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                />
              </div>
              {form.file && (
                <p className="mt-2 text-xs sm:text-sm text-gray-400 truncate">Selected: {form.file.name}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 sm:p-4 bg-gray-700 border border-gray-600 rounded-lg">
                <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 sm:p-4 bg-gray-700 border border-gray-600 rounded-lg">
                <p className="text-green-400 text-xs sm:text-sm text-center">{success}</p>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
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
                  Uploading...
                </span>
              ) : (
                "Upload PDF"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}