// In CategoryBooks.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';


const allBooks = [
  {
    id: 1,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Business',
    cover: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: '#',
    
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Health & Fitness',
    cover: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Business',
    cover: 'https://m.media-amazon.com/images/I/71m+Qtq+HUL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: '#'
  },
  {
    id: 4,
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    category: 'Business',
    cover: 'https://m.media-amazon.com/images/I/71aG+xDKSYL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: '#',
  },
  {
    id: 5,
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    category: 'Body, Mind & Spirit',
    cover: 'https://m.media-amazon.com/images/I/71TZn3Zq5sL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: '#'
  },
  // Add more books with appropriate categories
];

function CategoryBooks() {
  const { categoryName } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);
  
  const books = allBooks.filter(book => 
    book.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <>
      <Navbar/>
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
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-[#414040] ">
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
      <Footer/>
    </>
  );
}

export default CategoryBooks;