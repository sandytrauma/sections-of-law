// components/BriefCard.tsx
import React from 'react';
import { ActSection } from '@/constants/types'; // Adjust the path if necessary

type BriefCardProps = {
  section: ActSection;
};

const BriefCard: React.FC<BriefCardProps> = ({ section }) => {
  return (
    <div className="p-4 border border-gray-200 rounded shadow-md bg-white hover:bg-gray-100 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-2">
        {section.title || section.section_title || "No Title"}
      </h2>
      <p className="text-sm text-gray-600 truncate">
        {section.description || section.section_desc || "No Description"}
      </p>
    </div>
  );
};

export default BriefCard;
