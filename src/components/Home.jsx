import { BrowserRouter as Router, Routes, Route , useNavigate} from "react-router-dom";
import ScrambledText from "./ScrambledText";
function Home() {
  const navigate = useNavigate(); // ✅ now inside Router

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6">
      {/* Scrambled Text */}
      <ScrambledText
        className="text-white text-lg md:text-xl max-w-2xl"
        radius={100}
        duration={1.2}
        speed={0.5}
        scrambleChars={".:"}
      >
        Welcome to our Quiz Game !!!
      </ScrambledText>

      {/* Go to Practice Button */}
      <button
        onClick={() => navigate("/practice")}
        className="bg-black text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-white-800 cursor-pointer"
      >
        Go to Practice
      </button>

     
    </div>
  );
}

export default Home;