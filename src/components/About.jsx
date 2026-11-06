import React from 'react';
import { Palette, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';
import { skillCategories, philosophyPillars } from '../data/experience';
import CyberMonitor from './CyberMonitor';

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '110px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.005)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-tag">/ 02 // METHODOLOGY & 2026 MOTION ETHOS</div>
          <h2 className="section-title">
            ENGINEERING <span style={{ color: 'var(--accent)' }}>CLARITY</span> FROM COMPLEXITY
          </h2>
          <p className="section-desc">
            Focused on bridging the gap between cross-platform mobile architectures, modern web frontends, and intelligent AI models to craft high-performance digital products.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            marginBottom: '72px',
          }}
        >
          {/* Left Column: Personal Statement & Interactive CRT Cyber Monitor */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontWeight: 700,
              }}
            >
              Background & Approach
            </div>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.7,
                color: 'var(--text)',
                marginBottom: '20px',
              }}
            >
              {siteConfig.identity.about}
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '28px',
              }}
            >
              I believe that when designers write code, products get sharper. By deeply understanding
              DOM manipulation, GPU compositing shaders, and token propagation, design handoffs
              transform into true engineering partnerships.
            </p>

            {/* Interactive 60fps Cyber CRT Monitor */}
            <div data-swarm-target="cyber-monitor">
              <CyberMonitor />
            </div>
          </div>

          {/* Right Column: 3 Foundational Pillars */}
          <div data-swarm-target="philosophy-pillars" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
                fontWeight: 700,
              }}
            >
              Foundational Principles
            </div>

            {philosophyPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="spotlight-card border-beam clickable"
                style={{
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    opacity: 0.6,
                  }}
                >
                  {pillar.number}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '24px',
                    color: 'var(--text)',
                    lineHeight: 1.1,
                    marginBottom: '10px',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Verified Stack Capabilities */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              fontWeight: 700,
            }}
          >
            Verified Technical Capabilities & Toolsets
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="spotlight-card border-beam clickable"
                style={{
                  padding: '28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    borderBottom: '1px solid #202020',
                    paddingBottom: '14px',
                  }}
                >
                  {idx === 0 && <Palette size={18} style={{ color: 'var(--accent)' }} />}
                  {idx === 1 && <Code2 size={18} style={{ color: 'var(--accent)' }} />}
                  {idx === 2 && <Cpu size={18} style={{ color: 'var(--accent)' }} />}
                  <h4
                    className="font-display"
                    style={{ fontSize: '20px', color: 'var(--text)' }}
                  >
                    {cat.title}
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'var(--text)' }}>{skill.name}</span>
                      <span
                        style={{
                          color: 'var(--accent)',
                          fontSize: '10px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          backgroundColor: 'var(--accent-subtle)',
                          border: '1px solid var(--accent-glow)',
                          padding: '3px 8px',
                          borderRadius: '2px',
                          fontWeight: 700,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
