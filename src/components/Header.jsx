import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>League of Legends Draft Coach</h1>
      <div style={styles.glow} />
    </header>
  );
};

const styles = {
  header: {
    position: 'relative',
    height: '60px',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',  // plain white text
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(circle at 20% 50%, rgba(0, 122, 204, 0.5), transparent 80%),' +  // blue glow from left
      'radial-gradient(circle at 80% 50%, rgba(204, 0, 0, 0.5), transparent 80%)',     // red glow from right
    animation: 'pulseGlow 4s ease-in-out infinite alternate',
    pointerEvents: 'none',
  },
};

// Add the animations
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
  @keyframes pulseGlow {
    0% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
    100% {
      opacity: 0.4;
      transform: scale(1);
    }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    50% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }
`, styleSheet.cssRules.length);

export default Header;


