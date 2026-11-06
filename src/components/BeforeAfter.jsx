import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, ArrowLeftRight, CheckCircle2, Layers } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => {
    soundManager.playClick();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section
      id="before-after"
      style={{
        padding: '100px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '44px' }}>
          <div className="section-tag">/ 03 // ARCHITECTURAL EVOLUTION</div>
          <h2 className="section-title">
            FROM <span style={{ color: 'var(--accent)' }}>SPECIFICATION</span> TO 60 FPS REALITY
          </h2>
          <p className="section-desc">
            Drag the interactive comparator slider below to inspect how low-fidelity structural
            design tokens transform into tactile, high-density production platforms.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="spotlight-card border-beam"
          style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            cursor: 'ew-resize',
            userSelect: 'none',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* 1. RIGHT SIDE: Production Interface (Full Background) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#121212',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              backgroundImage: `
                radial-gradient(circle at 70% 30%, var(--accent-subtle) 0%, transparent 50%),
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(9, 9, 9, 0.85)',
                border: '1px solid var(--accent)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                fontWeight: 700,
              }}
            >
              <CheckCircle2 size={13} />
              <span>02 // PRODUCTION INTERFACE (100% WCAG AA)</span>
            </div>

            {/* Simulated Live Polished App Card */}
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                backgroundColor: '#171717',
                border: '1px solid #333',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#888', marginLeft: '8px' }}>
                    FARMSENSE_AI_CORE // PRODUCTION
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>
                  GEMINI 1.5 VISION INFERENCE ACTIVE
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'Vision Model', val: 'Gemini 1.5' },
                  { label: 'Inference Speed', val: '< 0.8s' },
                  { label: 'Cloud Database', val: 'Supabase' },
                ].map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: '#101010', padding: '16px', borderRadius: '8px', border: '1px solid #282828' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#777' }}>{item.label}</div>
                    <div className="font-display" style={{ fontSize: '24px', color: '#fff', marginTop: '4px' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ width: '100%', height: '8px', backgroundColor: '#222', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', backgroundColor: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }} />
              </div>
            </div>
          </div>

          {/* 2. LEFT SIDE: Structural Blueprint Wireframe (Clipped Overlay) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${sliderPos}%`,
              backgroundColor: '#0a0e14',
              overflow: 'hidden',
              borderRight: '2px solid #fff',
              backgroundImage: `
                linear-gradient(to right, rgba(0, 240, 255, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 240, 255, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          >
            {/* Blueprint inner container matching full width */}
            <div
              style={{
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '1000px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(9, 9, 9, 0.85)',
                  border: '1px solid #00f0ff',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#00f0ff',
                  fontWeight: 700,
                }}
              >
                <Layers size={13} />
                <span>01 // SCHEMATIC TOKEN ARCHITECTURE</span>
              </div>

              {/* Wireframe Mockup */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  backgroundColor: 'transparent',
                  border: '1.5px dashed #00f0ff',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#00f0ff' }}>
                    [FRAME_SPEC: 680x280px // TOKEN_VAR: --grid-12]
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#00f0ff' }}>
                    [PADDING: 24PX]
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                  {['NODE_A_SECURITY', 'NODE_B_GATEWAY', 'NODE_C_STORAGE'].map((name, i) => (
                    <div key={i} style={{ border: '1px dashed rgba(0, 240, 255, 0.4)', padding: '16px', borderRadius: '4px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#00f0ff' }}>{name}</div>
                      <div style={{ width: '40px', height: '6px', backgroundColor: 'rgba(0, 240, 255, 0.3)', marginTop: '8px' }} />
                    </div>
                  ))}
                </div>

                <div style={{ width: '100%', height: '8px', border: '1px dashed #00f0ff' }} />
              </div>
            </div>
          </div>

          {/* 3. Drag Handle Handlebar */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '4px',
              marginLeft: '-2px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 16px rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'ew-resize',
            }}
          >
            {/* Round Knob */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 15px var(--accent)',
                cursor: 'ew-resize',
              }}
            >
              <ArrowLeftRight size={16} />
            </div>

            {/* Percentage Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '3px',
                border: '1px solid #333',
                whiteSpace: 'nowrap',
              }}
            >
              {sliderPos}% SPLIT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

