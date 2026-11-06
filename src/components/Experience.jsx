import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Briefcase, Calendar, MapPin, Check, GraduationCap, Award, Trophy } from 'lucide-react';
import { experienceData, educationData, achievementsData, certificatesData } from '../data/experience';
import { soundManager } from '../utils/sound';

export default function Experience() {
  const [expandedId, setExpandedId] = useState('exp-01');

  const toggleExpand = (id) => {
    soundManager.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      style={{
        padding: '110px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-tag">/ 04 // PROFESSIONAL CHRONICLE & EDUCATION</div>
          <h2 className="section-title">
            ENGINEERING <span style={{ color: 'var(--accent)' }}>TRACK RECORD</span>
          </h2>
          <p className="section-desc">
            Industry internship experience, computer science degree milestones, and recognized
            accomplishments in global developer challenges.
          </p>
        </div>

        {/* 1. Industry Experience Accordion */}
        <div style={{ marginBottom: '64px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 700,
            }}
          >
            Where I've Worked
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experienceData.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className="spotlight-card border-beam"
                  style={{
                    border: isExpanded ? '1px solid var(--accent)' : '1px solid var(--border)',
                    overflow: 'hidden',
                    transition: 'border-color var(--transition-fast)',
                  }}
                >
                  {/* Header Row Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    onMouseEnter={() => soundManager.playHover()}
                    aria-expanded={isExpanded}
                    style={{
                      width: '100%',
                      padding: '24px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}
                  >
                    {/* Left: Number & Company */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '13px',
                          color: isExpanded ? 'var(--accent)' : 'var(--text-dim)',
                          fontWeight: 700,
                        }}
                      >
                        {item.index}
                      </span>

                      <div>
                        <div
                          className="font-display"
                          style={{
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            color: 'var(--text)',
                            lineHeight: 1.1,
                          }}
                        >
                          {item.company}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--accent)',
                            marginTop: '2px',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                          }}
                        >
                          {item.role}
                        </div>
                      </div>
                    </div>

                    {/* Right: Period & Chevron */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          backgroundColor: '#181818',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid #282828',
                        }}
                      >
                        <Calendar size={12} style={{ color: 'var(--accent)' }} />
                        <span>{item.period}</span>
                      </div>

                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#1a1a1a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isExpanded ? 'var(--accent)' : 'var(--text-muted)',
                        }}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details Body */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '0 24px 28px 24px',
                        borderTop: '1px solid #1c1c1c',
                        marginTop: '4px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          paddingTop: '20px',
                          marginBottom: '16px',
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-dim)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={13} style={{ color: 'var(--accent)' }} />
                          <span>{item.location}</span>
                        </div>
                        <span>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Briefcase size={13} style={{ color: 'var(--accent)' }} />
                          <span>{item.type}</span>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.7,
                          color: 'var(--text)',
                          marginBottom: '20px',
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Achievements Bullet List */}
                      {item.achievements && (
                        <div style={{ marginBottom: '24px' }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--accent)',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              marginBottom: '10px',
                              fontWeight: 700,
                            }}
                          >
                            Key Engineering Responsibilities
                          </div>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {item.achievements.map((ach, aIdx) => (
                              <li
                                key={aIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  fontSize: '14px',
                                  color: 'var(--text-muted)',
                                  lineHeight: 1.5,
                                }}
                              >
                                <Check
                                  size={14}
                                  style={{
                                    color: 'var(--accent)',
                                    marginTop: '4px',
                                    flexShrink: 0,
                                  }}
                                />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech & Specialization Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {item.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--text)',
                              backgroundColor: '#1b1b1b',
                              border: '1px solid #2d2d2d',
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Academic Background & Milestones Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Education */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <GraduationCap size={15} />
              <span>Academic Education</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="spotlight-card border-beam"
                  style={{
                    padding: '24px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--accent)',
                      marginBottom: '6px',
                      fontWeight: 600,
                    }}
                  >
                    {edu.period}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px', lineHeight: 1.3 }}>
                    {edu.degree}
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {edu.institution}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements & Honors */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Trophy size={15} />
              <span>Milestones & Recognitions</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {achievementsData.map((ach, idx) => (
                <div
                  key={idx}
                  className="spotlight-card border-beam"
                  style={{
                    padding: '22px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#1b1b1b',
                      border: '1px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    {ach.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          color: 'var(--accent)',
                          fontWeight: 700,
                          backgroundColor: 'var(--accent-subtle)',
                          padding: '1px 6px',
                          borderRadius: '2px',
                        }}
                      >
                        {ach.badge}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {ach.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
