// Theme-aware style utilities for admin components
// These use CSS variables that change based on data-theme attribute

export const adminStyles = {
  // Backgrounds
  bg: 'var(--admin-bg)',
  cardBg: 'var(--admin-card-bg)',
  hoverBg: 'var(--admin-hover-bg)',
  inputBg: 'var(--admin-input-bg)',
  
  // Text colors
  text: 'var(--admin-text)',
  textMuted: 'var(--admin-text-muted)',
  
  // Borders
  border: 'var(--admin-border)',
  inputBorder: 'var(--admin-input-border)',
  
  // Utility classes for inline styles
  card: {
    backgroundColor: 'var(--admin-card-bg)',
    borderColor: 'var(--admin-border)',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  
  input: {
    backgroundColor: 'var(--admin-input-bg)',
    borderColor: 'var(--admin-input-border)',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: 'var(--admin-text)',
  },
  
  textPrimary: {
    color: 'var(--admin-text)',
  },
  
  textSecondary: {
    color: 'var(--admin-text-muted)',
  },
};


