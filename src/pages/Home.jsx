import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import { playPurrSound, playMeowSound, playPaperTurnSound } from '../utils/catAudio';
import { playBackgroundMusic } from '../components/AudioPlayer';

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const navigate = useNavigate();

  const handleCatPet = () => {
    playPurrSound();
    playMeowSound();
    playBackgroundMusic();
  };

  const handleOpenBook = (e) => {
    e.preventDefault();
    if (isOpening) return;
    setIsOpening(true);
    playPaperTurnSound();
    playBackgroundMusic();
    setTimeout(() => {
      navigate('/chapter/1');
    }, 600);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto flex flex-col items-center">
      
      {/* ========================================================= */}
      {/* 3D EMBOSSED HARDCOVER STORYBOOK WITH SLEEPING CAT */}
      {/* ========================================================= */}
      <div className="w-full max-w-md sm:max-w-lg book-perspective mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isOpening 
            ? { rotateY: -110, scale: 0.96, opacity: 0.8, x: -20 } 
            : { opacity: 1, y: 0, scale: 1, rotateY: 0, x: 0 }
          }
          transition={{ duration: 0.65, ease: [0.35, 0.05, 0.25, 1] }}
          style={{ transformOrigin: 'left center' }}
          className="relative w-full bg-[#b56576] p-4 sm:p-6 rounded-[2.2rem] storybook-shadow border-4 border-[#9c4d5e] transform transition-transform duration-500 preserve-3d"
        >
          {/* Golden Brass Corner Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#e8c482] rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#e8c482] rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#e8c482] rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#e8c482] rounded-br-xl pointer-events-none"></div>

          {/* Embossed Inner Cover Panel */}
          <div className="bg-[#874e58] border-2 border-[#e8c482]/60 rounded-[1.8rem] p-8 sm:p-12 text-center text-white relative shadow-inner overflow-hidden">
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

            {/* Sleeping Cartoon Cat on Book Cover */}
            <div className="relative inline-block mb-4">
              {/* Floating Zzz */}
              <motion.span
                animate={{ y: [-5, -25], opacity: [0, 1, 0], x: [0, 8] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                className="absolute -top-3 -right-2 text-xs font-handwriting font-bold text-[#e8c482]"
              >
                Zzz..
              </motion.span>
              
              <motion.button
                onClick={handleCatPet}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-white/10 border-2 border-[#e8c482]/70 flex items-center justify-center text-3xl shadow-md cursor-pointer group"
                title="Click to pet the sleeping storybook kitten! 🐾"
              >
                🐱💤
              </motion.button>
            </div>

            <span className="font-handwriting text-xl text-[#fcd5ce] tracking-widest block uppercase font-bold">
              Volume I • Collector's Edition
            </span>

            <h1 className="font-headline text-3xl sm:text-5xl font-bold text-[#fff0f3] my-3 leading-tight tracking-tight drop-shadow-md">
              Our Little Journey ♡
            </h1>

            <div className="w-24 h-0.5 bg-[#e8c482] mx-auto my-4 opacity-70"></div>

            <p className="font-headline italic text-sm sm:text-base text-[#ffd9de] max-w-sm mx-auto mb-8 leading-relaxed">
              “Ten hand-painted chapters of quiet laughter, starlight promises, and the endless adventures still waiting ahead.”
            </p>

            {/* Golden Clasp Button to Open Book */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleOpenBook}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e8c482] to-[#ffd166] text-[#512c33] font-headline font-bold text-base rounded-full shadow-lg hover:shadow-2xl transition-all border border-white/40 cursor-pointer"
              >
                <span>{isOpening ? 'Opening Storybook...' : 'Open Storybook ➔'}</span>
                <span>🐾</span>
              </button>
            </motion.div>

            <div className="mt-4 text-[11px] text-[#fcd5ce]/80 font-handwriting text-base">
              Turn to Chapter 1: The Beginning
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* VINTAGE STORYBOOK INDEX: 10 CHAPTER LEAFLETS */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl bg-white/90 border border-blush-200 rounded-3xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-blush-200">
          <div>
            <h3 className="font-headline text-2xl text-rose-earth font-bold flex items-center gap-2">
              <span>Storybook Contents</span>
              <span className="text-base animate-bounce">🐾</span>
            </h3>
            <p className="text-xs text-rose-earth/70 font-sans mt-0.5">
              {chapters.length} chapters bound together with love • Click any page to open
            </p>
          </div>
          <span className="font-handwriting text-xl text-blush-500 font-bold">
            {chapters.length} Separate Pages 📖
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chap, i) => (
            <motion.div
              key={chap.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/chapter/${chap.id}`}
                onClick={playPaperTurnSound}
                className="group bg-warm-parchment hover:bg-blush-100/60 border border-blush-200 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5 block"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-blush-200">
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[9px] text-white text-center font-bold">
                    CH {chap.id}
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blush-500 block">
                    {chap.subtitle}
                  </span>
                  <h4 className="font-headline font-semibold text-sm text-rose-dark group-hover:text-blush-500 transition-colors truncate">
                    {chap.id}. {chap.title}
                  </h4>
                  <span className="font-handwriting text-xs text-rose-earth/80 block mt-0.5">
                    {chap.catIcon} {chap.location}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-blush-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-rose-earth/70 font-handwriting text-base">
            Where does the winding trail lead? 🐾
          </span>
          <Link
            to="/sunset"
            onClick={playPaperTurnSound}
            className="text-xs font-semibold text-blush-500 hover:text-blush-600 flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Skip straight to Sunset Ending Scene 🌅</span>
            <span>➔</span>
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
