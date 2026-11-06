import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Filter, Layers, Sparkles, Github, ExternalLink } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projects';
import { soundManager } from '../utils/sound';
import ProjectDialog from './ProjectDialog';

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.categorySlug === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tag.toLowerCase().includes(query) ||
        project.tools.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // 2026 Interactive 3D Card Tilt & Specular Spotlight Tracker
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section
      id="projects"
      style={{
        padding: '110px 0',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          <div className="section-tag">/ 01 // SELECTED WORK & CASE STUDIES</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <h2 className="section-title">
                PROVEN <span style={{ color: 'var(--accent)' }}>EXPERIENCE</span>
              </h2>
              <p className="section-desc">
                High-stakes product design, enterprise security systems, and interactive digital
                experiences engineered for resilience, micro-motion, and scale.
              </p>
            </div>

            {/* Quick Count Pill */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Showing <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{filteredProjects.length}</span> of {projectsData.length} records
            </div>
          </div>
        </div>

        {/* Filters and Search Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '44px',
            paddingBottom: '20px',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                    fontWeight: isActive ? 700 : 500,
                    boxShadow: isActive ? '0 0 16px var(--accent-glow)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar Input */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }}
            />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
        </div>

        {/* Projects Grid Container with 3D Tilt & Spotlights */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Layers size={32} style={{ color: 'var(--text-dim)', marginBottom: '12px' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', textTransform: 'uppercase' }}>
              No Matching Projects Found
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
              Try adjusting your search terms or filter selection.
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              style={{ marginTop: '16px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '36px',
            }}
          >
            {filteredProjects.map((project, pIdx) => (
              <article
                key={project.id}
                data-swarm-target={`project-node-${pIdx + 1}`}
                className="spotlight-card border-beam clickable"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Thumbnail Image Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '60%',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                  }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Depth Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, transparent 65%)',
                    }}
                  />

                  {/* Tag & Year Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'flex',
                      gap: '8px',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: 'rgba(9, 9, 9, 0.88)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(227, 43, 60, 0.35)',
                      }}
                    >
                      {project.tag}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(9, 9, 9, 0.88)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Featured Star/Badge if applicable */}
                  {project.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'var(--accent)',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        padding: '4px 8px',
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                        boxShadow: '0 0 12px var(--accent-glow)',
                        zIndex: 3,
                      }}
                    >
                      Featured Case
                    </div>
                  )}
                </div>

                {/* Card Content Description */}
                <div
                  style={{
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 3,
                  }}
                >
                  <div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '28px',
                        color: 'var(--text)',
                        lineHeight: 1.05,
                        marginBottom: '10px',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '18px',
                      }}
                    >
                      {project.summary}
                    </p>
                  </div>

                  {/* Footer Tools & Action Link */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '18px',
                      }}
                    >
                      {project.tools.slice(0, 4).map((tool, i) => (
                        <span
                          key={i}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--text-dim)',
                            backgroundColor: '#1b1b1b',
                            padding: '3px 8px',
                            borderRadius: '2px',
                            border: '1px solid #292929',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid #1f1f1f',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--accent)',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Inspect Case Study
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open GitHub Repository"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                            }}
                            onMouseEnter={() => soundManager.playHover()}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #2d2d2d',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-muted)',
                              transition: 'all 0.2s ease',
                              textDecoration: 'none',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--accent)';
                              e.currentTarget.style.color = '#ffffff';
                              e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = '#1a1a1a';
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.borderColor = '#2d2d2d';
                            }}
                          >
                            <Github size={14} />
                          </a>
                        )}

                        {project.liveUrl && project.liveUrl !== project.sourceUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Live Deployment"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                            }}
                            onMouseEnter={() => soundManager.playHover()}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #2d2d2d',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-muted)',
                              transition: 'all 0.2s ease',
                              textDecoration: 'none',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--accent)';
                              e.currentTarget.style.color = '#ffffff';
                              e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = '#1a1a1a';
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.borderColor = '#2d2d2d';
                            }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #2e2e2e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text)',
                            transition: 'all 0.2s ease',
                          }}
                          title="Open Case Study Modal"
                        >
                          <ArrowUpRight size={15} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Full Dialog Modal */}
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
