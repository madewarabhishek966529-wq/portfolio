/**
 * Theme & Accent Color Manager
 * Provides dynamic accent color switching with persistent localStorage memory.
 */

export const ACCENT_THEMES = [
  { id: 'crimson', name: 'Editorial Crimson', color: '#e32b3c', glow: 'rgba(227, 43, 60, 0.25)' },
  { id: 'lime', name: 'Cyber Lime', color: '#b0ff4d', glow: 'rgba(176, 255, 77, 0.25)' },
  { id: 'cyan', name: 'Electric Cyan', color: '#64e8ff', glow: 'rgba(100, 232, 255, 0.25)' },
  { id: 'orange', name: 'Sunset Orange', color: '#FF3B00', glow: 'rgba(255, 59, 0, 0.25)' },
  { id: 'violet', name: 'Neon Violet', color: '#b87cff', glow: 'rgba(184, 124, 255, 0.25)' },
];

export function applyAccentTheme(themeId) {
  const theme = ACCENT_THEMES.find((t) => t.id === themeId) || ACCENT_THEMES[0];
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--accent', theme.color);
    document.documentElement.style.setProperty('--accent-glow', theme.glow);
    try {
      localStorage.setItem('abhishek_portfolio_theme', theme.id);
    } catch (e) {}
  }
  return theme;
}

export function getInitialTheme() {
  if (typeof window === 'undefined') return ACCENT_THEMES[0];
  try {
    const saved = localStorage.getItem('abhishek_portfolio_theme');
    const matched = ACCENT_THEMES.find((t) => t.id === saved);
    if (matched) return matched;
  } catch (e) {}
  return ACCENT_THEMES[0];
}

