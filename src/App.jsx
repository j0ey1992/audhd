import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import NeurodiversityAwareness from './components/NeurodiversityAwareness/NeurodiversityAwareness';
import Features from './components/Features/Features';
import TradingCalculator from './components/TradingCalculator/TradingCalculator';
import Roadmap from './components/Roadmap/Roadmap';
import FAQ from './components/FAQ/FAQ';
import CronosPowered from './components/CronosPowered/CronosPowered';
import Footer from './components/Footer/Footer';
import MemeTestPopup from './components/MemeTestPopup/MemeTestPopup';
import HyperFocus from './components/HyperFocus/HyperFocus';
import CommunityReviews from './components/CommunityReviews/CommunityReviews';
import WhitePaper from './components/WhitePaper/WhitePaper';
import AI from './components/AI/AI';

function HomePage({ showMemeTest, setShowMemeTest }) {
  return (
    <>
      <Hero />
      <NeurodiversityAwareness />
      <div className="grid grid-cols-1 gap-16 py-20">
        <Features />
        <Roadmap />
        <TradingCalculator />
        <CommunityReviews />
        <FAQ />
        <CronosPowered />
      </div>
      
      {/* Floating Test Button */}
      <button
        onClick={() => setShowMemeTest(true)}
        className="fixed bottom-8 right-8 feature-button bg-accent text-surface z-50"
      >
        Take the Neurodivergence Test!
      </button>

      {showMemeTest && (
        <MemeTestPopup onClose={() => setShowMemeTest(false)} />
      )}
    </>
  );
}

function App() {
  const [showMemeTest, setShowMemeTest] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-primary">
        <Header />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage showMemeTest={showMemeTest} setShowMemeTest={setShowMemeTest} />} />
            <Route path="/whitepaper" element={<WhitePaper />} />
            <Route path="/ai" element={<AI />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
