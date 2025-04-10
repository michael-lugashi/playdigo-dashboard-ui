import { AlertIcon } from '../svgs';

interface ErrorDisplayProps {
  onClose: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ onClose }) => (
  <div className="text-center p-4 pb-2 max-w-md text-2xl font-normal min-w-[600px]">
    <div className="flex items-center justify-center gap-1.5">
      <h2 className="font-bold text-deep-purple">Error Loading Data</h2>
      <AlertIcon className="h-full pt-2 w-6 text-red-600" />
    </div>
    <p>Could not get your data. Please try again later.</p>
    <p>If this problem persists, please contact support.</p>
    <button
      onClick={onClose}
      type="button"
      className="mt-6 bg-red-600 px-8 text-white py-2 rounded-md hover:bg-red-500 transition-all duration-200 hover:scale-110 cursor-pointer active:scale-90"
    >
      Okay
    </button>
  </div>
);

export default ErrorDisplay;
