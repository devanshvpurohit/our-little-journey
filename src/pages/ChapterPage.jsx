import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../data/chapters';
import { playPaperTurnSound, playMeowSound } from '../utils/catAudio';
import WindingPathTransition from '../components/WindingPathTransition';

// Reusable Left Page component (Polaroid & Postmark)
function LeftPageContent({ chapter, onImageZoom }) {
  if (!chapter) return <div className="w-full h-full bg-[#fdfaf5]"></div>;

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between relative book-edge-stack paper-texture select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1.5 opacity-80">
          <span className="text-lg">🌸</span>
          <span className="font-handwriting text-sm text-rose-earth tracking-wide">
            Memory #{chapter.id} • Storybook Leaf
          </span>
        </div>
        <div className="border border-dashed border-rose-earth/60 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-rose-earth/70 tracking-widest rotate-6">
          VALENTINE AIRMAIL • NO. {chapter.id}
        </div>
      </div>

      {/* Polaroid Photo with Washi Tape */}
      <div className="my-auto flex justify-center py-2">
        <motion.div
          whileHover={{ scale: 1.03, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative w-full max-w-sm bg-white p-4 pb-3 rounded-2xl polaroid-card ${chapter.rotation} transform`}
        >
          {/* Washi Tape Accent */}
          <div className={`absolute -top-3 right-8 w-24 h-7 ${chapter.tapeColor} z-20`}></div>
          <div className="absolute -top-3 left-6 w-5 h-9 border-2 border-[#d4af37] rounded-full z-20 opacity-80 shadow-sm pointer-events-none"></div>

          <div className="absolute top-6 left-6 z-20 bg-blush-50/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-blush-200 text-rose-earth font-bold text-[10px] tracking-wider uppercase shadow-sm">
            Chapter {String(chapter.id).padStart(2, '0')}
          </div>

          <div 
            className="overflow-hidden rounded-xl h-64 sm:h-72 relative group cursor-pointer"
            onClick={() => onImageZoom && onImageZoom(chapter)}
            title="Click to enlarge memory"
          >
            <img
              src={chapter.image}
              alt={chapter.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">zoom_in</span> Click to enlarge
              </span>
            </div>
          </div>

          <div className="pt-3 pb-1 text-center">
            <span className="font-handwriting text-2xl text-rose-dark font-bold block leading-tight">
              {chapter.caption}
            </span>
            <p className="text-[11px] text-rose-earth/70 font-sans mt-0.5">
              {chapter.subcaption}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs font-handwriting text-rose-earth/60 pt-4 border-t border-[#f0e4d8]">
        <span>~ {chapter.location} ~</span>
        <span className="text-sm font-semibold">Page {chapter.id * 2 - 1}</span>
      </div>
    </div>
  );
}

// Reusable Right Page component (Prose & Walking Cat)
function RightPageContent({ chapter, nextChapter, prevChapter, onTurnNext, onTurnPrev }) {
  if (!chapter) return <div className="w-full h-full bg-[#fdfaf5]"></div>;

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between relative book-edge-stack-right paper-texture">
      <div>
        <div className="inline-flex items-center gap-2 bg-blush-200/50 px-3 py-1 rounded-full mb-3 text-rose-dark font-handwriting text-base">
          <span>{chapter.themeEmoji}</span>
          <span className="font-bold">{chapter.subtitle}</span>
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl text-rose-earth font-bold mb-3 tracking-tight">
          {chapter.title}
        </h2>

        <blockquote className="font-headline italic text-sm sm:text-base text-rose-dark/90 bg-[#fff5f5] p-4 rounded-2xl border-l-4 border-blush-400 mb-4 shadow-sm leading-relaxed relative">
          <span className="font-headline text-3xl text-blush-300 absolute -top-2 left-2">“</span>
          <p className="pl-3 relative z-10">{chapter.quote}</p>
        </blockquote>

        <div className="text-sm sm:text-base text-ink-soft/90 leading-relaxed font-sans mb-4">
          <p className="first-letter:font-headline first-letter:text-4xl first-letter:font-bold first-letter:text-blush-500 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            {chapter.story}
          </p>
        </div>
      </div>

      {/* Bottom Winding Path with Animated Walking Cat */}
      <WindingPathTransition
        currentChapter={chapter}
        nextChapter={nextChapter}
        prevChapter={prevChapter}
        onTurnNext={onTurnNext}
        onTurnPrev={onTurnPrev}
      />

      <div className="flex items-center justify-between text-xs font-handwriting text-rose-earth/60 pt-2 border-t border-[#f0e4d8]">
        <span className="text-xs">🐾 Our Little Journey</span>
        <span className="text-sm font-semibold">Page {chapter.id * 2}</span>
      </div>
    </div>
  );
}

export default function ChapterPage({ specificId }) {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const id = specificId || parseInt(chapterId, 10);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedChapter, setZoomedChapter] = useState(null);

  // 3D Page Turn State
  const [isFlipping, setIsFlipping] = useState(null); // 'forward' | 'backward' | null
  const flipTimeoutRef = useRef(null);

  const currentChapter = chapters.find((c) => c.id === id);
  const currentIndex = chapters.findIndex((c) => c.id === id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  // Handle forward page flip with 3D animation and sound
  const handleTurnNext = () => {
    if (isFlipping) return;
    playPaperTurnSound();
    setIsFlipping('forward');

    flipTimeoutRef.current = setTimeout(() => {
      if (nextChapter) {
        navigate(`/chapter/${nextChapter.id}`);
      } else {
        navigate('/sunset');
      }
      setIsFlipping(null);
    }, 600);
  };

  // Handle backward page flip with 3D animation and sound
  const handleTurnPrev = () => {
    if (isFlipping) return;
    playPaperTurnSound();
    setIsFlipping('backward');

    flipTimeoutRef.current = setTimeout(() => {
      if (prevChapter) {
        navigate(`/chapter/${prevChapter.id}`);
      } else {
        navigate('/');
      }
      setIsFlipping(null);
    }, 600);
  };

  // Keyboard arrow keys for turning pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleTurnNext();
      } else if (e.key === 'ArrowLeft') {
        handleTurnPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChapter, prevChapter, isFlipping]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  const openZoom = (chap) => {
    setZoomedChapter(chap);
    setIsZoomed(true);
  };

  // Swipe / Drag handling
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -80) {
      handleTurnNext();
    } else if (info.offset.x > 80) {
      handleTurnPrev();
    }
  };

  if (!currentChapter) {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-headline text-2xl text-rose-earth font-bold">Page Lost in the Wind</h2>
        <Link to="/" className="inline-block mt-4 px-5 py-2 bg-blush-500 text-white rounded-full text-xs font-semibold">
          Return to Storybook Cover
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col items-center justify-center">
      
      {/* Whimsical Header Over Book */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between w-full max-w-5xl mb-4 px-2"
      >
        <div className="flex items-center gap-2 text-xs text-rose-earth/80">
          <span className="font-handwriting text-lg text-rose-dark font-bold">
            Chapter {String(currentChapter.id).padStart(2, '0')} of {chapters.length}
          </span>
          <span>•</span>
          <span className="italic">{currentChapter.location}</span>
        </div>

        {/* Quick Flip Buttons in Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTurnPrev}
            disabled={isFlipping !== null}
            className="text-xs font-handwriting text-base text-rose-earth hover:text-blush-500 flex items-center gap-1 bg-white/90 px-3.5 py-1.5 rounded-full border border-blush-200 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
            title="Turn to previous page"
          >
            <span>{prevChapter ? '← Prev Page' : '← Cover'}</span>
          </button>

          <button
            onClick={handleTurnNext}
            disabled={isFlipping !== null}
            className="text-xs font-handwriting text-base text-white bg-blush-500 hover:bg-blush-400 flex items-center gap-1 px-4 py-1.5 rounded-full shadow-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            title="Turn to next page"
          >
            <span>{nextChapter ? 'Next Page →' : 'Sunset Finale 🌅 →'}</span>
          </button>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* 3D OPEN STORYBOOK SPREAD WITH REALISTIC PAGE TURN EFFECT        */}
      {/* ================================================================ */}
      <div className="relative w-full max-w-5xl book-perspective">
        
        {/* Floating Side Arrow Navigation for Tactile Page Turns */}
        <motion.button
          whileHover={{ scale: 1.15, x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTurnPrev}
          disabled={isFlipping !== null}
          className="hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-blush-300 text-rose-earth shadow-lg items-center justify-center cursor-pointer hover:bg-blush-50 hover:text-blush-500 transition-colors"
          title="Turn page backwards (← Left Arrow)"
        >
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios_new</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15, x: 4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTurnNext}
          disabled={isFlipping !== null}
          className="hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-blush-300 text-rose-earth shadow-lg items-center justify-center cursor-pointer hover:bg-blush-50 hover:text-blush-500 transition-colors"
          title="Turn page forwards (→ Right Arrow)"
        >
          <span className="material-symbols-outlined text-2xl font-bold">arrow_forward_ios</span>
        </motion.button>

        {/* Outer Hardcover Binder */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative w-full bg-[#f0d8dc] p-3 sm:p-5 rounded-[2rem] storybook-shadow border-4 border-[#e5c4cb] cursor-grab active:cursor-grabbing"
        >
          {/* Dangling Silk Ribbon Bookmark from Central Spine */}
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-20 silk-ribbon z-40 flex flex-col items-center pt-2 text-white shadow-md pointer-events-none"
          >
            <span className="text-[10px] font-bold tracking-tighter">CH</span>
            <span className="text-xs font-bold -mt-0.5">{String(currentChapter.id).padStart(2, '0')}</span>
            <span className="text-xs mt-1">🐾</span>
          </motion.div>

          {/* ============================================================ */}
          {/* DUAL PAGE SPREAD CONTAINER (PRESERVE 3D)                     */}
          {/* ============================================================ */}
          <div className="relative bg-[#fdfaf5] rounded-[1.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[580px] border border-[#e8d8cb] shadow-inner preserve-3d">
            
            {/* Left Interactive Dog-Ear Corner (Turn backwards) */}
            <div 
              onClick={handleTurnPrev}
              className="dog-ear-curl dog-ear-curl-left hidden lg:block"
              title="Click corner to turn backwards"
            >
              <div className="dog-ear-triangle"></div>
              <span className="absolute top-1.5 left-1.5 text-[9px] font-bold text-rose-earth/80">
                ◀
              </span>
            </div>

            {/* Right Interactive Dog-Ear Corner (Turn forwards) */}
            <div 
              onClick={handleTurnNext}
              className="dog-ear-curl dog-ear-curl-right hidden lg:block"
              title="Click corner to turn forward"
            >
              <div className="dog-ear-triangle"></div>
              <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-rose-earth/80">
                ▶
              </span>
            </div>

            {/* Base Left Page */}
            <div className="w-full lg:w-1/2 relative border-b lg:border-b-0 lg:border-r border-[#ebdcd0]">
              <LeftPageContent 
                chapter={isFlipping === 'backward' && prevChapter ? prevChapter : currentChapter} 
                onImageZoom={openZoom} 
              />
            </div>

            {/* Base Right Page */}
            <div className="w-full lg:w-1/2 relative">
              <RightPageContent
                chapter={isFlipping === 'forward' && nextChapter ? nextChapter : currentChapter}
                nextChapter={isFlipping === 'forward' && nextChapter ? (chapters.find(c => c.id === nextChapter.id + 1) || null) : nextChapter}
                prevChapter={isFlipping === 'forward' && nextChapter ? currentChapter : prevChapter}
                onTurnNext={handleTurnNext}
                onTurnPrev={handleTurnPrev}
              />
            </div>

            {/* Central Book Spine Shadow & Stitch Binding */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 book-spine-shadow z-30 pointer-events-none"></div>

            {/* ========================================================== */}
            {/* 3D TURNING PAGE LEAF: FORWARD FLIP (RIGHT TO LEFT)        */}
            {/* ========================================================== */}
            {isFlipping === 'forward' && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.6, ease: [0.35, 0.05, 0.25, 1] }}
                style={{
                  transformOrigin: 'left center',
                }}
                className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 preserve-3d z-35 turning-page-cast-shadow"
              >
                {/* Front side of flipping leaf: Current Right Page */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#fdfaf5] overflow-hidden rounded-r-[1.5rem] border-r border-[#ebdcd0]"
                  style={{ transform: 'rotateY(0deg)' }}
                >
                  <RightPageContent
                    chapter={currentChapter}
                    nextChapter={nextChapter}
                    prevChapter={prevChapter}
                    onTurnNext={() => {}}
                    onTurnPrev={() => {}}
                  />
                  {/* Dynamic Shading Gradient overlay as page lifts */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 page-curl-forward-shadow pointer-events-none"
                  />
                </div>

                {/* Back side of flipping leaf: Next Chapter Left Page (Polaroid) */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#fdfaf5] overflow-hidden rounded-l-[1.5rem] border-l border-[#ebdcd0]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <LeftPageContent 
                    chapter={nextChapter || currentChapter} 
                    onImageZoom={openZoom} 
                  />
                  {/* Landing Shading Gradient */}
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="absolute inset-0 page-curl-backward-shadow pointer-events-none"
                  />
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* 3D TURNING PAGE LEAF: BACKWARD FLIP (LEFT TO RIGHT)       */}
            {/* ========================================================== */}
            {isFlipping === 'backward' && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: [0.35, 0.05, 0.25, 1] }}
                style={{
                  transformOrigin: 'right center',
                }}
                className="hidden lg:block absolute top-0 left-0 bottom-0 w-1/2 preserve-3d z-35 turning-page-cast-shadow-left"
              >
                {/* Front side of flipping leaf: Current Left Page */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#fdfaf5] overflow-hidden rounded-l-[1.5rem] border-l border-[#ebdcd0]"
                  style={{ transform: 'rotateY(0deg)' }}
                >
                  <LeftPageContent 
                    chapter={currentChapter} 
                    onImageZoom={openZoom} 
                  />
                  {/* Dynamic Shading Gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 page-curl-backward-shadow pointer-events-none"
                  />
                </div>

                {/* Back side of flipping leaf: Prev Chapter Right Page */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#fdfaf5] overflow-hidden rounded-r-[1.5rem] border-r border-[#ebdcd0]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <RightPageContent
                    chapter={prevChapter || currentChapter}
                    nextChapter={currentChapter}
                    prevChapter={chapters.find(c => c.id === (prevChapter?.id || 1) - 1) || null}
                    onTurnNext={() => {}}
                    onTurnPrev={() => {}}
                  />
                  {/* Landing Shading Gradient */}
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="absolute inset-0 page-curl-forward-shadow pointer-events-none"
                  />
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Lightbox Zoom Modal for Polaroid Memory */}
      <AnimatePresence>
        {isZoomed && zoomedChapter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80 sm:h-96 w-full bg-black">
                <img src={zoomedChapter.image} alt={zoomedChapter.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-blush-500 font-bold">Chapter {zoomedChapter.id}</span>
                <h3 className="font-headline text-2xl text-rose-earth font-bold mt-1">{zoomedChapter.title}</h3>
                <p className="font-handwriting text-xl text-rose-dark mt-2">{zoomedChapter.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
