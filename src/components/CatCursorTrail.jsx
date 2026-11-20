import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CatCursorTrail() {
  const [paws, setPaws] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    let stepCount = 0;

    const handlePointerMove = (e) => {
      const now = Date.now();
      // Throttle paw creation so it looks like walking footsteps
      if (now - lastTime < 90) return;
      lastTime = now;
      stepCount++;

      const isRightPaw = stepCount % 2 === 0;
      const newPaw = {
        id: `${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        angle: isRightPaw ? 15 : -15,
        offset: isRightPaw ? 10 : -10,
        symbol: isRightPaw ? '🐾' : '🐾'
      };

      setPaws((prev) => [...prev.slice(-12), newPaw]);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0.75, scale: 0.6, rotate: paw.angle }}
            animate={{ opacity: [0.75, 0.4, 0], scale: [0.6, 1, 0.8], y: -8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: `${paw.x + paw.offset}px`,
              top: `${paw.y}px`,
              transform: 'translate(-50%, -50%)',
              color: '#f47e92',
              fontSize: '18px',
              userSelect: 'none'
            }}
          >
            {paw.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
