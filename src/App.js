import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generate from './components/Generate';
import About from './components/About';
import GenerateAudio from './components/GenerateAudio';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generateaudio" element={<GenerateAudio/>} />

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
