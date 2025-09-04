import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white/100% backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="text-white text-2xl font-bold">
        QuizGame
      </div>

      {/* Navigation options on the right */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="text-white font-medium hover:text-indigo-200 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/practice"
          className="text-white font-medium hover:text-indigo-200 transition-colors"
        >
          Practice
        </Link>
      </div>
    </nav>
  );
}
