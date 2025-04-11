import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Premium() {
  const [books, setbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getbooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/book');
        setbooks(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getbooks();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/premium/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Premium <span className="text-blue-600">Collection</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover our curated selection of exclusive books
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((category, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="px-4 pt-4">
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
                    <img
                      src={category.src}
                      alt={category.name}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200/30 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Premium