import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { soundManager } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'Flutter Mobile Application',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedChannel, setSubmittedChannel] = useState('');
  const [error, setError] = useState('');

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError('Please fill out your Name, Email, and Message.');
      return false;
    }
    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      setError('Please provide a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  // 1. Direct Web Gmail (Opens in browser tab, NEVER opens desktop Outlook / Windows Mail app)
  const handleSendViaGmail = (e) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    if (!validate()) return;

    soundManager.playSuccess();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.type} from ${formState.name}`);
    const body = encodeURIComponent(
      `Hi Abhishek,\n\n${formState.message}\n\n---\nSender Details:\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.type}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contact.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setSubmittedChannel('Gmail Web (Browser)');
    setSubmitted(true);
  };

  // 2. Direct WhatsApp (Instant to Abhishek's phone +91 96652 97294)
  const handleSendViaWhatsApp = (e) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    if (!validate()) return;

    soundManager.playSuccess();
    const waText = encodeURIComponent(
      `Hi Abhishek,\n\nI saw your portfolio and would like to connect!\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.type}\n\nMessage:\n${formState.message}`
    );

    const waUrl = `https://wa.me/919665297294?text=${waText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmittedChannel('WhatsApp');
    setSubmitted(true);
  };

  // 3. Copy Full Inquiry Details to Clipboard
  const handleCopyInquiry = () => {
    soundManager.playClick();
    if (!validate()) return;

    const summary = `Recipient: ${siteConfig.contact.email}\nSender: ${formState.name} (${formState.email})\nType: ${formState.type}\nMessage: ${formState.message}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.contact.github, icon: Github, handle: 'madewarabhishek966529-wq' },
    { name: 'LinkedIn', url: siteConfig.contact.linkedin, icon: Linkedin, handle: 'Abhishek Madewar' },
    {
      name: 'WhatsApp',
      url: `https://wa.me/919665297294?text=${encodeURIComponent('Hi Abhishek, I saw your portfolio and would like to connect!')}`,
      icon: MessageSquare,
      handle: '+91 96652 97294',
    },
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

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contact.email}&su=Portfolio%20Inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => soundManager.playClick()}
                  style={{
                    padding: '10px 18px',
                    fontSize: '11px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Mail size={14} />
                  <span>Open Gmail in Browser</span>
                </a>

                <a
                  href={`https://wa.me/919665297294?text=${encodeURIComponent('Hi Abhishek, I saw your portfolio and would like to connect!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  onClick={() => soundManager.playClick()}
                  style={{
                    padding: '10px 18px',
                    fontSize: '11px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MessageSquare size={14} style={{ color: '#25D366' }} />
                  <span>Chat on WhatsApp</span>
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
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
                      className="spotlight-card border-beam clickable"
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

          {/* Right Column: Direct Transmission Form */}
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
              Select your preferred direct channel below — zero delay, zero external desktop software.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '32px 24px',
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
                  Message Prepared via {submittedChannel}!
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Your inquiry to <strong style={{ color: '#fff' }}>{siteConfig.contact.email}</strong> was formatted and opened in a new browser tab ready to transmit directly to Abhishek.
                </p>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        type: 'Flutter Mobile Application',
                        message: '',
                      });
                    }}
                    style={{ fontSize: '11px', padding: '8px 18px' }}
                  >
                    Send Another Note
                  </button>

                  <a
                    href={`https://wa.me/919665297294?text=${encodeURIComponent('Hi Abhishek, I also sent an inquiry through your portfolio website!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '11px', padding: '8px 18px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MessageSquare size={13} style={{ color: '#25D366' }} />
                    <span>Ping on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendViaGmail} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {error && (
                  <div
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'rgba(227, 43, 60, 0.15)',
                      border: '1px solid var(--accent)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <AlertCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>{error}</span>
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

                {/* Direct Delivery Action Buttons (100% Reliable, Zero Hangs) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={handleSendViaGmail}
                    className="btn-primary"
                    style={{
                      padding: '12px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '12px',
                    }}
                  >
                    <Mail size={14} />
                    <span>Send via Gmail Web</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="btn-secondary"
                    style={{
                      padding: '12px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      borderColor: '#25D366',
                      color: '#25D366',
                      backgroundColor: 'rgba(37, 211, 102, 0.08)',
                    }}
                  >
                    <MessageSquare size={14} />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>

                {/* Auxiliary Copy Action */}
                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                    borderColor: 'rgba(255, 255, 255, 0.07)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={12} style={{ color: 'var(--success)' }} />
                      <span style={{ color: 'var(--success)' }}>Inquiry Details Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Full Message & Contact Details</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
