import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import StoryMapModal from './components/StoryMapModal';
import CatCursorTrail from './components/CatCursorTrail';
import PlayfulCatCorner from './components/PlayfulCatCorner';
import Home from './pages/Home';
import Chapter1 from './pages/Chapter1';
import Chapter2 from './pages/Chapter2';
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';
import Chapter6 from './pages/Chapter6';
import Chapter7 from './pages/Chapter7';
import Chapter8 from './pages/Chapter8';
import Chapter9 from './pages/Chapter9';
import Chapter10 from './pages/Chapter10';
import Chapter11 from './pages/Chapter11';
import Chapter12 from './pages/Chapter12';
import Chapter13 from './pages/Chapter13';
import ChapterPage from './pages/ChapterPage';
import SunsetEnding from './pages/SunsetEnding';

function AppContent() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const location = useLocation();

  // Extract current chapter ID from pathname
  const match = location.pathname.match(/\/chapter\/(\d+)/);
  const currentChapterId = match ? parseInt(match[1], 10) : null;

  // Floating heart burst on click
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;

      const heart = document.createElement('div');
      heart.className = 'floating-heart select-none text-2xl';
      const symbols = ['💖', '💕', '🌸', '🐾', '✨', '🌷'];
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1400);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-blush-300 selection:text-rose-dark">
      {/* 1. Cat Pawprints Cursor Trail across whole site */}
      <CatCursorTrail />

      {/* 2. Interactive Cat Mascot & Navbar */}
      <Navbar 
        onOpenMap={() => setIsMapOpen(true)} 
        currentChapterId={currentChapterId} 
      />

      {/* 3. Main Route Container with Framer Motion AnimatePresence */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            
            {/* Separate Pages for each of the chapters */}
            <Route path="/chapter/1" element={<Chapter1 />} />
            <Route path="/chapter/2" element={<Chapter2 />} />
            <Route path="/chapter/3" element={<Chapter3 />} />
            <Route path="/chapter/4" element={<Chapter4 />} />
            <Route path="/chapter/5" element={<Chapter5 />} />
            <Route path="/chapter/6" element={<Chapter6 />} />
            <Route path="/chapter/7" element={<Chapter7 />} />
            <Route path="/chapter/8" element={<Chapter8 />} />
            <Route path="/chapter/9" element={<Chapter9 />} />
            <Route path="/chapter/10" element={<Chapter10 />} />
            <Route path="/chapter/11" element={<Chapter11 />} />
            <Route path="/chapter/12" element={<Chapter12 />} />
            <Route path="/chapter/13" element={<Chapter13 />} />

            {/* Dynamic fallback */}
            <Route path="/chapter/:chapterId" element={<ChapterPage />} />

            {/* The Sunset Ending Page */}
            <Route path="/sunset" element={<SunsetEnding />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 4. Playful Interactive Cat Paw peeking in bottom corner */}
      <PlayfulCatCorner />

      {/* 5. Story Map Modal Drawer */}
      <StoryMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentChapterId={currentChapterId}
      />

      {/* 6. Storybook Footer */}
      <footer className="py-6 text-center text-xs text-rose-earth/60 font-handwriting text-lg border-t border-blush-200/50 bg-[#fff5f5]/60">
        Our story still has pages left to write ♡ 🐾
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
