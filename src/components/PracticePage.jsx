import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrambledText from "./ScrambledText";
import LevelModal from "./LevelModal"; // 👈 Import popup modal

export default function PracticePage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const domains = [
    "Science",
    "History",
    "Math",
    "Sports",
    "Technology",
    "Literature",
  ];

  const handleStartQuiz = (domain) => {
    setSelectedDomain(domain);
    setModalOpen(true);
  };

  const handleConfirmLevel = (level) => {
    setModalOpen(false);
    navigate(`/quiz/${selectedDomain.toLowerCase()}?level=${level}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
      <ScrambledText
        className="text-white text-3xl md:text-4xl font-bold mb-10"
        radius={100}
        duration={1.2}
        speed={0.5}
        scrambleChars={".:"}
      >
        Choose Your Domain
      </ScrambledText>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl">
        {domains.map((domain, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white shadow-lg border border-white/20 hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold mb-3">{domain}</h3>
            <p className="text-sm mb-6">Test your knowledge in {domain}.</p>
            <button
              onClick={() => handleStartQuiz(domain)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>

      <LevelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmLevel}
      />
    </div>
  );
}
