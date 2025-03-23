import React from "react";
import { useState } from "react";
import subjectGroups from "./subjectGroups.js";

function Banner() {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  const handleNextSubject = () => {
    setCurrentSubjectIndex((prev) => (prev + 1) % subjectGroups.length);
  };

  const handlePrevSubject = () => {
    setCurrentSubjectIndex((prev) =>
      prev === 0 ? subjectGroups.length - 1 : prev - 1
    );
  };
  return (
    <div >
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 md:py-16 flex flex-col md:flex-row">
        <div className="left w-full md:w-1/2 order-1 md:order-1 mt-4 md:mt-12">
          <div className="space-y-4 md:space-y-6">
            <h1 className="dark:text-[#9c9999] sm:block text-3xl md:text-5xl font-bold text-gray-900 leading-snug md:leading-tight ">
              Welcome to <br className="hidden md:block  " />
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ">
                Libri Vault
              </span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg dark:text-[#9a9898]">
              Explore books across all genres. Download instantly
              and start reading within seconds.
            </p>
            <div className="md:flex-row gap-3">
              <label className="flex items-center outline-none validator w-[60vw] md:w-[35vw] px-3 py-2 my-3 border border-[#c4c1c1] rounded-md">
                <svg className="h-[1em] opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  className="w-full bg-transparent outline-none focus:ring-0 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  required
                />
              </label>

              <div className="validator-hint hidden">Enter valid email address</div>
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
          <div className="relative md:-right-8 ">
            <div className=" bg-gradient-to-r from-blue-100 to-purple-100 h-64 md:h-96 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className=" relative w-full h-full group " >
                <img
                  src={subjectGroups[currentSubjectIndex].src}
                  alt={subjectGroups[currentSubjectIndex].name}
                  className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                  key={currentSubjectIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-8 right-8 z-10 flex items-center justify-center pl-20 w-full">
                <span
                  className={`px-4 py-2 rounded-full text-sm md:text-base inline-block 
            ${subjectGroups[currentSubjectIndex].color} 
            shadow-md transition-all duration-300`}
                >
                  {subjectGroups[currentSubjectIndex].name}
                </span>
              </div>

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
