import React, { useState, useEffect } from 'react';

const Timer = ({ isActive, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Reset timer when isActive changes
    setTimeLeft(30);
    
    if (!isActive) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (onTimeout) {
            onTimeout();
          }
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isActive, onTimeout]);

  return (
    <div style={styles.timerContainer}>
      <div style={{
        ...styles.timer,
        color: timeLeft <= 10 ? '#ff4444' : '#fff',
        animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none',
      }}>
        {timeLeft}s
      </div>
    </div>
  );
};

const styles = {
  timerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
  },
  timer: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transition: 'color 0.3s ease',
  },
};

// Add the animation to index.css
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`, styleSheet.cssRules.length);

export default Timer; 