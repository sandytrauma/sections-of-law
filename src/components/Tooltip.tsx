
import React from 'react';


interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="mr-40 tooltipContainer">
      {children}
      <div className="tooltipText">{text}</div>
    </div>
  );
};

export default Tooltip;
