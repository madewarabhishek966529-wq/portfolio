import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '../config/site';
import { soundManager } from '../utils/sound';

export default function Footer() {
  const [indiaTime, setIndiaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIndiaTime(timeStr);
      } catch (e) {
        setIndiaTime('02:00 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '60px 0 40px 0',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '32px',
                color: 'var(--text)',
                lineHeight: 1,
                letterSpacing: '0.02em',
                marginBottom: '8px',
              }}
            >
              {siteConfig.identity.displayName}
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {siteConfig.identity.profession} • {siteConfig.identity.location}
            </p>
          </div>

          {/* Live Indian Time & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* India Standard Time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Clock size={13} style={{ color: 'var(--accent)' }} />
              <span>IST // {indiaTime}</span>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-secondary"
              aria-label="Scroll back to top"
              style={{
                padding: '8px 14px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Design Credit */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid #181818',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {siteConfig.identity.fullName}. All authentic rights reserved.
          </div>
          <div>
            Nanded, Maharashtra, India • {siteConfig.contact.email}
          </div>
        </div>
      </div>
    </footer>
  );
}
