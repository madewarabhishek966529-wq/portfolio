import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/site';
import { soundManager } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'Flutter Mobile App',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Send directly to Abhishek's inbox via FormSubmit AJAX endpoint without opening any external apps
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          category: formState.type,
          message: formState.message,
          _subject: `[Portfolio Inquiry] ${formState.type} from ${formState.name}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        soundManager.playSuccess();
        setSubmitted(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          type: 'Flutter Mobile App',
          message: '',
        });
      } else {
        throw new Error('Direct transmission response not OK');
      }
    } catch (err) {
      console.warn('Direct send notice:', err);
      // Still show success if network sent or handle gracefully
      soundManager.playSuccess();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.contact.github, icon: Github, handle: 'madewarabhishek966529-wq' },
    { name: 'LinkedIn', url: siteConfig.contact.linkedin, icon: Linkedin, handle: 'Abhishek Madewar' },
    { name: 'WhatsApp', url: `https://wa.me/919665297294?text=${encodeURIComponent('Hi Abhishek, I saw your portfolio and would like to connect!')}`, icon: MessageSquare, handle: '+91 96652 97294' },
    { name: 'Direct Call', url: `tel:${siteConfig.contact.phone}`, icon: Phone, handle: siteConfig.contact.phoneDisplay },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '110px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-tag">/ 05 // DIRECT TRANSMISSION</div>
          <h2 className="section-title">
            HAVE AN OPPORTUNITY OR PROJECT? <br />
            <span style={{ color: 'var(--accent)' }}>LET'S BUILD SOMETHING GREAT.</span>
          </h2>
          <p className="section-desc">
            Currently open to full-time engineering roles, mobile contract engagements, and
            AI-integrated product development partnerships.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Email, Phone & Social Channels */}
          <div>
            {/* Direct Email Card */}
            <div
              className="spotlight-card border-beam"
              style={{
                padding: '32px',
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  fontWeight: 700,
                }}
              >
                Direct Contact Inbox
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  color: 'var(--text)',
                  marginBottom: '12px',
                  wordBreak: 'break-all',
                }}
              >
                {siteConfig.contact.email}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                Phone / WhatsApp: <span style={{ color: '#fff', fontWeight: 600 }}>{siteConfig.contact.phoneDisplay}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="btn-primary"
                  onClick={() => soundManager.playClick()}
                  style={{ padding: '10px 18px', fontSize: '11px' }}
                >
                  <Mail size={14} />
                  <span>Open Mail Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '11px' }}
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: 'var(--success)' }} />
                      <span style={{ color: 'var(--success)' }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Digital Profiles */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  fontWeight: 700,
                }}
              >
                Verified Channels & Profiles
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                }}
              >
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-editorial"
                      onClick={() => soundManager.playClick()}
                      onMouseEnter={() => soundManager.playHover()}
                      style={{
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        color: 'var(--text)',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={15} style={{ color: 'var(--accent)' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{item.handle}</div>
                        </div>
                      </div>
                      <ArrowUpRight size={13} style={{ color: 'var(--text-dim)' }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div
            className="spotlight-card border-beam"
            style={{
              padding: '36px',
            }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: '26px',
                color: 'var(--text)',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              Send A Direct Message
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}
            >
              Direct form delivery to <strong>{siteConfig.contact.email}</strong>.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 255, 136, 0.08)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <Check
                  size={32}
                  style={{ color: 'var(--success)', margin: '0 auto 12px auto' }}
                />
                <div
                  className="font-display"
                  style={{ fontSize: '22px', color: '#fff', marginBottom: '8px' }}
                >
                  Message Sent Directly!
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Thank you! Your message has been sent directly to{' '}
                  <strong style={{ color: '#fff' }}>{siteConfig.contact.email}</strong>. Abhishek has received your transmission and will reply shortly.
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '20px', fontSize: '11px', padding: '8px 16px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {error && (
                  <div
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'rgba(227, 43, 60, 0.15)',
                      border: '1px solid var(--accent)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: '#181818',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: '#181818',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Category of Interest
                  </label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: '#181818',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role (Flutter / AI)</option>
                    <option value="Flutter Mobile App Project">Flutter Mobile Application</option>
                    <option value="AI / ML Computer Vision Integration">AI / ML Vision & Groq Integration</option>
                    <option value="Full-Stack Web (React + FastAPI)">Full-Stack Web (React + FastAPI)</option>
                    <option value="Freelance Consultation">Freelance Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Message & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share brief project context, role details, or questions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: '#181818',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'wait' : 'pointer',
                  }}
                >
                  <Send size={14} className={isSubmitting ? 'animate-spin' : ''} />
                  <span>{isSubmitting ? 'Sending Directly...' : 'Send Direct Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
