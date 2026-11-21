import React, { useState, useEffect } from 'react';

// Singleton global audio instance so BGM persists across pages without restarts
let globalAudio = null;
let hasUserInteracted = false;
let userManuallyPaused = false;

export function getGlobalAudio() {
  if (typeof window === 'undefined') return null;
  if (!globalAudio) {
    globalAudio = new Audio('/audio/bgm.mp3');
    globalAudio.loop = true;
    globalAudio.volume = 0.45;
    globalAudio.preload = 'auto';
  }
  return globalAudio;
}

export function playBackgroundMusic() {
  userManuallyPaused = false;
  const audio = getGlobalAudio();
  if (audio && audio.paused) {
    return audio.play().catch(() => {
      // Autoplay blocked by browser policy until interaction
    });
  }
}

export function pauseBackgroundMusic() {
  userManuallyPaused = true;
  const audio = getGlobalAudio();
  if (audio && !audio.paused) {
    audio.pause();
  }
}

// Retain realistic paper turn sound for page flips
export function playPaperTurnSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const bufferSize = ctx.sampleRate * 0.18; // 180ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.08);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.18);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    // Graceful fallback
  }
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Initial state sync
    setIsPlaying(!audio.paused);

    // Auto-start on first user interaction with the page if not manually paused
    const handleFirstInteraction = () => {
      if (!hasUserInteracted) {
        hasUserInteracted = true;
        if (!userManuallyPaused && audio.paused) {
          audio.play().catch(() => {});
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleBgm = () => {
    const audio = getGlobalAudio();
    if (!audio) return;

    if (isPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  };

  return (
    <button
      onClick={toggleBgm}
      title={isPlaying ? "Pause background music (Jo Tum Mere Ho)" : "Play background music (Jo Tum Mere Ho)"}
      className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm active:scale-95 border cursor-pointer ${
        isPlaying
          ? 'bg-blush-500 hover:bg-blush-600 border-blush-600 text-white shadow-md'
          : 'bg-white hover:bg-blush-50 border-blush-200/90 text-rose-dark hover:border-blush-300'
      }`}
    >
      {isPlaying ? (
        <>
          {/* Animated Equalizer Bars */}
          <div className="flex items-end space-x-0.5 h-3.5 my-auto">
            <span className="w-1 bg-white rounded-full animate-bounce h-2.5"></span>
            <span className="w-1 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-1 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0.3s' }}></span>
          </div>
          <span className="font-sans font-semibold tracking-tight text-[11px] sm:text-xs">
            Jo Tum Mere Ho ♫
          </span>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-[16px] text-blush-500 group-hover:scale-110 transition-transform">
            music_note
          </span>
          <span className="font-sans font-medium text-[11px] sm:text-xs">
            <span className="hidden sm:inline">Play </span>Jo Tum Mere Ho ♫
          </span>
        </>
      )}
    </button>
  );
}
