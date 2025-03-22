import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FreeBooks() {
  const [showAll, setShowAll] = useState(false);

  const bookscategory = [
    { name: 'Body, Mind & Spirit', src: './src/pictures/BodyMindSpirit.jpg' },
    { name: 'Business', src: './src/pictures/business.jpg' },
    { name: 'Computer Science', src: './src/pictures/computer.jpg' },
    { name: 'Health & Fitness', src: './src/pictures/health_fitness.webp' },
    { name: 'Religion', src: './src/pictures/religion.webp' },
    { name: 'Science', src: './src/pictures/science.webp' },
    { name: "Children's Fiction", src: './src/pictures/children_fiction.jpg' },
    { name: 'Fantasy', src: './src/pictures/Fantasy_World.webp' },
    { name: 'Romance', src: './src/pictures/romance.jpg' },
    { name: 'Science Fiction', src: './src/pictures/science_fiction.jpeg' },
    { name: 'Thrillers', src: './src/pictures/thriller.jpeg' },
  ];

  const visibleCategories = showAll ? bookscategory : bookscategory.slice(0, 8);

  return (
    <div className="mx-10">
      <div className="text-3xl">
        <h1>Freebooks Category</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 cursor-pointer transform transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            <div className="overflow-hidden h-60">
              <img
                src={category.src}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-center mt-4 text-xl">{category.name}</h3>
          </div>
        ))}
      </div>


      {bookscategory.length > 8 && (
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
