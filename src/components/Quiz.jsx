import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import questionsData from "../data/questions.json";

export default function Quiz() {
  const { domain } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level") || "easy"; 

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [locked, setLocked] = useState({});
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const key = domain.toLowerCase();
    if (questionsData[key] && questionsData[key][level]) {
      setQuestions(questionsData[key][level]);
    }
  }, [domain, level]);

  useEffect(() => {
    if (submitted || timeUp) return;

    if (timeLeft === 0) {
      setLocked((prev) => ({ ...prev, [current]: true }));
      setTimeUp(true);

      setTimeout(() => {
        if (current < questions.length - 1) {
          setCurrent((prev) => prev + 1);
          setTimeLeft(15);
          setTimeUp(false);
        } else {
          handleSubmit();
        }
      }, 2000);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted, current, questions.length, timeUp]);

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(15);
      setTimeUp(false);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setTimeLeft(15);
      setTimeUp(false);
    }
  };

  const handleSelect = (option) => {
    if (locked[current]) return;
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
        No {level} questions found for {domain}
      </p>
    );
  }

  // ✅ Result screen
  if (submitted) {
    const score = calculateScore();
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 mt-25">
        <h2 className="text-3xl font-bold mb-4">
          {domain} Quiz Results ({level})
        </h2>
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
        {domain} Quiz ({level}) – Question {current + 1} of {questions.length}
      </h2>

      {/* Countdown timer / Time up message */}
      <div className="mb-4 text-xl font-bold">
        {timeUp ? (
          <span className="text-red-500">⏳ Time’s Up!</span>
        ) : (
          <span className="text-green-400">⏱ Time Left: {timeLeft}s</span>
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-xl w-full shadow-lg border border-white/20">
        <p className="text-lg mb-6">{questions[current].question}</p>

        <div className="grid grid-cols-1 gap-4">
          {questions[current].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={locked[current]}
              className={`px-4 py-2 rounded border transition ${
                selected[current] === option
                  ? "bg-indigo-600 border-indigo-400"
                  : "bg-white/10 hover:bg-indigo-700"
              } ${locked[current] ? "opacity-50 cursor-not-allowed" : ""}`}
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
