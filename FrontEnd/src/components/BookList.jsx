import React from 'react';

function BookList({ category, onBack }) {
  const books = {
    'Body, Mind & Spirit': ['The Power of Now', 'Think Like a Monk', 'The Untethered Soul'],
    Business: ['The Lean Startup', 'Zero to One', 'Rich Dad Poor Dad'],
    Computers: ['Clean Code', 'JavaScript: The Good Parts', 'The Pragmatic Programmer'],
    Health: ['The Obesity Code', 'How Not to Die', 'The Plant Paradox'],
    Romance: ['Pride and Prejudice', 'The Notebook', 'Me Before You'],
    Fantasy: ['Harry Potter', 'The Hobbit', 'The Name of the Wind']
  };

  return (
    <div className="mx-10">
      <button onClick={onBack} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Back</button>
      <h2 className="text-2xl mb-4">{category.name} Books</h2>
      <ul className="list-disc ml-6">
        {books[category.name] ? books[category.name].map((book, index) => (
          <li key={index}>{book}</li>
        )) : <li>No books available</li>}
      </ul>
    </div>
  );
}

export default BookList;
