import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

function FreeBooks() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/booksdata.json');
        const data = await response.json();
        const nonPremiumCategories = data.filter(category => !category.isPremium);
        setCategories(nonPremiumCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  const handleCategoryClick = (categoryName) => {
    navigate(`/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading categories...</div>;
  }

  return (
    <div className="mx-10">
      <div className="text-3xl">
        <h1>Freebooks Category</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            className="dark:bg-[#3e3e3e] dark:hover:bg-[#797878] bg-white shadow-md rounded-md p-4 cursor-pointer transform transition-all ease-in-out hover:bg-blue-200 hover:scale-105 duration-300"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="overflow-hidden h-60">
              <img
                src={category.src}
                alt={category.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-center mt-4 text-xl">{category.name}</h3>
          </div>
        ))}
      </div>

      {categories.length > 8 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 hover:bg-blue-700"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default FreeBooks;
