import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/navbar';
import HomeSection from './components/home_section';
import Simulation from './components/Simulation';
import Input from './components/Input';
import Results from './components/results';
/* import About from './components/About'; */

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/input" element={<Input />} />
        <Route path="/about" element={<HomeSection />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
