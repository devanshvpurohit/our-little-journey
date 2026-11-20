import React, { useState, useEffect, useRef } from 'react';

// Play realistic soft paper turn sound using Web Audio API white noise / lowpass filter
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
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);

  const ghibliNotes = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50 // C6
  ];
  const melodySeq = [0, 2, 3, 4, 3, 2, 0, 1, 2, 4, 5, 4, 2, 3];

  const playNote = (freq) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch (e) {}
  };

  const toggleMelody = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      timerRef.current = setInterval(() => {
        const noteIndex = melodySeq[stepRef.current % melodySeq.length];
        playNote(ghibliNotes[noteIndex]);
        stepRef.current++;
      }, 650);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <button
      onClick={toggleMelody}
      title={isPlaying ? "Pause gentle melody" : "Play Ghibli music box melody"}
      className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm active:scale-95 border ${
        isPlaying
          ? 'bg-blush-400 border-blush-500 text-white shadow-md'
          : 'bg-white/95 border-blush-200/90 hover:bg-blush-100 text-rose-dark'
      }`}
    >
      <span className={`material-symbols-outlined text-[17px] ${isPlaying ? 'animate-spin text-white' : 'group-hover:rotate-12 transition-transform'}`}>
        {isPlaying ? 'graphic_eq' : 'music_note'}
      </span>
      <span className="hidden sm:inline font-sans">
        {isPlaying ? "Music Box Playing" : "Music Box"}
      </span>
    </button>
  );
}
