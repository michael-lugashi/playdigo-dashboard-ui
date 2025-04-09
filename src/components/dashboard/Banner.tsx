import React from 'react';
import playdigoLogo from '../../assets/images/playdigo_logo.jpeg';
import CustomDropdown from '../general/CustomDropdown';

interface BannerProps {
  lastUpdated?: string | null;
  institutionName: string | null;
  fetchDashboardData: (graphOption: string) => Promise<void>;
  graphOptions: string[];
  curGraphOption: string;
  setCurGraphOption: (graphOption: string) => void;
}

const Banner: React.FC<BannerProps> = ({
  lastUpdated,
  institutionName,
  fetchDashboardData,
  graphOptions,
  curGraphOption,
  setCurGraphOption,
}) => {
  // Only show graph selector if there are multiple options
  const showGraphSelector = graphOptions.length > 1;

  // Handle graph option change and trigger refresh
  const handleGraphChange = (option: string) => {
    setCurGraphOption(option);
    void fetchDashboardData(option);
  };

  return (
    <div className="widget-box w-full p-4 flex flex-row items-center justify-between bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <img src={playdigoLogo} alt="Playdigo Logo" className="w-12 h-12 rounded-md object-cover" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Playdigo</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Playdigo</span>
            <span className="mx-2">›</span>
            {institutionName && (
              <>
                <span>{institutionName}</span>
                <span className="mx-2">›</span>
              </>
            )}
            <span className="font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        {showGraphSelector && (
          <CustomDropdown
            options={graphOptions}
            selectedOption={curGraphOption}
            onChange={handleGraphChange}
            textColor="text-blue-600"
            selectedColor="bg-blue-50"
            hoverColor="hover:bg-blue-100"
          />
        )}
        {lastUpdated && (
          <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            Last updated: {lastUpdated}
          </div>
        )}
        <button
          onClick={() => void fetchDashboardData(curGraphOption)}
          type="button"
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Banner;
