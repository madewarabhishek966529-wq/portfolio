import React, { useEffect } from 'react';
import { X, Printer, Download, MapPin, Mail, Phone, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import { siteConfig } from '../config/site';
import { experienceData, educationData, skillCategories, achievementsData } from '../data/experience';
import { soundManager } from '../utils/sound';

export default function ResumeModal({ onClose }) {
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

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(5, 5, 5, 0.88)',
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-title"
        className="printable-cv"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          backgroundColor: '#121212',
          border: '1px solid #282828',
          borderRadius: 'var(--radius-md)',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
          color: 'var(--text)',
        }}
      >
        {/* Modal Top Bar */}
        <div
          className="no-print"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'rgba(18, 18, 18, 0.96)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #222222',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Curriculum Vitae
            </span>
            <span style={{ color: '#444' }}>•</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
              {siteConfig.identity.fullName}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="/Abhishek_Madewar_Resume.pdf"
              download="Abhishek_Madewar_Resume.pdf"
              onClick={() => soundManager.playClick()}
              className="btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '11px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '11px' }}
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              aria-label="Close CV preview"
              style={{
                background: 'transparent',
                border: '1px solid #333',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div style={{ padding: '40px' }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '24px', marginBottom: '32px' }}>
            <h1
              id="cv-title"
              className="font-display"
              style={{ fontSize: '38px', color: '#fff', lineHeight: 1, marginBottom: '6px' }}
            >
              {siteConfig.identity.displayName}
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontWeight: 700,
              }}
            >
              {siteConfig.identity.profession}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} style={{ color: 'var(--accent)' }} />
                <span>{siteConfig.identity.location}</span>
              </div>
              <div>•</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={13} style={{ color: 'var(--accent)' }} />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div>•</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={13} style={{ color: 'var(--accent)' }} />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              Professional Profile
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text)' }}>
              {siteConfig.identity.bio}
            </p>
          </div>

          {/* Core Technical Capabilities */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '14px',
                fontWeight: 700,
              }}
            >
              Technical Skill Matrix
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {skillCategories.map((cat, i) => (
                <div key={i} style={{ backgroundColor: '#181818', padding: '14px', borderRadius: '4px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', fontWeight: 700, marginBottom: '6px' }}>
                    {cat.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {cat.skills.map((s) => `${s.name} (${s.level})`).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontWeight: 700,
              }}
            >
              Work Experience
            </h2>

            {experienceData.map((job) => (
              <div key={job.id} style={{ borderLeft: '2px solid #282828', paddingLeft: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                    {job.role} <span style={{ color: 'var(--accent)' }}>@ {job.company}</span>
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                    {job.period} • {job.location}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '8px 0', lineHeight: 1.6 }}>
                  {job.description}
                </p>
                {job.achievements && (
                  <ul style={{ paddingLeft: '16px', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    {job.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontWeight: 700,
              }}
            >
              Education
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {educationData.map((edu, eIdx) => (
                <div key={eIdx}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    {edu.institution} ({edu.period})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recognitions */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontWeight: 700,
              }}
            >
              Key Achievements
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {achievementsData.map((ach, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text)',
                    backgroundColor: '#1b1b1b',
                    border: '1px solid #333',
                    padding: '4px 10px',
                    borderRadius: '2px',
                  }}
                >
                  {ach.icon} {ach.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-cv, .printable-cv * {
            visibility: visible;
          }
          .printable-cv {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            background-color: #fff !important;
            color: #000 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .printable-cv h1, .printable-cv h2, .printable-cv h3, .printable-cv span, .printable-cv p {
            color: #000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
