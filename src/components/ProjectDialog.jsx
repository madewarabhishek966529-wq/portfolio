import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowRight, ShieldCheck, Zap, Layers, Github } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    soundManager.playClick();
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

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playClick();
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          backgroundColor: '#121212',
          border: '1px solid #282828',
          borderRadius: 'var(--radius-md)',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          animation: 'dialogFadeIn 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #222222',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {project.category}
            </span>
            <span style={{ color: '#444' }}>/</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
              }}
            >
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            aria-label="Close case study"
            style={{
              background: 'transparent',
              border: '1px solid #333',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = '#333';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero Cover Image */}
        <div
          style={{
            width: '100%',
            height: '340px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#0a0a0a',
          }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #121212 0%, rgba(18, 18, 18, 0.4) 40%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '4px 10px',
                borderRadius: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {project.tag}
            </span>
            <h2
              id="dialog-title"
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '28px 24px' }}>
          {/* Metrics Grid Callout */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #222',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
              }}
            >
              {project.metrics.map((m, i) => (
                <div key={i}>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '28px',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Deep Description */}
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Overview & Scope
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text)',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Role & Tech Stack */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '28px',
              padding: '20px',
              backgroundColor: '#161616',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #262626',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '6px',
                }}
              >
                Role
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{project.role}</div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}
              >
                Tools & Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tools.map((tool, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text)',
                      backgroundColor: '#202020',
                      padding: '4px 8px',
                      borderRadius: '3px',
                      border: '1px solid #333',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Problem vs Solution Callout */}
          {project.challenges && project.solution && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  borderLeft: '2px solid #555',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  The Challenge
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {project.challenges}
                </p>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderLeft: '2px solid var(--accent)',
                  backgroundColor: 'rgba(227, 43, 60, 0.03)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  The Architectural Solution
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid #222',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => soundManager.playClick()}
                >
                  <span>Live Deployment / Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  onClick={() => soundManager.playClick()}
                >
                  <Github size={14} style={{ color: 'var(--accent)' }} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
            >
              <span>Back to Showcase</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dialogFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

