"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({
  text,
  delay = 0,
  stagger = 0.03,
  className = ''
}) => {
  const words = text.split(' ');

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default RevealText;
