import React, { useState, useEffect, useMemo } from 'react';
import { GitBranch, GitCommit, GitPullRequest, Star, RefreshCw, ExternalLink, Calendar, Radio } from 'lucide-react';
import initialContributions from '../data/githubContributions.json';
import initialRepos from '../data/githubRepos.json';
import { soundManager } from '../utils/sound';

const GITHUB_USERNAME = 'madewarabhishek966529-wq';

// Language color mapping
const LANGUAGE_COLORS = {
  Dart: '#00B4AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Java: '#B07219',
  C: '#555555',
  'C++': '#F34B7D',
};

// Heatmap level colors matching GitHub Dark Mode
const LEVEL_COLORS = [
  '#161b22', // Level 0: no contribution
  '#0e4429', // Level 1
  '#006d32', // Level 2
  '#26a641', // Level 3
  '#39d353', // Level 4
];

export default function GitHistory() {
  const [contributionsData, setContributionsData] = useState(initialContributions);
  const [repos, setRepos] = useState(initialRepos || []);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [hoveredCell, setHoveredCell] = useState(null);

  // Live fetch function from GitHub & Public Contributions API
  const fetchLiveGithubData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch live contributions calendar
      const contribPromise = fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      )
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      // 2. Fetch live repository history (sorted by latest push/update)
      const reposPromise = fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`
      )
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      // 3. Fetch live recent public events (pushes, commits)
      const eventsPromise = fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`
      )
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      const [liveContrib, liveRepos, liveEvents] = await Promise.all([
        contribPromise,
        reposPromise,
        eventsPromise,
      ]);

      if (liveContrib && liveContrib.contributions) {
        setContributionsData(liveContrib);
      }
      if (Array.isArray(liveRepos) && liveRepos.length > 0) {
        setRepos(liveRepos);
      }
      if (Array.isArray(liveEvents) && liveEvents.length > 0) {
        setEvents(liveEvents);
      }

      const now = new Date();
      setLastSyncTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (err) {
      console.warn('Failed to fetch live GitHub telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveGithubData();
    // Auto-poll live GitHub updates every 90 seconds
    const interval = setInterval(fetchLiveGithubData, 90000);
    return () => clearInterval(interval);
  }, []);

  const totalContributions = useMemo(() => {
    return (
      contributionsData?.total?.lastYear ||
      contributionsData?.total?.[new Date().getFullYear()] ||
      488
    );
  }, [contributionsData]);

  // Group daily contributions into 52 columns x 7 days
  const calendarWeeks = useMemo(() => {
    const list = contributionsData?.contributions || [];
    if (!list.length) return [];

    const weeks = [];
    let currentWeek = [];

    list.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === list.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  }, [contributionsData]);

  // Month labels across the year
  const monthLabels = [
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
  ];

  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'recently';
    const date = new Date(isoString);
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <section
      id="github-activity"
      style={{
        padding: '100px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        backgroundColor: '#0a0a0c',
      }}
    >
      <div className="container">
        {/* Section Header with Live Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '44px',
          }}
        >
          <div>
            <div className="section-tag">// OPEN-SOURCE TELEMETRY</div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                color: 'var(--text)',
                marginBottom: '14px',
              }}
            >
              Git Repository History &{' '}
              <span style={{ color: '#00ff88' }}>Live Activity</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '640px' }}>
              Real-time engineering activity synced directly with GitHub (
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                @{GITHUB_USERNAME}
              </a>
              ). Commits, active repositories, and annual contributions automatically reflect live.
            </p>
          </div>

          {/* Live Sync Status Pill & Refresh Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 255, 136, 0.08)',
                border: '1px solid rgba(0, 255, 136, 0.25)',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#00ff88',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              <Radio
                size={13}
                className="live-pulse"
              />
              <span>LIVE GITHUB SYNC</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{ color: 'var(--text-dim)' }}>Synced {lastSyncTime}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                fetchLiveGithubData();
              }}
              disabled={isLoading}
              title="Refresh live GitHub data"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--text)';
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
              <span>{isLoading ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* 1. Contribution Matrix Heatmap Card (Matches Image 2) */}
        <div
          className="spotlight-card border-beam"
          style={{
            backgroundColor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '12px',
            padding: '24px 28px',
            marginBottom: '36px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Card Top Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} style={{ color: '#00ff88' }} />
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                <strong style={{ color: '#00ff88' }}>{totalContributions}</strong> contributions in the last year
              </h3>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              <span>View GitHub Profile</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Heatmap Graph Container with Horizontal Scroll on Mobile */}
          <div className="heatmap-scroll">
            <div style={{ minWidth: '780px' }}>
              {/* Month Header Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: '32px',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                }}
              >
                {monthLabels.map((month, idx) => (
                  <span key={idx} style={{ flex: 1 }}>
                    {month}
                  </span>
                ))}
              </div>

              {/* Grid: Day Labels (left) + 52 Week Columns */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Weekday Labels (Mon, Wed, Fri) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '98px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--text-dim)',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    width: '24px',
                  }}
                >
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* 52 Week Columns */}
                <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                  {calendarWeeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                      }}
                    >
                      {week.map((day, dIdx) => {
                        const levelColor = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredCell(day)}
                            onMouseLeave={() => setHoveredCell(null)}
                            style={{
                              width: '11px',
                              height: '11px',
                              borderRadius: '2px',
                              backgroundColor: levelColor,
                              transition: 'transform 0.15s ease, outline 0.15s ease',
                              cursor: 'pointer',
                              outline:
                                hoveredCell?.date === day.date
                                  ? '1px solid #ffffff'
                                  : 'none',
                              transform:
                                hoveredCell?.date === day.date ? 'scale(1.3)' : 'scale(1)',
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Tooltip or Summary + Less / More Legend */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                }}
              >
                <div>
                  {hoveredCell ? (
                    <span style={{ color: 'var(--text)' }}>
                      <strong style={{ color: '#00ff88' }}>
                        {hoveredCell.count} contribution{hoveredCell.count === 1 ? '' : 's'}
                      </strong>{' '}
                      on {hoveredCell.date}
                    </span>
                  ) : (
                    <span>Hover over any square to view daily commit count</span>
                  )}
                </div>

                {/* Legend (Less -> More) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Less</span>
                  {LEVEL_COLORS.map((col, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        backgroundColor: col,
                      }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Live Repository History & Recent Commit Telemetry Feed */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Latest Repository Pushes & Activity
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)',
              }}
            >
              Showing {repos.slice(0, 6).length} active repositories
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '18px',
            }}
          >
            {repos.slice(0, 6).map((repo) => {
              const langColor = LANGUAGE_COLORS[repo.language] || '#8B95A6';
              return (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotlight-card border-beam"
                  style={{
                    backgroundColor: '#111115',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div>
                    {/* Top Row: Repo Name & External Link */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '15px',
                          fontWeight: 700,
                          color: 'var(--text)',
                        }}
                      >
                        <GitBranch size={16} style={{ color: 'var(--accent)' }} />
                        <span>{repo.name}</span>
                      </div>
                      <ExternalLink size={13} style={{ color: 'var(--text-dim)' }} />
                    </div>

                    {/* Repo Description */}
                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: 'var(--text-muted)',
                        minHeight: '38px',
                      }}
                    >
                      {repo.description || 'Public engineering repository with modular architecture and clean code.'}
                    </p>
                  </div>

                  {/* Bottom Meta Row: Language, Stars, Updated Time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-dim)',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {repo.language && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: langColor,
                            }}
                          />
                          <span>{repo.language}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={11} />
                        <span>{repo.stargazers_count || 0}</span>
                      </div>
                    </div>

                    <div>
                      <span>Updated {formatRelativeTime(repo.updated_at)}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
