import React, { useEffect, useState, useRef } from 'react';

/**
 * 2026 Interactive Magnetic Custom Cursor
 * Features real-time spring physics, trailing aura, and interactive expansion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.spotlight-card') ||
        target.closest('.clickable') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth spring physics loop for trailing ring
    const render = () => {
      // Lerp ring towards mouse position (0.15 dampening factor)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Central Micro-Point */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(-100px, -100px, 0)',
          marginTop: '-3px',
          marginLeft: '-3px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          boxShadow: '0 0 10px var(--accent)',
        }}
      />

      {/* Trailing Spring Aura Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '54px' : '30px',
          height: isHovered ? '54px' : '30px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'var(--accent-subtle)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate3d(-100px, -100px, 0)',
          marginTop: isHovered ? '-27px' : '-15px',
          marginLeft: isHovered ? '-27px' : '-15px',
          opacity: isVisible ? 1 : 0,
          transition:
            'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), margin 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, background-color 0.2s ease',
          boxShadow: isHovered ? '0 0 24px var(--accent-glow)' : 'none',
        }}
      />
    </>
  );
}

