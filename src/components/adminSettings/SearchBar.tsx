import { SearchIcon } from '../svgs';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-4 flex flex-col shadow rounded-lg">
      <h2 className="text-sm font-medium text-gray-500 bg-gray-100 px-6 py-3 rounded-lg uppercase tracking-wider">
        Search
      </h2>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email, role, institution, or graph access..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white rounded-b-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-xl"
            type="button"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
