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
      <h1 className="text-2xl font-bold mb-4">Constitution Articles</h1>
      <ConstitutionContent data={data} />
    </div>
  );
};

export default ConstitutionArticlesPage;
