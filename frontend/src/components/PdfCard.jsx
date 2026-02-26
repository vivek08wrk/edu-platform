export default function PdfCard({ pdf, onPreview }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
      {/* Header with Icon */}
      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate">
            {pdf.subject}
          </h3>
          <span className="inline-block px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md font-medium">
            {pdf.className}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="truncate">{pdf.schoolName}</span>
        </div>
        {pdf.uploadedBy && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="truncate">{pdf.uploadedBy.email}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </button>
        <a
          href={pdf.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open
        </a>
      </div>
    </div>
  );
}