import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Compass, Terminal, Layers, Sparkles, Smartphone, Cpu } from 'lucide-react';
import { siteConfig } from '../config/site';
import { soundManager } from '../utils/sound';
import ParticleCanvas from './ParticleCanvas';
import Odometer from './Odometer';

export default function Hero({ onOpenResume }) {
  const containerRef = useRef(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--header-height) + 50px)',
        paddingBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Interactive 60fps Particle Constellation Canvas */}
      <ParticleCanvas />

      {/* Decorative Radial Accent Aura */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Meta Line: Availability & Coordinates */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {/* Availability Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text)',
              letterSpacing: '0.08em',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--success)',
                boxShadow: '0 0 12px var(--success)',
                animation: 'pulse 1.8s infinite',
              }}
            />
            <span>{siteConfig.identity.availability}</span>
          </div>

          {/* Location & GPS Coordinates */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
            }}
          >
            <Compass size={13} style={{ color: 'var(--accent)' }} />
            <span>{siteConfig.identity.location}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span className="hidden-sm">{siteConfig.identity.coordinates}</span>
          </div>
        </div>

        {/* Hero Title & Kinetic Typography */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--accent)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontWeight: 700,
            }}
          >
            <Terminal size={14} />
            <span>{siteConfig.identity.profession}</span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(52px, 11.5vw, 150px)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            ABHISHEK <span className="shimmer-text">MADEWAR</span>
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4.5vw, 56px)',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              maxWidth: '1000px',
            }}
          >
            Building AI-integrated apps across mobile, web & backend
          </div>
        </div>

        {/* Introduction Narrative & Core Architectural Focus Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'start',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 1.3vw, 19px)',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: '680px',
            }}
          >
            {siteConfig.identity.intro}
          </p>

          {/* Core Specialization Editorial Card */}
          <div
            className="spotlight-card border-beam"
            style={{
              backgroundColor: '#121212',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Smartphone size={13} />
                <span>Primary Tech Stack</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>
                3+ YRS PRODUCTION
              </span>
            </div>

            <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 600, lineHeight: 1.4 }}>
              Flutter Mobile, React.js Frontends, FastAPI Services & Gemini / Groq Vision APIs
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {['Flutter', 'Dart', 'FastAPI', 'Gemini Vision', 'Supabase', 'React', 'Firebase'].map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #282828',
                    padding: '3px 8px',
                    borderRadius: '2px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '64px',
          }}
        >
          <a
            href="#projects"
            className="btn-primary"
            onClick={() => soundManager.playClick()}
          >
            <span>Explore Shipped Projects</span>
            <ArrowDown size={15} />
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
          >
            <span>Download Résumé (PDF)</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Verified Metrics Counter Strip with Rolling Odometers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            paddingTop: '36px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {siteConfig.metrics.map((metric, idx) => (
            <div key={idx}>
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(38px, 4.5vw, 62px)',
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {idx === 0 && <Odometer value={metric.value} targetNum={8} suffix="+" />}
                {idx === 1 && <Odometer value={metric.value} targetNum={3} suffix="+" />}
                {idx === 2 && <Odometer value={metric.value} targetNum={15} suffix="+" />}
                {idx === 3 && (
                  <span style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
                    SDGs 2 & 3
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.4,
                }}
              >
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        @media (max-width: 640px) {
          .hidden-sm {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
