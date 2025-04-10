import React, { useState, useRef, useEffect } from 'react';
import { ChartIcon, ChevronDownIcon } from '../svgs';

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
        <ChartIcon className={`h-4 w-4 ${textColor}`} />
        <span>{selectedOption}</span>
        <ChevronDownIcon className={`h-4 w-4 ${textColor}`} />
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
