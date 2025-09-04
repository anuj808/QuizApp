import React, { useState } from "react";

export default function LevelModal({ isOpen, onClose, onConfirm }) {
  const [level, setLevel] = useState("easy");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Difficulty
        </h2>

        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={["easy", "medium", "hard"].indexOf(level)}
          onChange={(e) =>
            setLevel(["easy", "medium", "hard"][parseInt(e.target.value)])
          }
          className="w-full accent-black-500 cursor-pointer"
        />

        <div className="flex justify-between text-sm font-semibold mb-6 mt-2">
          <span className="text-green-400">Easy</span>
          <span className="text-yellow-400">Medium</span>
          <span className="text-red-400">Hard</span>
        </div>

        <p className="text-center font-semibold mb-6">
          Selected:{" "}
          <span
            className={`${
              level === "easy"
                ? "text-green-400"
                : level === "medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {level.toUpperCase()}
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(level)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition shadow-md"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
