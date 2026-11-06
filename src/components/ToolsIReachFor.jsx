import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { skillsData, skillsCategories } from '../data/skills';
import { soundManager } from '../utils/sound';

export default function ToolsIReachFor() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    soundManager.playClick();
    setActiveCategory(category);
  };

  return (
    <section
      id="skills"
      style={{
        padding: '100px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        backgroundColor: 'rgba(9, 9, 12, 0.6)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-tag">// SKILLS & TOOLING</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginBottom: '16px',
            }}
          >
            Tools I{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #7C5CFF 50%, #FF7B54 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Reach For
            </span>
          </h2>
          <p className="section-desc" style={{ maxWidth: '680px' }}>
            A battle-tested spectrum of mobile frameworks, backend systems, database engines, and AI vision APIs I use daily to architect high-performance software.
          </p>
        </div>

        {/* Controls: Search Bar & Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          {/* Top Row: Search Input */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a skill (e.g. Flutter, FastAPI)..."
              style={{
                width: '100%',
                padding: '13px 40px 13px 44px',
                backgroundColor: 'rgba(18, 18, 22, 0.85)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.boxShadow = '0 0 16px var(--accent-glow)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter Pills Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {skillsCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive
                      ? '1px solid #00D4FF'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: isActive
                      ? '#00D4FF'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? '#090909' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 0 16px rgba(0, 212, 255, 0.4)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = 'var(--text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid (Matches Image 1) */}
        {filteredSkills.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(18, 18, 22, 0.5)',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-dim)',
            }}
          >
            No tooling matches "{searchQuery}". Try selecting "All" or a different category.
          </div>
        ) : (
          <div className="tools-grid">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="spotlight-card border-beam"
                style={{
                  backgroundColor: 'rgba(18, 18, 22, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = skill.color;
                  e.currentTarget.style.boxShadow = `0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px ${skill.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Header: Icon + Name (left), Percentage (right) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                      fontWeight: 600,
                    }}
                  >
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar Track & Glowing Color Fill */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.percentage}%`,
                      backgroundColor: skill.color,
                      borderRadius: '999px',
                      boxShadow: `0 0 8px ${skill.color}88`,
                      transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
