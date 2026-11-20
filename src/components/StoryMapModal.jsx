import React from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';

export default function StoryMapModal({ isOpen, onClose, currentChapterId }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div 
        className="bg-blush-50 border-2 border-blush-300 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-blush-200 hover:bg-blush-300 text-rose-dark flex items-center justify-center transition-all text-sm font-bold"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="font-handwriting text-xl text-blush-500 font-bold block">
            Table of Contents ♡
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-rose-earth mt-1">
            Our {chapters.length} Chapters Map
          </h2>
          <p className="text-xs text-rose-earth/70 mt-1">
            Jump to any page in our storybook, or walk the path step by step.
          </p>
        </div>

        {/* Chapter List with Winding Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {chapters.map((chap) => {
            const isActive = currentChapterId === chap.id;
            return (
              <Link
                key={chap.id}
                to={`/chapter/${chap.id}`}
                onClick={onClose}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 group ${
                  isActive
                    ? 'bg-blush-200 border-blush-400 shadow-sm scale-[1.02]'
                    : 'bg-white hover:bg-blush-100/70 border-blush-200 hover:border-blush-300'
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blush-500">
                      Ch. {String(chap.id).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-ink-soft/40">•</span>
                    <span className="text-[11px] text-rose-earth/70 italic truncate">
                      {chap.subtitle}
                    </span>
                  </div>
                  <h4 className="font-headline font-semibold text-sm text-rose-dark group-hover:text-blush-500 transition-colors truncate">
                    {chap.title}
                  </h4>
                  <span className="font-handwriting text-xs text-rose-earth/80 block -mt-0.5">
                    {chap.catIcon} {chap.location}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Finale Link */}
        <div className="border-t border-blush-200 pt-4 text-center">
          <Link
            to="/sunset"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blush-400 to-rose-earth hover:from-blush-500 hover:to-rose-dark text-white font-semibold rounded-2xl shadow-md transition-all active:scale-98"
          >
            <span>🌅 Sunset Ending Scene — Two Cats on the Hill</span>
            <span>♡</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
