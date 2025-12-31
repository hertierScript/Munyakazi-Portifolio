"use client";

import { useState, useEffect } from "react";

const phrases = ["Full-Stack Developer", "Forex Mentor"];

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState(0); // 0: typing, 1: pausing, 2: deleting
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (phase === 0) {
          // Typing current phrase
          const currentPhrase = phrases[phraseIndex];
          if (charIndex < currentPhrase.length) {
            setDisplayText(currentPhrase.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setPhase(1);
          }
        } else if (phase === 1) {
          // Pausing
          setTimeout(() => setPhase(2), 2000);
        } else if (phase === 2) {
          // Deleting current phrase
          if (charIndex > 0) {
            setDisplayText(displayText.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Switch to next phrase
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
            setPhase(0);
            setCharIndex(0);
          }
        }
      },
      phase === 2 ? 100 : 150
    );

    return () => clearTimeout(timer);
  }, [phase, charIndex, displayText, phraseIndex]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
