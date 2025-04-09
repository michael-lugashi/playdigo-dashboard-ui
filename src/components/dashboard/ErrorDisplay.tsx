interface ErrorDisplayProps {
  onClose: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ onClose }) => (
  <div className="text-center p-4 pb-2 max-w-md text-2xl font-normal min-w-[600px]">
    <div className="flex items-center justify-center gap-2">
      <h2 className="font-bold text-deep-purple">Error Loading Data</h2>
      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <p>Could not get your data. Please try again later.</p>
    <p>If this problem persists, please contact support.</p>
    <button
      onClick={onClose}
      type="button"
      className="mt-6 bg-red-600 px-8 text-white py-2 rounded-md hover:bg-red-500 transition-all duration-200 active:scale-110 cursor-pointer"
    >
      Okay
    </button>
  </div>
);

export default ErrorDisplay;
