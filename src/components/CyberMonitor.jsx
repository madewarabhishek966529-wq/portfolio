import React, { useState, useEffect, useRef } from 'react';
import { Radio, Activity, Terminal, Box, Cpu, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function CyberMonitor() {
  const [activeMode, setActiveMode] = useState('radar'); // radar, matrix, waveform, polyhedron, circuit
  const canvasRef = useRef(null);

  const modes = [
    { id: 'radar', label: 'RADAR', icon: Radio },
    { id: 'matrix', label: 'MATRIX', icon: Terminal },
    { id: 'waveform', label: 'WAVEFORM', icon: Activity },
    { id: 'polyhedron', label: '3D SPATIAL', icon: Box },
    { id: 'circuit', label: 'CIRCUIT', icon: Cpu },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    // Mode-specific state
    let angle = 0;
    const blips = [
      { r: 40, a: 0.5 },
      { r: 70, a: 2.1 },
      { r: 90, a: 4.3 },
    ];

    // Matrix rain columns
    const cols = Math.floor(width / 14);
    const ypos = Array(cols).fill(0);

    // 3D Polyhedron vertices (Cube)
    let rotX = 0;
    let rotY = 0;
    const nodes = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    const render = () => {
      const computedAccent =
        getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#e32b3c';

      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      if (activeMode === 'radar') {
        // RADAR SWEEP
        angle += 0.035;
        const maxR = Math.min(width, height) * 0.44;

        // Concentric radar rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        [0.25, 0.5, 0.75, 1].forEach((frac) => {
          ctx.beginPath();
          ctx.arc(cx, cy, maxR * frac, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.stroke();

        // Sweep cone
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, angle - 0.4, angle);
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, computedAccent);
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.restore();

        // Target blips
        blips.forEach((b) => {
          const bx = cx + Math.cos(b.a) * b.r;
          const by = cy + Math.sin(b.a) * b.r;
          ctx.fillStyle = computedAccent;
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeMode === 'matrix') {
        // MATRIX CODE RAIN
        ctx.fillStyle = computedAccent;
        ctx.font = '10px monospace';
        ypos.forEach((y, ind) => {
          const char = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
          const x = ind * 14;
          ctx.fillText(char, x, y);
          if (y > 240 + Math.random() * 800) ypos[ind] = 0;
          else ypos[ind] = y + 14;
        });
      } else if (activeMode === 'waveform') {
        // AUDIO OSCILLOSCOPE
        angle += 0.05;
        ctx.strokeStyle = computedAccent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const y =
            cy +
            Math.sin(x * 0.03 + angle) * 35 * Math.sin(angle * 0.4) +
            Math.cos(x * 0.08 - angle) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeMode === 'polyhedron') {
        // 3D ROTATING WIREFRAME
        rotX += 0.015;
        rotY += 0.02;
        const scale = 50;

        const rotated = nodes.map(([x, y, z]) => {
          // Rotate Y
          const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
          const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
          // Rotate X
          const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
          return [cx + x1 * scale, cy + y2 * scale];
        });

        ctx.strokeStyle = computedAccent;
        ctx.lineWidth = 1.5;
        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(rotated[i][0], rotated[i][1]);
          ctx.lineTo(rotated[j][0], rotated[j][1]);
          ctx.stroke();
        });
      } else if (activeMode === 'circuit') {
        // LOGIC BUS
        angle += 0.04;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const y = 30 + i * 36;
          ctx.beginPath();
          ctx.moveTo(20, y);
          ctx.lineTo(width - 20, y);
          ctx.stroke();

          // Pulsing signal
          const px = ((Math.sin(angle + i) + 1) / 2) * (width - 40) + 20;
          ctx.fillStyle = computedAccent;
          ctx.beginPath();
          ctx.arc(px, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMode]);

  return (
    <div
      style={{
        backgroundColor: '#0d0d0d',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="spotlight-card border-beam"
    >
      {/* Top Monitor Status Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: '#141414',
          borderBottom: '1px solid #222',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text)',
              letterSpacing: '0.1em',
              fontWeight: 700,
            }}
          >
            REALTIME INTERACTIVE CRT // 60 FPS
          </span>
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveMode(m.id);
                }}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent)' : '#2b2b2b',
                  backgroundColor: isActive ? 'var(--accent)' : '#1a1a1a',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={12} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen Canvas Container with CRT scanlines */}
      <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#090909' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '240px', display: 'block' }} />

        {/* CRT Scanline Mask */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
            backgroundSize: '100% 3px, 6px 100%',
            opacity: 0.8,
          }}
        />

        {/* Active Coordinate Stamp */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--text-dim)',
            pointerEvents: 'none',
          }}
        >
          MODE: {activeMode.toUpperCase()} // LATENCY: 0.1MS
        </div>
      </div>
    </div>
  );
}

