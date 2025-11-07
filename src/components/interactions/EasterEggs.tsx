"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const EasterEggs: React.FC = () => {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showClickMessage, setShowClickMessage] = useState(false);

  useEffect(() => {
    // Konami code detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setShowKonamiMessage(true);
          setKonamiIndex(0);
          setTimeout(() => setShowKonamiMessage(false), 3000);

          // Trigger confetti or special effect
          console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'font-size: 24px; color: #FF6B6B; font-weight: bold;');
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    // Click counter
    const handleClick = () => {
      const newClicks = clicks + 1;
      setClicks(newClicks);

      if (newClicks === 10 || newClicks === 50 || newClicks === 100) {
        setShowClickMessage(true);
        setTimeout(() => setShowClickMessage(false), 3000);
      }
    };

    // Console art
    console.log('%c🚀 Welcome to AdvancingTechnology.dev!', 'font-size: 20px; color: #6366F1; font-weight: bold;');
    console.log('%cLooking for hidden features? Try the Konami code! ↑↑↓↓←→←→BA', 'color: #666;');
    console.log('%cOr just click around and see what happens...', 'color: #666;');

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [konamiIndex, clicks]);

  const getClickMessage = () => {
    if (clicks === 10) return 'Clicker Achievement Unlocked! 🏆';
    if (clicks === 50) return 'Super Clicker! Keep going! 🚀';
    if (clicks === 100) return 'Click Master! You are unstoppable! 👑';
    return '';
  };

  return (
    <>
      <AnimatePresence>
        {showKonamiMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
          >
            <div className="bg-gradient-purple-coral text-white px-8 py-6 rounded-2xl shadow-2xl border border-white/20 text-center">
              <div className="text-4xl mb-2">🎮</div>
              <div className="text-2xl font-bold">Secret Gamer!</div>
              <div className="text-sm opacity-90 mt-2">You found the Konami code!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClickMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 right-8 z-[9999] pointer-events-none"
          >
            <div className="bg-gradient-purple-coral text-white px-6 py-4 rounded-xl shadow-2xl border border-white/20">
              <div className="font-bold">{getClickMessage()}</div>
              <div className="text-sm opacity-90 mt-1">{clicks} clicks total</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;
