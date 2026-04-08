import { useState, type FC } from 'react';

type SegmentedControlProps = {
  options: string[];
  defaultOption: string;
  onChange: (option: string) => void;
}

const SegmentedControl: FC<SegmentedControlProps> = ({ options, defaultOption, onChange }) => {
  let index = 0;
  if (defaultOption) {
    index = options.indexOf(defaultOption);
  }
  const [activeIndex, setActiveIndex] = useState(index);
  const tabWidth = 120;

  return (
    <div className="relative flex items-center bg-gray-300 p-1 rounded-full w-max">
      <div
        className="absolute h-[calc(100%-8px)] rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out"
        style={{
          width: `${tabWidth}px`,
          transform: `translateX(${activeIndex * tabWidth}px)`,
        }}
      />

      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => { setActiveIndex(index); onChange(option); }}
          className={`
            relative z-10 font-medium text-sm transition-colors duration-300
            ${activeIndex === index ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
          `}
          style={{ width: `${tabWidth}px`, height: '36px' }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;