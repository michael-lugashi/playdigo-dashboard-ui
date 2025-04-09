import React, { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  textColor: string;
  selectedColor: string;
  hoverColor: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onChange,
  textColor,
  selectedColor,
  hoverColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    if (option === selectedOption) return;
    onChange(option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`px-4 py-2 ${selectedColor} ${textColor} rounded-full text-sm font-medium ${hoverColor} transition-colors duration-200 cursor-pointer flex items-center gap-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className={`h-4 w-4 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span>{selectedOption}</span>
        <svg
          className={`h-4 w-4 ${textColor}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-lg min-w-full overflow-hidden z-10">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer flex items-center font-medium gap-2 ${hoverColor} transition-colors duration-200 ${
                option === selectedOption ? `${selectedColor} ${textColor}` : textColor
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
