import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookCover from './components/BookCover';
import TeasCover from './components/TeasCover';
import VtneAltCover from './components/VtneAltCover';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-8 py-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                VTNE Cover (Classic)
              </Link>
              <Link
                to="/vtne-alt"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                VTNE Cover (Modern)
              </Link>
              <Link
                to="/teas"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                TEAS Cover
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex justify-center">
          <Routes>
            <Route path="/" element={<BookCover />} />
            <Route path="/vtne-alt" element={<VtneAltCover />} />
            <Route path="/teas" element={<TeasCover />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;