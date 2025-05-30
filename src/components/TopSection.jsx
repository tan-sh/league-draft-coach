import React, { useState, useCallback } from 'react';
import BlueTeamDraft from './BlueTeamDraft';
import ChampionSelector from './ChampionSelector';
import RedTeamDraft from './RedTeamDraft';

const TopSection = ({ champions, onTeamUpdate }) => {
  const [bluePicks, setBluePicks] = useState([]);
  const [redPicks, setRedPicks] = useState([]);
  const [currentTeam, setCurrentTeam] = useState('blue');
  const [selectedChampion, setSelectedChampion] = useState(null);

  // Define the pick order: 1=blue, 2=red
  const pickOrder = [1, 2, 2, 1, 1, 2, 2, 1, 1, 2];

  const getCurrentPickNumber = () => bluePicks.length + redPicks.length;
  const isDraftComplete = () => bluePicks.length === 5 && redPicks.length === 5;

  const getAvailableChampions = useCallback(() => {
    const pickedChampions = [...bluePicks, ...redPicks];
    return champions.filter(champ => !pickedChampions.includes(champ.name));
  }, [bluePicks, redPicks, champions]);

  const handleChampionSelect = useCallback((champion) => {
    setSelectedChampion(champion);
  }, []);

  const handleRandomPick = useCallback(() => {
    const available = getAvailableChampions();
    if (available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      handleLockIn(available[randomIndex]);
    }
  }, [getAvailableChampions]);

  const handleLockIn = useCallback((champion) => {
    const pickNumber = getCurrentPickNumber();
    
    if (pickNumber < pickOrder.length) {
      const pick = champion.name;
      
      if (pickOrder[pickNumber] === 1) {
        setBluePicks(prev => [...prev, pick]);
      } else {
        setRedPicks(prev => [...prev, pick]);
      }
      
      setSelectedChampion(null);
      setCurrentTeam(pickOrder[pickNumber + 1] === 1 ? 'blue' : 'red');
    }
  }, [pickOrder, getCurrentPickNumber]);

  const handleReset = useCallback(() => {
    setBluePicks([]);
    setRedPicks([]);
    setCurrentTeam('blue');
    setSelectedChampion(null);
  }, []);

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.header,
        ...(isDraftComplete() ? styles.headerComplete : {
          background: currentTeam === 'blue' 
            ? 'linear-gradient(90deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.05) 100%)'
            : 'linear-gradient(90deg, rgba(231, 76, 60, 0.2) 0%, rgba(231, 76, 60, 0.05) 100%)',
          borderLeft: `4px solid ${currentTeam === 'blue' ? '#3498db' : '#e74c3c'}`
        })
      }}>
        <div style={styles.pickIndicator}>
          {isDraftComplete() ? (
            <span style={styles.completeText}>DRAFT COMPLETE</span>
          ) : (
            <>
              <span style={styles.pickText}>CHOOSE YOUR CHAMPIONS</span>
              <span style={{
                ...styles.teamIndicator,
                color: currentTeam === 'blue' ? '#3498db' : '#e74c3c',
                borderColor: currentTeam === 'blue' ? '#3498db' : '#e74c3c'
              }}>{currentTeam.toUpperCase()} TEAM</span>
            </>
          )}
        </div>
      </div>
      <div style={styles.draftContainer}>
        <div style={styles.teamColumn}>
          <BlueTeamDraft
            isActive={currentTeam === 'blue'}
            picks={bluePicks}
            onTimeout={handleRandomPick}
          />
        </div>
        <div style={styles.middleColumn}>
          <ChampionSelector
            champions={champions}
            onChampionSelect={handleChampionSelect}
            onLockIn={handleLockIn}
            onReset={handleReset}
            pickedChampions={[...bluePicks, ...redPicks]}
          />
        </div>
        <div style={styles.teamColumn}>
          <RedTeamDraft
            isActive={currentTeam === 'red'}
            picks={redPicks}
            onTimeout={handleRandomPick}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    gap: '10px',
    backgroundColor: '#1a1a1a',
    background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, #1a1a1a 100%)',
  },
  header: {
    height: '40px',
    backgroundColor: '#222',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px',
    transition: 'all 0.5s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  headerComplete: {
    background: 'linear-gradient(-45deg, #3498db, #2ecc71, #e74c3c, #f1c40f)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 8s ease infinite',
    border: 'none',
    boxShadow: '0 0 15px rgba(52, 152, 219, 0.3)',
  },
  pickIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  pickText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '1px',
  },
  completeText: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    animation: 'pulse 2s ease-in-out infinite',
  },
  teamIndicator: {
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: '4px 12px',
    borderRadius: '4px',
    letterSpacing: '0.5px',
    border: '1px solid',
    transition: 'all 0.3s ease',
  },
  draftContainer: {
    display: 'flex',
    flex: 1,
    gap: '10px',
    minHeight: 0,
  },
  teamColumn: {
    flex: '0 0 130px',
    backgroundColor: '#222',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  middleColumn: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  },
};

export default TopSection;
