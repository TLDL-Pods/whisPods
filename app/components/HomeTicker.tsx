'use client';

import { useEffect, useState } from 'react';

const sentences = [
  "Too Long Didn't Listen.",
  'Your Dewey Decibel System.',
  'Easily share topics and ideas.',
  'Find that one thing you swear you heard.',
  "We digest long form audio so you don't have to.",
  "Missed an ep? We've got you.",
];

export default function Ticker() {
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence(
        (prevSentence) => (prevSentence + 1) % sentences.length,
      );
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      <p className="ticker-text">{sentences[currentSentence]}</p>
      <style jsx>{`
        .ticker-container {
          position: relative;
          overflow: hidden;
          height: 1.5em; /* Adjust to fit the text */
        }
        .ticker-text {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: ticker-animation 5s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes ticker-animation {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10% {
            transform: translateY(0);
            opacity: 1;
          }
          90% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
