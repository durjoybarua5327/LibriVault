import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FreeBooks() {
  const [books, setbooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getbooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/book');
        const data = response.data;
        setbooks(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getbooks();
  }, []);

  const visibleCategories = showAll ? books : books.slice(0, 8);

  const handleCategoryClick = (categoryName) => {
    navigate(`/free/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Free Books Collection
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl dark:shadow-gray-800/50"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={category.src}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                {category.name}
              </h3>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                Free Access
              </span>
            </div>
          </div>
        ))}
      </div>

      {books.length > 8 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="relative inline-flex items-center px-6 py-3 overflow-hidden text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-full hover:text-white group hover:bg-blue-600 transition-all duration-300"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-blue-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="relative flex items-center">
              {showAll ? 'Show Less' : 'Show More'}
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default FreeBooks;