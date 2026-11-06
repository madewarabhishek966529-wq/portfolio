import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { siteConfig } from '../config/site';
import { soundManager } from '../utils/sound';
import { ACCENT_THEMES, applyAccentTheme, getInitialTheme } from '../utils/theme';

export default function Header({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyAccentTheme(currentTheme.id);
  }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleThemeChange = (theme) => {
    soundManager.playClick();
    setCurrentTheme(theme);
    applyAccentTheme(theme.id);
  };

  const navLinks = [
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Git Activity', href: '#github-activity' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: isScrolled ? 'rgba(9, 9, 9, 0.94)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={() => soundManager.playClick()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'var(--text)',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 14px var(--accent-subtle)',
            }}
          >
            {siteConfig.identity.initials}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '19px',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              {siteConfig.identity.displayName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                marginTop: '3px',
                textTransform: 'uppercase',
              }}
            >
              {siteConfig.identity.location.split(',')[0]} // PORTFOLIO
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color var(--transition-fast)',
                position: 'relative',
                padding: '6px 0',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster: Theme Dots, SFX, Resume, Contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Live Accent Theme Switcher Dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
            }}
            title="Switch Accent Theme"
          >
            {ACCENT_THEMES.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeChange(theme)}
                  title={theme.name}
                  aria-label={theme.name}
                  style={{
                    width: isSelected ? '14px' : '10px',
                    height: isSelected ? '14px' : '10px',
                    borderRadius: '50%',
                    backgroundColor: theme.color,
                    border: isSelected ? '2px solid #fff' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 0 10px ${theme.color}` : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            className="btn-sound"
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute procedural sound effects' : 'Mute sound effects'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX size={15} style={{ color: 'var(--text-dim)' }} />
            ) : (
              <Volume2 size={15} style={{ color: 'var(--accent)' }} />
            )}
          </button>

          {/* Resume View Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            className="btn-secondary hidden-mobile"
            style={{ padding: '8px 14px', fontSize: '11px', display: 'none' }}
            title="Inspect Curriculum Vitae"
          >
            <FileText size={13} style={{ color: 'var(--accent)' }} />
            <span>CV</span>
          </button>

          {/* Contact Direct CTA - Let's Talk */}
          <a
            href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Let's Work Together")}`}
            className="btn-primary desktop-cta"
            onClick={() => soundManager.playClick()}
            style={{
              padding: '8px 18px',
              fontSize: '11px',
              display: 'none',
              textDecoration: 'none',
            }}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(9, 9, 9, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '36px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 99,
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #1a1a1a',
                  paddingBottom: '12px',
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={20} style={{ color: 'var(--accent)' }} />
              </a>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-secondary"
              style={{ width: '100%', marginBottom: '12px', textAlign: 'center' }}
            >
              <FileText size={14} style={{ color: 'var(--accent)' }} />
              <span>Inspect Curriculum Vitae (PDF)</span>
            </button>

            <a
              href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Let's Work Together")}`}
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', justifyContent: 'center', textDecoration: 'none' }}
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
              }}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS rules for Header */}
      <style>{`
        @media (min-width: 540px) {
          .desktop-cta {
            display: inline-flex !important;
          }
        }
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .hidden-mobile {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
