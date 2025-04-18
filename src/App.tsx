
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Games from './pages/Games';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';
import './App.css';

// Import game pages
import FartHeroLoveRun from './pages/games/FartHeroLoveRun';
import BuildYourBlissMachine from './pages/games/BuildYourBlissMachine';
import HowPerfectYouAre from './pages/games/HowPerfectYouAre';
import BlinkAndMiss from './pages/games/BlinkAndMiss';
import DontBlinkSpeedTrap from './pages/games/DontBlinkSpeedTrap';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/games" element={<Games />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        
        {/* Game Routes */}
        <Route path="/games/fart-hero-love-run" element={<FartHeroLoveRun />} />
        <Route path="/games/build-your-bliss-machine" element={<BuildYourBlissMachine />} />
        <Route path="/games/how-perfect-you-are" element={<HowPerfectYouAre />} />
        <Route path="/games/blink-and-miss" element={<BlinkAndMiss />} />
        <Route path="/games/dont-blink-speed-trap" element={<DontBlinkSpeedTrap />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
