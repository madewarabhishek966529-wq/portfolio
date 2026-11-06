import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, RotateCcw, X, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

/**
 * Swarm Rebuild Standalone Motion Feature
 * Inspired by Joel Califa's Swarm & Swarm Rebuild Chrome Extension
 * Re-imagines the portfolio as a live collaborative multiplayer canvas
 * where simulated designer cursors live-assemble the website.
 */

const SWARM_AGENTS = [
  { id: 'abhishek', name: 'Abhishek (Lead)', color: '#e32b3c', targetX: 25, targetY: 30 },
  { id: 'elena', name: 'Elena (UX System)', color: '#00f0ff', targetX: 75, targetY: 28 },
  { id: 'marcus', name: 'Marcus (Motion)', color: '#00ff88', targetX: 50, targetY: 45 },
  { id: 'sarah', name: 'Sarah (Visuals)', color: '#b87cff', targetX: 20, targetY: 65 },
  { id: 'chen', name: 'Chen (Creative Code)', color: '#ffaa00', targetX: 70, targetY: 70 },
  { id: 'alex', name: 'Alex (3D Shader)', color: '#ff477e', targetX: 45, targetY: 82 },
];

export default function SwarmRebuild({ onClose }) {
  const [speed, setSpeed] = useState(1); // 1x, 2x, 3x
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState('wireframing'); // wireframing, typography, assembling, complete
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  
  // Real-time animated cursor coordinates
  const [cursorPositions, setCursorPositions] = useState(() =>
    SWARM_AGENTS.map((agent, i) => ({
      x: 10 + (i * 15) % 80,
      y: 10 + (i * 12) % 80,
      targetX: agent.targetX,
      targetY: agent.targetY,
      label: agent.name,
      color: agent.color,
      isDragging: false,
      boxWidth: 180 + (i * 40),
      boxHeight: 90 + (i * 30),
      typingText: '',
    }))
  );

  const requestRef = useRef();
  const startTimeRef = useRef(Date.now());
  const tickCountRef = useRef(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Main Swarm Animation Loop
  useEffect(() => {
    let currentProgress = 0;

    const animate = () => {
      if (!isPaused) {
        currentProgress += 0.25 * speed;
        if (currentProgress > 100) {
          currentProgress = 100;
        }
        setProgress(Math.floor(currentProgress));

        // Sound drafting ticks at rhythmic intervals
        tickCountRef.current += 1;
        if (tickCountRef.current % Math.floor(18 / speed) === 0 && currentProgress < 95) {
          soundManager.playSwarmDraft();
        }

        // Determine current phase
        if (currentProgress < 30) {
          setActiveStage('wireframing');
        } else if (currentProgress < 70) {
          setActiveStage('typography');
        } else if (currentProgress < 98) {
          setActiveStage('assembling');
        } else {
          if (activeStage !== 'complete') {
            soundManager.playSuccess();
            setActiveStage('complete');
          }
        }

        // Update flocking cursor positions with harmonic wandering
        const time = (Date.now() - startTimeRef.current) * 0.002 * speed;
        setCursorPositions((prev) =>
          prev.map((cursor, idx) => {
            const freq = 0.8 + idx * 0.3;
            const wanderX = Math.sin(time * freq + idx) * (18 / (currentProgress > 80 ? 3 : 1));
            const wanderY = Math.cos(time * freq * 0.9 + idx) * (14 / (currentProgress > 80 ? 3 : 1));

            const posX = Math.max(5, Math.min(92, cursor.targetX + wanderX));
            const posY = Math.max(8, Math.min(88, cursor.targetY + wanderY));

            return {
              ...cursor,
              x: posX,
              y: posY,
              isDragging: currentProgress > 15 && currentProgress < 75 && idx % 2 === 0,
              boxWidth: Math.round(180 + Math.sin(time + idx) * 40),
              boxHeight: Math.round(100 + Math.cos(time + idx) * 30),
            };
          })
        );
      }

      if (currentProgress < 100 || isPaused) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, speed, activeStage]);

  const handleRestart = () => {
    soundManager.playClick();
    setProgress(0);
    setActiveStage('wireframing');
    startTimeRef.current = Date.now();
  };

  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(9, 9, 9, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* 1. Blueprint Grid & Coordinate System Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(227, 43, 60, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(227, 43, 60, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.8,
        }}
      />

      {/* Crosshair Corner Marks */}
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        + 00,00 // CANVAS ROOT
      </div>
      <div style={{ position: 'absolute', top: 20, right: 20, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        + 1920,00 // VIEWPORT MAX
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        + 00,1080 // ARCHITECTURE
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 20, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        + 1920,1080 // ENGINE READY
      </div>

      {/* 2. Alignment Guides (Simulated Snap Rulers) */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(0, 240, 255, 0.35)',
          borderTop: '1px dashed rgba(0, 240, 255, 0.6)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '40px',
            top: '-18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: '#00f0ff',
            backgroundColor: '#090909',
            padding: '2px 6px',
            borderRadius: '2px',
          }}
        >
          Y: 345px // HERO HORIZON
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '1px',
          backgroundColor: 'rgba(227, 43, 60, 0.35)',
          borderLeft: '1px dashed rgba(227, 43, 60, 0.6)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '80px',
            left: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--accent)',
            backgroundColor: '#090909',
            padding: '2px 6px',
            borderRadius: '2px',
          }}
        >
          X: CENTER SYMMETRY
        </span>
      </div>

      {/* 3. Rebuilt Content Canvas Elements dynamically drawing */}
      <div
        style={{
          position: 'absolute',
          inset: '80px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Rebuilding Hero Typography */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px',
            transition: 'opacity 0.4s ease',
            opacity: progress > 10 ? 1 : 0.2,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {progress < 40 ? 'DRAFTING SPECIFICATION...' : 'SENIOR PRODUCT DESIGNER & CREATIVE DEVELOPER'}
          </div>

          <div
            className="font-display"
            style={{
              fontSize: 'clamp(44px, 8vw, 110px)',
              color: progress > 50 ? '#ffffff' : '#333333',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              transition: 'color 0.5s ease',
            }}
          >
            ABHISHEK <span style={{ color: progress > 70 ? 'var(--accent)' : '#444' }}>MADEWAR</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(12px, 1.5vw, 16px)',
              color: progress > 45 ? 'var(--text-muted)' : 'transparent',
              marginTop: '16px',
              transition: 'color 0.4s ease',
            }}
          >
            {progress > 55
              ? 'ENTERPRISE SYSTEMS • WEB3 ARCHITECTURE • HIGH-MOTION INTERFACES'
              : 'COMPOSING LAYOUT TOKENS...'}
          </div>
        </div>

        {/* Dynamic Wireframe Mockup Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
            gap: '24px',
            width: '100%',
            maxWidth: '920px',
            marginTop: '20px',
          }}
        >
          {['SkyMavis Platform', 'OPSWAT Cyber Suite', 'Firekamp Experience'].map((title, i) => (
            <div
              key={i}
              style={{
                height: '180px',
                border: progress > 30 + i * 15 ? '1px solid var(--accent)' : '1px dashed #333',
                backgroundColor: progress > 50 + i * 15 ? 'rgba(19, 19, 19, 0.9)' : 'rgba(255, 255, 255, 0.01)',
                borderRadius: '6px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: progress > 25 + i * 15 ? 'scale(1)' : 'scale(0.92)',
                opacity: progress > 20 + i * 10 ? 1 : 0.3,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>
                  CARD_NODE_0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: progress > 60 + i * 10 ? 'var(--success)' : '#555',
                  }}
                >
                  {progress > 60 + i * 10 ? 'LOCKED' : 'SNAPPING'}
                </span>
              </div>

              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '18px',
                    color: progress > 55 + i * 10 ? '#fff' : '#444',
                    textTransform: 'uppercase',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    width: progress > 70 + i * 10 ? '100%' : '30%',
                    height: '3px',
                    backgroundColor: 'var(--accent)',
                    marginTop: '8px',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Multiplayer Cursors Swarm */}
      {cursorPositions.map((cursor, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transform: 'translate(-2px, -2px)',
            pointerEvents: 'none',
            zIndex: 100,
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
          }}
        >
          {/* Cursor Arrow SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              filter: `drop-shadow(0 2px 8px ${cursor.color}88)`,
            }}
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill={cursor.color}
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* User Name Tag Badge */}
          <div
            style={{
              marginLeft: '14px',
              marginTop: '-4px',
              backgroundColor: cursor.color,
              color: '#000000',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{cursor.label}</span>
          </div>

          {/* Dragging Selection Bounding Box with Live Dimension Badge */}
          {cursor.isDragging && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: `${cursor.boxWidth}px`,
                height: `${cursor.boxHeight}px`,
                border: `1px solid ${cursor.color}`,
                backgroundColor: `${cursor.color}11`,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '-18px',
                  right: 0,
                  backgroundColor: '#000',
                  color: cursor.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  padding: '1px 5px',
                  borderRadius: '2px',
                  border: `1px solid ${cursor.color}66`,
                }}
              >
                {cursor.boxWidth} × {cursor.boxHeight}px
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 5. Swarm Control HUD Bar at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#121212',
          border: '1px solid #2d2d2d',
          borderRadius: 'var(--radius-full)',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
          zIndex: 200,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Stage Indicator & Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: activeStage === 'complete' ? 'var(--success)' : 'var(--accent)',
              boxShadow: `0 0 10px ${activeStage === 'complete' ? 'var(--success)' : 'var(--accent)'}`,
              animation: 'pulse 1.5s infinite',
            }}
          />

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
              {activeStage === 'wireframing' && 'PHASE 1: BLUEPRINT WIREFRAMING'}
              {activeStage === 'typography' && 'PHASE 2: TYPOGRAPHY REBUILD'}
              {activeStage === 'assembling' && 'PHASE 3: COMPONENT ASSEMBLY'}
              {activeStage === 'complete' && '✦ REBUILD COMPLETE'}
            </span>{' '}
            <span style={{ color: '#666' }}>({progress}%)</span>
          </div>
        </div>

        {/* Mini Progress Track */}
        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#222',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'var(--accent)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsPaused(!isPaused);
            }}
            title={isPaused ? 'Resume Swarm' : 'Pause Swarm'}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>

          {/* Speed Toggle: 1x, 2x, 3x */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSpeed(speed === 1 ? 2 : speed === 2 ? 3 : 1);
            }}
            style={{
              background: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            {speed}x
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            style={{
              background: 'transparent',
              border: 'none',
              color: isMuted ? '#666' : 'var(--accent)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={handleRestart}
            title="Replay Swarm Animation"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Exit / Return to Live Website */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.04em',
            boxShadow: '0 0 12px var(--accent-glow)',
          }}
        >
          {activeStage === 'complete' ? (
            <>
              <CheckCircle2 size={13} />
              <span>Enter Live Site</span>
            </>
          ) : (
            <>
              <X size={13} />
              <span>Exit Swarm</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

