import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PdfCard from "../components/PdfCard";
import PdfPreviewModal from "../components/PdfPreviewModal";

export default function StudentDashboard() {
  const [pdfs, setPdfs] = useState([]);
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const fetchPDFs = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (className) params.append('className', className);
      if (schoolName) params.append('schoolName', schoolName);
      params.append('page', page);
      params.append('limit', 6);
      
      const res = await api.get(`/pdf/search?${params.toString()}`);
      setPdfs(res.data.data);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      // Error already handled by axios interceptor
      console.error('Search error:', error);
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPDFs(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchPDFs(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Browse PDFs</h1>
          <p className="text-sm sm:text-base text-gray-400">Search and download educational materials</p>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              
              {/* Class Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class
                </label>
                <input
                  type="text"
                  placeholder="e.g., 10th Grade"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              
              {/* School Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  School
                </label>
                <input
                  type="text"
                  placeholder="e.g., ABC Academy"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              
              {/* Search Button */}
              <div className="flex flex-col justify-end">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Action
                </label>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
            
            {/* Clear Filters */}
            {(subject || className || schoolName) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSubject("");
                    setClassName("");
                    setSchoolName("");
                    handleSearch();
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 sm:p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading PDFs...</p>
            </div>
          ) : pdfs.length > 0 ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-400 text-sm sm:text-base">
                  Showing {pdfs.length} result{pdfs.length !== 1 ? 's' : ''} (Page {currentPage} of {totalPages})
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {pdfs.map((pdf) => (
                  <PdfCard key={pdf._id} pdf={pdf} onPreview={() => setSelectedPdf(pdf)} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="px-2 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 sm:p-12 text-center">
              <svg
                className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-600 mb-3 sm:mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-base sm:text-lg font-medium text-gray-400 mb-2">
                No PDFs found
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Try searching for a different subject
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* PDF Preview Modal */}
      {selectedPdf && (
        <PdfPreviewModal pdf={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )}
    </div>
  );
}