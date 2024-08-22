// src/components/ConstitutionContent.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { ActSection } from '@/constants/types'; 

// Define ActSections as an array of ActSection
type ActSections = ActSection[];

// Debounce hook definition outside the component
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Define props for the component
type ConstitutionContentProps = {
  data: ActSections; 
};

// Main component
const ConstitutionContent: React.FC<ConstitutionContentProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const itemsPerPage = 30;

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter data based on search query
  const filteredData = (data: ActSections, searchQuery: string): ActSections => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return data.filter(article => {
      const title = (article.title || "").toLowerCase();
      const description = (article.description || "").toLowerCase();
      return title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
    }).map(article => {
      const title = article.title || "";
      const description = article.description || "";
      
      // Function to highlight the keyword in the text
      const highlightText = (text: any, query: string): string => {
        if (typeof text !== 'string') {
          return ''; // Return an empty string if text is not a string
        }
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, `<mark class="bg-purple-200">$1</mark>`);
      };
  
      // Highlight keyword in the description
      const highlightedDescription = highlightText(description, searchQuery);

      // Return a new article with the highlighted description
      return {
        ...article,
        title,
        description: highlightedDescription 
      };
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Paginate data
  const paginateData = (data: ActSections, currentPage: number, itemsPerPage: number): ActSections => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredAndPaginatedData = paginateData(filteredData(data, debouncedSearchQuery), currentPage, itemsPerPage);
  const totalPages = Math.ceil(filteredData(data, debouncedSearchQuery).length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border bg-teal text-zinc-900 rounded w-full focus:bg-teal-100"
          aria-label="Search articles"
        />
      </div>

      {/* Display filtered and paginated articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndPaginatedData.map((article, index) => (
          <div
            key={index} 
            className="section-card p-4 border border-gray-200 rounded text-justify shadow-md bg-[#F5FFFA] h-[400px] overflow-scroll"
          >
            <h1 className="text-xl text-slate-500 font-bold mb-2">
              {article.title || "No Title"}
            </h1>
            <p className="text-base text-black"
               dangerouslySetInnerHTML={{ __html: article.description || "No Description" }}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:bg-teal-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:bg-teal-300"
        >
          Next
        </button>
      </div>
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ConstitutionContent;