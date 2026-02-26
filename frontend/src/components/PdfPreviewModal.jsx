import { useEffect } from "react";

export default function PdfPreviewModal({ pdf, onClose }) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!pdf) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-[90vh] bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex-1 min-w-0 mr-4">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate mb-1">
              {pdf.subject}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-400">
              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-md">
                {pdf.className}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {pdf.schoolName}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={pdf.fileUrl}
              download
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={onClose}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="flex-1 overflow-hidden bg-gray-900">
          <iframe
            src={pdf.fileUrl}
            className="w-full h-full"
            title={`${pdf.subject} - ${pdf.className}`}
          />
        </div>
      </div>
    </div>
  );
}
