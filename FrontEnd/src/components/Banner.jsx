import React from "react";
import { useState } from "react";
function Banner() {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  const subjectGroups = [
    {
      name: "Computer Science",
      color: "bg-blue-100 text-blue-800",
      src: "./src/pictures/computerscience.jpg",
    },
    {
      name: "Mathematics",
      color: "bg-purple-100 text-purple-800",
      src: "./src/pictures/mathematics.jpg",
    },
    {
      name: "Physics",
      color: "bg-red-100 text-red-800",
      src: "./src/pictures/physics.jpg",
    },
    {
      name: "Literature",
      color: "bg-green-100 text-green-800",
      src: "./src/pictures/literature.jpg",
    },
    {
      name: "History",
      color: "bg-yellow-100 text-yellow-800",
      src: "./src/pictures/history.jpg",
    },
    {
      name: "Biology",
      color: "bg-pink-100 text-pink-800",
      src: "./src/pictures/biology.jpg",
    },
    {
      name: "Chemistry",
      color: "bg-indigo-100 text-indigo-800",
      src: "./src/pictures/chemistry.jpg",
    },
    {
      name: "Philosophy",
      color: "bg-orange-100 text-orange-800",
      src: "./src/pictures/philosophy.jpg",
    },
    {
      name: "Economics",
      color: "bg-teal-100 text-teal-800",
      src: "./src/pictures/economics.jpg",
    },
    {
      name: "Art History",
      color: "bg-rose-100 text-rose-800",
      src: "./src/pictures/arthistory.jpg",
    },
    {
      name: "Psychology",
      color: "bg-lime-100 text-lime-800",
      src: "./src/pictures/psychology.jpg",
    },
    {
      name: "Engineering",
      color: "bg-cyan-100 text-cyan-800",
      src: "./src/pictures/engineering.jpg",
    },
  ];

  const handleNextSubject = () => {
    setCurrentSubjectIndex((prev) => (prev + 1) % subjectGroups.length);
  };

  const handlePrevSubject = () => {
    setCurrentSubjectIndex((prev) =>
      prev === 0 ? subjectGroups.length - 1 : prev - 1
    );
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 md:py-16 flex flex-col md:flex-row">
        <div className="left w-full md:w-1/2 order-1 md:order-1 mt-4 md:mt-12">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug md:leading-tight">
              Discover Your Next <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Favorite Read
              </span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Explore thousands of e-books across all genres. Download instantly
              and start reading within seconds.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full 
                              hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform 
                              hover:scale-105 text-sm md:text-base"
              >
                Browse Books
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-2 md:order-2 mt-8 md:mt-0">
          <div className="relative md:-right-8">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 h-64 md:h-96 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="relative w-full h-full group">
                <img
                  src={subjectGroups[currentSubjectIndex].src}
                  alt={subjectGroups[currentSubjectIndex].name}
                  className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                  key={currentSubjectIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="absolute p-4 z-10">
                <h3 className="text-sm md:text-base font-semibold text-gray-600 mb-2">
                  Available Subjects
                </h3>
              </div>

              <div className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-full">
                <span
                  className={`px-4 py-2 rounded-full text-sm md:text-base inline-block 
            ${subjectGroups[currentSubjectIndex].color} 
            shadow-md transition-all duration-300`}
                >
                  {subjectGroups[currentSubjectIndex].name}
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-10">
                <button
                  onClick={handlePrevSubject}
                  className="text-white hover:text-blue-200 transition-colors font-medium drop-shadow"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextSubject}
                  className="text-white hover:text-blue-200 transition-colors font-medium drop-shadow"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
