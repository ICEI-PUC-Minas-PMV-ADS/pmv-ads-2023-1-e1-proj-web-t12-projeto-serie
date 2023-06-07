import React, { useState } from 'react';
interface TooltipProps {
    text: string;
    children: React.ReactNode;
  }
  
  const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="inline-block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isHovered && (
        <div className="absolute z-50 bg-gray-900 text-white p-2 rounded-md">
          <p className="text-sm">{text}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
