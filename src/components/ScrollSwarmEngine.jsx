import React, { useEffect, useState, useRef } from 'react';
import { soundManager } from '../utils/sound';

/**
 * 2026 Purposeful Construction Swarm Engine
 * 
 * Unlike random wandering, each collaborator cursor has an active mission:
 * - Tracking actual DOM elements in real time.
 * - Dragging project cards into their grid slots.
 * - Measuring padding/margins with live dimension badges.
 * - Drawing dashed blueprint selection boxes around active cards.
 * - Displaying contextual action tags: [SNAPPING CARD], [ALIGNING GRID], [CALIBRATING 60FPS].
 */

const AGENTS = [
  { id: 'abhishek', name: 'Abhishek (Lead)', color: '#e32b3c', defaultAction: 'Aligning Layout' },
  { id: 'elena', name: 'Elena (UX)', color: '#00f0ff', defaultAction: 'Snapping Card' },
  { id: 'marcus', name: 'Marcus (Motion)', color: '#00ff88', defaultAction: 'Calibrating 60FPS' },
  { id: 'chen', name: 'Chen (Code)', color: '#ffaa00', defaultAction: 'Binding Tokens' },
];

export default function ScrollSwarmEngine({ enabled = true }) {
  const [swarmState, setSwarmState] = useState(() =>
    AGENTS.map((a, i) => ({
      ...a,
      x: 150 + i * 220,
      y: 220,
      targetX: 150 + i * 220,
      targetY: 220,
      isActivelyBuilding: false,
      currentAction: a.defaultAction,
      boxWidth: 320,
      boxHeight: 180,
      targetId: '',
    }))
  );

  const [activeGuidelines, setActiveGuidelines] = useState([]);
  const targetElementsRef = useRef([]);
  const lastScrollY = useRef(0);
  const animFrameRef = useRef(null);

  // Scan real DOM elements marked with [data-swarm-target]
  useEffect(() => {
    const scanTargets = () => {
      const domNodes = Array.from(document.querySelectorAll('[data-swarm-target]'));
      targetElementsRef.current = domNodes.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          id: el.getAttribute('data-swarm-target'),
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
          element: el,
        };
      });
    };

    scanTargets();
    window.addEventListener('resize', scanTargets);
    const interval = setInterval(scanTargets, 1500);

    return () => {
      window.removeEventListener('resize', scanTargets);
      clearInterval(interval);
    };
  }, []);

  // Purposeful target assignment driven by viewport scroll
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      const viewportTop = scrollY;
      const viewportBottom = scrollY + window.innerHeight;

      // Identify elements currently visible
      const visibleTargets = targetElementsRef.current.filter((t) => {
        return t.top + t.height > viewportTop + 50 && t.top < viewportBottom - 50;
      });

      if (visibleTargets.length > 0) {
        if (Math.abs(delta) > 15 && Math.random() > 0.6) {
          soundManager.playSwarmDraft();
        }

        // Assign each cursor directly to a visible element
        setSwarmState((prev) =>
          prev.map((agent, idx) => {
            const target = visibleTargets[idx % visibleTargets.length];
            if (!target) return agent;

            // Pin cursor to actual element corners & anchor handles
            let cornerX = target.left - window.scrollX;
            let cornerY = target.top - window.scrollY;

            // Offset based on agent role for coordinated construction
            if (idx === 0) {
              // Abhishek holds top-left corner
              cornerX += 12;
              cornerY += 12;
            } else if (idx === 1) {
              // Elena holds bottom-right resizing handle
              cornerX += Math.max(40, target.width - 24);
              cornerY += Math.max(40, target.height - 20);
            } else if (idx === 2) {
              // Marcus checks midpoint vertical alignment
              cornerX += target.width / 2;
              cornerY += 16;
            } else {
              // Chen inspects code badge
              cornerX += Math.max(20, target.width * 0.7);
              cornerY += Math.max(20, target.height * 0.4);
            }

            // Derive specific action description
            let actionName = 'Constructing';
            if (target.id.includes('project')) {
              actionName = idx === 1 ? 'Dragging Card Box' : 'Snapping 3D Grid';
            } else if (target.id.includes('hero')) {
              actionName = 'Aligning Anton Typography';
            } else if (target.id.includes('cyber')) {
              actionName = 'Calibrating 60FPS CRT';
            } else if (target.id.includes('metrics')) {
              actionName = 'Verifying Metric Counter';
            } else if (target.id.includes('timeline')) {
              actionName = 'Linking Career Nodes';
            } else if (target.id.includes('contact')) {
              actionName = 'Routing Mail Client';
            }

            return {
              ...agent,
              targetX: cornerX,
              targetY: cornerY,
              boxWidth: Math.round(target.width),
              boxHeight: Math.round(target.height),
              currentAction: actionName,
              isActivelyBuilding: true,
              targetId: target.id,
            };
          })
        );

        // Generate precise alignment guidelines across first active target
        const primaryTarget = visibleTargets[0];
        if (primaryTarget) {
          const screenY = primaryTarget.top - window.scrollY;
          const screenX = primaryTarget.left - window.scrollX;
          setActiveGuidelines([
            { type: 'h', pos: screenY, label: `GRID HORIZON: ${Math.round(primaryTarget.top)}px` },
            { type: 'v', pos: screenX, label: `CONTAINER BOUND: ${Math.round(primaryTarget.left)}px` },
          ]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  // Smooth purposeful mechanical movement towards element coordinates
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      setSwarmState((prev) =>
        prev.map((cursor) => {
          // Direct mechanical spring interpolation (no aimless wandering)
          const ease = 0.14;
          const dx = cursor.targetX - cursor.x;
          const dy = cursor.targetY - cursor.y;

          return {
            ...cursor,
            x: cursor.x + dx * ease,
            y: cursor.y + dy * ease,
          };
        })
      );

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9995,
        overflow: 'hidden',
      }}
    >
      {/* Precision Blueprint Snap Guidelines */}
      {activeGuidelines.map((g, i) =>
        g.type === 'h' ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${g.pos}px`,
              left: 0,
              right: 0,
              height: '1px',
              borderTop: '1px dashed rgba(0, 240, 255, 0.45)',
              transition: 'top 0.1s linear',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '24px',
                top: '-16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: '#00f0ff',
                backgroundColor: '#090909',
                padding: '2px 6px',
                borderRadius: '2px',
                border: '1px solid rgba(0, 240, 255, 0.3)',
              }}
            >
              SNAP // {g.label}
            </span>
          </div>
        ) : (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${g.pos}px`,
              top: 0,
              bottom: 0,
              width: '1px',
              borderLeft: '1px dashed rgba(227, 43, 60, 0.45)',
              transition: 'left 0.1s linear',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '90px',
                left: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--accent)',
                backgroundColor: '#090909',
                padding: '2px 6px',
                borderRadius: '2px',
                border: '1px solid rgba(227, 43, 60, 0.3)',
              }}
            >
              ALIGN // {g.label}
            </span>
          </div>
        )
      )}

      {/* Purposeful Collaborative Cursors constructing DOM */}
      {swarmState.map((cursor) => (
        <div
          key={cursor.id}
          style={{
            position: 'absolute',
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            transform: 'translate(-2px, -2px)',
            transition: 'transform 0.05s linear',
            zIndex: 100,
          }}
        >
          {/* Cursor Pointer Arrow SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              filter: `drop-shadow(0 2px 10px ${cursor.color}aa)`,
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

          {/* Action & Agent Nametag Pill */}
          <div
            style={{
              marginLeft: '14px',
              marginTop: '-8px',
              backgroundColor: cursor.color,
              color: '#000000',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em',
            }}
          >
            <span>{cursor.name}</span>
            <span
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                padding: '1px 5px',
                borderRadius: '2px',
                fontSize: '8px',
                textTransform: 'uppercase',
              }}
            >
              {cursor.currentAction}
            </span>
          </div>

          {/* Live Wireframe Bounding Box around actual card being built */}
          {cursor.isActivelyBuilding && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${cursor.boxWidth}px`,
                height: `${cursor.boxHeight}px`,
                border: `1.5px dashed ${cursor.color}`,
                backgroundColor: `${cursor.color}08`,
                pointerEvents: 'none',
                borderRadius: '6px',
              }}
            >
              {/* Corner crosshairs */}
              <span style={{ position: 'absolute', top: -6, left: -6, color: cursor.color, fontSize: '10px', fontWeight: 900 }}>+</span>
              <span style={{ position: 'absolute', top: -6, right: -6, color: cursor.color, fontSize: '10px', fontWeight: 900 }}>+</span>
              <span style={{ position: 'absolute', bottom: -6, left: -6, color: cursor.color, fontSize: '10px', fontWeight: 900 }}>+</span>
              <span style={{ position: 'absolute', bottom: -6, right: -6, color: cursor.color, fontSize: '10px', fontWeight: 900 }}>+</span>

              {/* Live Dimension Readout Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: 0,
                  backgroundColor: '#090909',
                  color: cursor.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '2px',
                  border: `1px solid ${cursor.color}66`,
                }}
              >
                {cursor.boxWidth} × {cursor.boxHeight}px // LOCKED
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
