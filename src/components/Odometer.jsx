import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/sound';

export default function Odometer({ value, targetNum, suffix = '+' }) {
  const [displayVal, setDisplayVal] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const duration = 1200; // ms
          const steps = 30;
          const increment = targetNum / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              current = targetNum;
              clearInterval(timer);
            }
            setDisplayVal(Math.floor(current));
            if (Math.random() > 0.6) {
              soundManager.playHover();
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNum]);

  return (
    <span ref={elementRef}>
      {hasAnimated.current ? (targetNum === 2.4 ? '2.4' : displayVal) : displayVal}
      {suffix}
    </span>
  );
}

