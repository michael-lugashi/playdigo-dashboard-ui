import React from 'react';
import playdigoLogo from '../../assets/images/playdigo_logo.jpeg';
import { UserIcon, PlusIcon, ChartIcon } from '../svgs';
import { useNavigate } from 'react-router';

interface AdminBannerProps {
  onAddUserClick: () => void;
}

const AdminBanner: React.FC<AdminBannerProps> = ({ onAddUserClick }) => {
  const navigate = useNavigate();

  return (
    <div className="widget-box w-full p-4 flex flex-row items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={playdigoLogo} alt="Playdigo Logo" className="w-12 h-12 rounded-md object-cover" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Playdigo</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Playdigo</span>
            <span className="mx-2">›</span>
            <>
              <span>Admin</span>
              <span className="mx-2">›</span>
            </>
            <span className="font-medium">User Settings</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => void navigate('/')}
          type="button"
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors duration-200 hover:scale-102 active:scale-98 flex items-center gap-2"
        >
          <ChartIcon className="h-4 w-4" />
          Dashboard
        </button>
        <button
          onClick={onAddUserClick}
          type="button"
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors duration-200 hover:scale-102 active:scale-98 flex items-center gap-2"
        >
          <UserIcon className="h-4 w-4" />
          Add New User
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminBanner;
