import React from 'react';
import Timer from './Timer';

const BlueTeamDraft = ({ isActive = false, picks = [], onTimeout }) => {
  const slots = Array(5).fill(null);
  const isDraftComplete = picks.length === 5;

  // Helper function to format champion name for image URL
  const formatChampionNameForImage = (name) => {
    // Special cases for Data Dragon API
    const imageSpecialCases = {
      'Wukong': 'MonkeyKing',
      'Belveth': 'BelVeth',
      'Kaisa': 'KaiSa',
      'Khazix': 'KhaZix',
      'Kogmaw': 'KogMaw',
      'Reksai': 'RekSai',
      'Velkoz': 'VelKoz',
      'DrMundo': 'DrMundo',
      'JarvanIV': 'JarvanIV',
      'AurelionSol': 'AurelionSol',
      'TahmKench': 'TahmKench',
      'TwistedFate': 'TwistedFate',
      'XinZhao': 'XinZhao',
      'MasterYi': 'MasterYi',
      'MissFortune': 'MissFortune',
      'LeeSin': 'LeeSin',
      'LeBlanc': 'Leblanc'
    };

    // Remove any special characters and spaces first
    const formattedName = name.replace(/[^a-zA-Z]/g, '');
    return imageSpecialCases[name] || formattedName;
  };

  return (
    <div style={{
      ...styles.box,
      ...(isActive && styles.activeTeam)
    }}>
      {isActive && !isDraftComplete && <Timer isActive={isActive} onTimeout={onTimeout} />}
      <div style={styles.slotsContainer}>
        {slots.map((_, index) => (
          <div key={index} style={styles.pickSlot}>
            {picks[index] ? (
              <div style={styles.championPick}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${formatChampionNameForImage(picks[index])}.png`}
                  alt={picks[index]}
                  style={styles.championImage}
                />
                <span style={styles.championName}>{picks[index]}</span>
              </div>
            ) : (
              <div style={{
                ...styles.emptySlot,
                ...(isActive && !isDraftComplete && index === picks.length && styles.activeEmptySlot)
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: '#d0e8ff',
    height: '100%',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  activeTeam: {
    boxShadow: '0 0 15px rgba(0, 122, 204, 0.5)',
    border: '2px solid #0078cc',
  },
  slotsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  pickSlot: {
    flex: '0 1 17%',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  emptySlot: {
    height: '100%',
    backgroundColor: 'rgba(0, 122, 204, 0.1)',
    border: '2px dashed rgba(0, 122, 204, 0.4)',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  activeEmptySlot: {
    animation: 'blueSlotPulse 2s infinite',
    backgroundColor: 'rgba(0, 122, 204, 0.2)',
    border: '2px dashed rgba(0, 122, 204, 0.8)',
    boxShadow: '0 0 10px rgba(0, 122, 204, 0.3)',
  },
  championPick: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  championImage: {
    width: '56px',
    height: '56px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
  },
  championName: {
    color: '#333',
    fontSize: '1rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)',
  },
};

// Add the animation to index.css
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes blueSlotPulse {
    0% { 
      background-color: rgba(0, 122, 204, 0.1);
      border-color: rgba(0, 122, 204, 0.4);
      box-shadow: 0 0 5px rgba(0, 122, 204, 0.2);
    }
    50% { 
      background-color: rgba(0, 122, 204, 0.3);
      border-color: rgba(0, 122, 204, 1);
      box-shadow: 0 0 15px rgba(0, 122, 204, 0.5);
    }
    100% { 
      background-color: rgba(0, 122, 204, 0.1);
      border-color: rgba(0, 122, 204, 0.4);
      box-shadow: 0 0 5px rgba(0, 122, 204, 0.2);
    }
  }
`, styleSheet.cssRules.length);

export default BlueTeamDraft;

