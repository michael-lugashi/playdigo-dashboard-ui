export default function ErrorDisplay() {
  return (
    <div className="text-center p-8 max-w-md">
      <div className="mb-6">
        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-deep-purple mb-3">Error Loading Data</h2>
      <p className="text-gray-600 text-lg mb-6">Could not get your data. Please try again later.</p>
      <div className="text-sm text-gray-500">If this problem persists, please contact support.</div>
    </div>
  );
}
