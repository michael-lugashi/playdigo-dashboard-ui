import React from 'react';

interface TimeFrameButton {
  label: string;
  value: number;
}

interface TimeFrameProps {
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<number>>;
}

const timeFrameButtons: TimeFrameButton[] = [
  { label: 'Today', value: 1 },
  { label: 'Last 3 days', value: 3 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 15 days', value: 15 },
  { label: 'Last 30 days', value: 30 },
];

const TimeFrame: React.FC<TimeFrameProps> = ({ setSelectedTimeFrame }) => {
  return (
    <div className="flex flex-row gap-2 widget-box w-full pl-4">
      {timeFrameButtons.map(({ label, value }) => (
        <button
          key={value}
          className="px-4 py-2 rounded hover:bg-cyan-100 transition-transform duration-150 active:scale-105 focus:outline-none"
          onClick={() => setSelectedTimeFrame(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TimeFrame;
