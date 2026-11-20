// Web Audio Sound Synthesizers for Storybook & Cat Features (Zero external audio files needed!)

export function playMeowSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    
    // Cute high-pitched mew frequency slide: C6 -> G6 -> E6
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    // Ignore audio errors if restricted
  }
}

export function playPurrSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(24, now); // Purr frequency rumble
    lfoGain.gain.setValueAtTime(0.05, now);

    lfo.connect(lfoGain.gain);
    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + 0.8);
    osc.stop(now + 0.8);
  } catch (e) {}
}

export function playPaperTurnSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const bufferSize = ctx.sampleRate * 0.16;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.08);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.16);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {}
}
