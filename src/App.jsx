import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TopSection from './components/TopSection';
import StatsPanel from './components/StatsPanel';
import TeamCompositionOverview from './components/TeamCompositionOverview';

const App = () => {
  const [champions, setChampions] = useState([]);
  const [redTeamPicks, setRedTeamPicks] = useState([]);
  const [blueTeamPicks, setBlueTeamPicks] = useState([]);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const version = '14.9.1';

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const data = await response.json();
        setChampions(Object.values(data.data));
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    };

    fetchChampions();
  }, []);

  const handleTeamUpdate = (blueTeam, redTeam) => {
    setBlueTeamPicks(blueTeam);
    setRedTeamPicks(redTeam);
  };

  const formatRedTeamPicks = () => {
    if (!Array.isArray(redTeamPicks)) return [];

    // Special cases mapping for Data Dragon API to our counter picks data
    const specialCases = {
      'MonkeyKing': 'Wukong',
      'BelVeth': 'Belveth',
      'KaiSa': 'Kaisa',
      'KhaZix': 'Khazix',
      'KogMaw': 'Kogmaw',
      'RekSai': 'Reksai',
      'VelKoz': 'Velkoz',
      'DrMundo': 'Dr. Mundo',
      'JarvanIV': 'Jarvan IV',
      'AurelionSol': 'Aurelion Sol',
      'TahmKench': 'Tahm Kench',
      'TwistedFate': 'Twisted Fate',
      'XinZhao': 'Xin Zhao',
      'MasterYi': 'Master Yi',
      'MissFortune': 'Miss Fortune',
      'LeeSin': 'Lee Sin',
      'LeBlanc': 'LeBlanc'
    };

    return redTeamPicks
      .filter(champion => champion !== null && champion !== undefined)
      .map(champion => ({
        champion: Object.entries(specialCases).find(
          ([key, value]) => key === champion
        )?.[1] || champion,
        role: 'unknown'
      }));
  };

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={{
            ...styles.draftSection,
            flex: isOverviewExpanded ? '0 0 400px' : '0 0 500px'
          }}>
            <TopSection 
              champions={champions} 
              onTeamUpdate={handleTeamUpdate}
            />
          </div>
          <div style={styles.overviewSection}>
            <div style={styles.overviewHeader}>
              <h2 style={styles.sectionTitle}>Team Composition Overview</h2>
              <button 
                onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                style={styles.expandButton}
                title={isOverviewExpanded ? "Show less" : "Show more"}
              >
                {isOverviewExpanded ? '▼' : '▲'}
              </button>
            </div>
            {(blueTeamPicks.length > 0 || redTeamPicks.length > 0) ? (
              <TeamCompositionOverview 
                blueTeam={blueTeamPicks}
                redTeam={redTeamPicks}
              />
            ) : (
              <div style={styles.placeholderText}>
                Start drafting to see team composition analysis...
              </div>
            )}
          </div>
        </div>
        <div style={styles.rightColumn}>
            <StatsPanel enemyTeam={formatRedTeamPicks()} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    height: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    gap: '20px',
    padding: '20px',
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
  },
  leftColumn: {
    flex: '0 0 65%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    overflow: 'hidden',
  },
  rightColumn: {
    flex: '0 0 35%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    overflow: 'hidden',
  },
  draftSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'flex 0.3s ease',
  },
  overviewSection: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    padding: '20px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  overviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: '#1a1a1a',
    zIndex: 10,
    paddingBottom: '10px',
    borderBottom: '2px solid #3498db',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    margin: 0,
  },
  expandButton: {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    width: '32px',
    height: '32px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  placeholderText: {
    color: '#666',
    fontSize: '1.1rem',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '40px 20px',
    background: 'rgba(52, 152, 219, 0.1)',
    borderRadius: '8px',
    border: '1px dashed rgba(52, 152, 219, 0.3)',
    margin: 'auto',
    width: '100%',
    maxWidth: '500px',
  },
};

export default App;



