import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

export default function Quiz() {
  const { domain } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const key = domain.toLowerCase(); // normalize domain name
    if (questionsData[key]) {
      setQuestions(questionsData[key]);
    }
  }, [domain]);

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSelect = (option) => {
    setSelected({ ...selected, [current]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, q, idx) => {
      return selected[idx] === q.correct ? score + 1 : score;
    }, 0);
  };

  if (questions.length === 0) {
    return (
      <p className="text-white text-center mt-10">
        No questions found for {domain}
      </p>
    );
  }

  // ✅ Result screen
  if (submitted) {
    const score = calculateScore();
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 mt-25">
        <h2 className="text-3xl font-bold mb-4">{domain} Quiz Results</h2>
        <p className="text-xl mb-6">
          Your Score: {score} / {questions.length}
        </p>

        <div className="w-full max-w-2xl space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow border border-white/20"
            >
              <p className="font-semibold mb-2">
                Q{idx + 1}. {q.question}
              </p>
              <p>
                <span className="text-green-400">✔ Correct Answer:</span>{" "}
                {q.correct}
              </p>
              <p>
                <span className="text-yellow-400">✦ Your Answer:</span>{" "}
                {selected[idx] || "Not answered"}
              </p>
              {selected[idx] !== q.correct && (
                <p className="text-red-400">✘ Incorrect</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/practice")}
          className="mt-8 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Back to Practice
        </button>
      </div>
    );
  }

  // ✅ Quiz screen
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h2 className="text-2xl font-bold mb-6">
        {domain} Quiz – Question {current + 1} of {questions.length}
      </h2>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-xl w-full shadow-lg border border-white/20">
        <p className="text-lg mb-6">{questions[current].question}</p>

        <div className="grid grid-cols-1 gap-4">
          {questions[current].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 rounded border transition ${
                selected[current] === option
                  ? "bg-indigo-600 border-indigo-400"
                  : "bg-white/10 hover:bg-indigo-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 hover:bg-gray-800"
        >
          Previous
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
