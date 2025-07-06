import React from 'react';

const TestPage = () => {
  return (
    <div className="p-8 bg-red-500 text-white">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Tailwind Test
      </h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
        <p className="text-lg">If you can see this styled properly, Tailwind is working!</p>
      </div>
      <button className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full font-semibold transition-colors">
        Test Button
      </button>
    </div>
  );
};

export default TestPage;
