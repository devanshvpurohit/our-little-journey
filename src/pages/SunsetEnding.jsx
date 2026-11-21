import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playMeowSound, playPurrSound, playPaperTurnSound } from '../utils/catAudio';

export default function SunsetEnding() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playPaperTurnSound();
    playPurrSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#fcb3be', '#ffd9de', '#c9eea9', '#e8c482', '#f47e92']
    });
  }, []);

  const triggerFireworks = (e) => {
    playMeowSound();
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top) / window.innerHeight;

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { x, y },
      colors: ['#e0526e', '#f47e92', '#fcb3be', '#ffd9de', '#c9eea9', '#ffd166']
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Decorative trail ribbon leading into the sunset */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl animate-bounce inline-block">🐾</span>
        <h3 className="font-handwriting text-2xl sm:text-3xl text-rose-earth font-bold mt-1">
          And so the pink trail reaches the sunset hill...
        </h3>
        <p className="text-xs text-rose-earth/70 mt-1">
          Where twilight fireflies greet the evening and a special letter awaits ♡
        </p>
      </motion.div>

      {/* Illustrated Sunset Card Container with Framer Motion entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-blush-300 bg-gradient-to-b from-[#f9a4ad] via-[#f7c2b5] to-[#fce4d6] p-6 sm:p-12 text-center storybook-shadow"
      >
        {/* Floating Twinkling Stars */}
        <div className="absolute top-6 left-10 text-xl animate-twinkle">✨</div>
        <div className="absolute top-12 right-16 text-2xl animate-twinkle" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-24 left-1/3 text-lg animate-twinkle" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute top-10 right-1/3 text-xl animate-twinkle" style={{ animationDelay: '0.5s' }}>🌸</div>

        {/* Giant Glowing Pastel Sunset Sun */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-t from-[#ffd4a3] to-[#ffb6b9] mx-auto shadow-[0_0_90px_rgba(255,182,185,0.9)] flex items-center justify-center relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-white/25 rounded-full"></div>
        </motion.div>

        {/* The Two Little Cartoon Cats Sitting Together (Back view) */}
        <div className="relative w-64 h-36 mx-auto -mt-24 z-10 flex items-end justify-center">
          <div className="absolute bottom-0 w-80 h-14 bg-[#4e6d36] rounded-t-full shadow-inner"></div>

          <svg className="relative z-10 w-48 h-32" viewBox="0 0 200 120" fill="none">
            {/* Left Cat: White Kitty with Pink Bow */}
            <motion.g
              animate={{ rotate: [-2, 2, -2], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              style={{ transformOrigin: '75px 100px' }}
            >
              <ellipse cx="75" cy="85" rx="18" ry="24" fill="#FFFFFF" stroke="#874e58" strokeWidth="2" />
              <circle cx="75" cy="55" r="16" fill="#FFFFFF" stroke="#874e58" strokeWidth="2" />
              <polygon points="63,44 60,30 71,40" fill="#ffd9de" stroke="#874e58" strokeWidth="2" />
              <polygon points="87,44 90,30 79,40" fill="#ffd9de" stroke="#874e58" strokeWidth="2" />
              <circle cx="85" cy="50" r="4" fill="#e0526e" />
              <polygon points="85,50 93,45 93,55" fill="#e0526e" />
              <polygon points="85,50 77,45 77,55" fill="#e0526e" />
              <motion.path
                d="M 62 95 Q 50 90 55 75 Q 60 70 65 72"
                stroke="#874e58"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{ rotate: [-5, 5, -5] }}
                style={{ transformOrigin: '62px 95px' }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* Right Cat: Tuxedo / Grey Kitty with Red Collar */}
            <motion.g
              animate={{ rotate: [2, -2, 2], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
              style={{ transformOrigin: '115px 100px' }}
            >
              <ellipse cx="115" cy="85" rx="19" ry="24" fill="#3a3034" stroke="#874e58" strokeWidth="2" />
              <circle cx="115" cy="54" r="17" fill="#3a3034" stroke="#874e58" strokeWidth="2" />
              <polygon points="103,42 98,28 110,38" fill="#5c4a52" stroke="#874e58" strokeWidth="2" />
              <polygon points="127,42 132,28 120,38" fill="#5c4a52" stroke="#874e58" strokeWidth="2" />
              <path d="M 103 64 Q 115 67 127 64" stroke="#e0526e" strokeWidth="3.5" strokeLinecap="round" />
              <motion.path
                d="M 130 95 Q 145 88 138 74 Q 130 68 122 75"
                stroke="#3a3034"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                animate={{ rotate: [5, -5, 5] }}
                style={{ transformOrigin: '130px 95px' }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* Floating Sparkle / Star between them */}
            <motion.path
              d="M 95 24 L 97 31 L 104 33 L 97 35 L 95 42 L 93 35 L 86 33 L 93 31 Z"
              fill="#e8c482"
              animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ transformOrigin: '95px 33px' }}
            />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* HER EYES IMAGE: FEATURED AS IT IS IN FULL FORMAT         */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-20 max-w-lg mx-auto mt-6"
        >
          {/* Polaroid / Keepsake Frame Wrapper */}
          <div className="bg-white/95 p-3 sm:p-4 rounded-2xl shadow-xl border border-blush-200 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Washi tape on top */}
            <div className="washi-tape-pink w-28 h-6 absolute -top-3 left-1/2 -translate-x-1/2 z-30"></div>

            <div className="overflow-hidden rounded-xl bg-black/5 shadow-inner">
              <img
                src="/photos/rex-eyes.png"
                alt="Those beautiful eyes"
                className="w-full h-auto object-contain block mx-auto rounded-lg"
              />
            </div>

            <div className="pt-2 text-center">
              <span className="font-handwriting text-xl text-rose-dark font-bold block">
                The most beautiful eyes in my whole world ✨
              </span>
              <span className="text-[11px] text-rose-earth/70 font-sans">
                Every kindness and warmth reflected right here ✨
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* HEARTFELT LETTER: THANKING HER AS REX                    */}
        {/* ========================================================= */}
        <div className="relative z-10 max-w-xl mx-auto mt-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-blush-300 shadow-md text-left">
          <div className="flex items-center justify-between border-b border-blush-200 pb-3 mb-4">
            <span className="text-xs uppercase tracking-widest text-blush-500 font-bold">
              A Personal Letter to Dee ✨
            </span>
            <span className="font-handwriting text-sm text-rose-earth/70">
              Forever Chapter • For Dee
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl text-rose-earth font-bold mb-3 text-center">
            Thank You for Everything!
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-ink-soft/90 leading-relaxed font-sans">
            <p>
              Looking into your eyes, I see every kindness, every laugh, and everything you have ever done for me. From the very first day in that auditorium to every crazy memory we've shared, having you by my side has meant the absolute world to me.
            </p>
            <p>
              Thank you for being there for me when times were tough, for taking me to the hospital and offering your shoulder when I couldn't sleep in that auto, and for actually showing up to take care of me after that leg injury when I never believed anyone would. From ringing thali bells at the dhaba to failing escape rooms together, cooking Maggi with milk, and every single memory in between—thank you for everything, Dee.
            </p>
            <p>
              You didn't just walk into my story—you became the best, brightest, and most unforgettable part of it.
            </p>
          </div>

          {/* Rex's Signature */}
          <div className="mt-6 pt-4 border-t border-blush-200/80 text-right">
            <p className="font-headline italic text-sm text-rose-earth">
              Thank you for everything you've done for me, Dee.
            </p>
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-dark font-bold mt-2">
              By gay the spiderman REXY 🕷️
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-blush-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerFireworks}
              className="w-full sm:w-auto bg-blush-500 hover:bg-blush-400 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">celebration</span>
              <span>Send Sparkles & Fireworks ✨</span>
            </motion.button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/chapter/1"
                onClick={playPaperTurnSound}
                className="w-full sm:w-auto bg-white hover:bg-blush-100 text-rose-earth border border-blush-300 px-5 py-3 rounded-full text-sm font-semibold shadow-sm block text-center"
              >
                Read from Chapter 1 Again ↺
              </Link>
            </motion.div>
          </div>
        </div>

      </motion.div>

      {/* Return link to Chapter 12 */}
      <div className="text-center mt-8">
        <Link
          to="/chapter/12"
          onClick={playPaperTurnSound}
          className="text-xs text-rose-earth/70 hover:text-rose-earth font-medium underline underline-offset-4"
        >
          ← Return to Chapter 12: Pieces of Her
        </Link>
      </div>

    </div>
  );
}
