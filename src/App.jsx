import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Particles from "./components/Particles";
import PracticePage from "./components/PracticePage";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
function App() {
  return (
    <Router>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
        
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
      </div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/quiz/:domain" element={<Quiz />} /> 
      </Routes>
    </Router>
  );
}

export default App;
