import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CategoryBooks() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/book');
        const categories = await response.json();
        const selectedCategory = categories.find(
          category => category.name.toLowerCase() === decodeURIComponent(categoryName).toLowerCase()
        );
        setBooks(selectedCategory?.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);

  if (loading) {
    return <div className="text-center py-12">Loading books...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              {decodeURIComponent(categoryName)} Books
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Explore our collection of free {decodeURIComponent(categoryName).toLowerCase()} books
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:bg-blue-100 dark:bg-[#242424] cursor-pointer transform transition-all ease-in-out hover:scale-105 duration-300 dark:hover:bg-[#555555]">
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={book.cover}
                    alt={book.title}
                  />
                </div>
                <div className="p-4 ">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 dark:text-[#fafafa]">{book.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-white">by {book.author}</p>

                  <div className="mt-4">
                    <a
                      href={book.pdfUrl}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryBooks;
