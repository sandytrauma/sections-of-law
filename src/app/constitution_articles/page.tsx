// src/app/constitution_articles/page.tsx

import React from 'react';
import { fetchConstitutionData } from '@/utils/fetchConstitutionData';
import { ActSections } from '@/constants/types';
import ConstitutionContent from '@/components/ConstitutionContent'; // Ensure this path is correct

// Define a server component to fetch and render data
const ConstitutionArticlesPage = async () => {
  let data: ActSections = [];

  try {
    // Fetch data with the correct directory and filename
    data = await fetchConstitutionData('constitution_data', 'constitution_of_india.json');
  } catch (error) {
    console.error('Failed to fetch constitution articles:', error);
    data = []; // Default to an empty array if there is an error
  }

  return (
    <div className="p-4">
      <h1 className="text-center mt-5 text-gray-300 text-2xl md:text-3xl font-mono font-extrabold">Articles of Constitution</h1>
      <ConstitutionContent data={data} />
    </div>
  );
};

export default ConstitutionArticlesPage;
