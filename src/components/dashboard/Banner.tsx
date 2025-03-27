import playdigoLogo from '../../assets/images/playdigo_logo.jpeg';

const Banner: React.FC = () => {
  return (
    <div className="widget-box w-full p-4 flex flex-row items-center justify-between bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <img src={playdigoLogo} alt="Playdigo Logo" className="w-12 h-12 rounded-md object-cover" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Playdigo Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Playdigo</span>
            <span className="mx-2">›</span>
            <span>TikTok</span>
            <span className="mx-2">›</span>
            <span className="font-medium">Dashboard</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Banner;
