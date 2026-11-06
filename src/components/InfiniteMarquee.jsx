import React, { useEffect, useRef } from 'react';

/**
 * 2026 Kinetic Infinite Text Marquee
 * Features velocity-responsive scroll acceleration.
 */
export default function InfiniteMarquee({ items, direction = 'left', speed = 35 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const scrollSpeedMultiplier = useRef(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let animId;
    let offset = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Accelerate ticker on rapid scroll
      scrollSpeedMultiplier.current = 1 + Math.min(delta * 0.15, 6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Decay velocity multiplier back to 1
      scrollSpeedMultiplier.current += (1 - scrollSpeedMultiplier.current) * 0.05;

      const currentSpeed = (speed / 60) * scrollSpeedMultiplier.current;
      if (direction === 'left') {
        offset -= currentSpeed;
        if (offset <= -50) offset = 0;
      } else {
        offset += currentSpeed;
        if (offset >= 0) offset = -50;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offset}%, 0, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [direction, speed]);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: '#0c0c0c',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Edge Blur Masks */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(to right, #0c0c0c, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, #0c0c0c, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '40px',
          willChange: 'transform',
        }}
      >
        {repeated.map((text, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                letterSpacing: '0.04em',
                color: idx % 2 === 0 ? 'var(--text)' : 'var(--text-dim)',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent-glow)',
              }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

