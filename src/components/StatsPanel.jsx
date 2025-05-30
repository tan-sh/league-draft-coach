import React from 'react';
import CounterPicks from './CounterPicks';
import './StatsPanel.css';

const StatsPanel = ({ enemyTeam }) => {
  // Format champion name to match our data structure
  const formatChampionName = (name) => {
    // Special cases for champion names in our data structure
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

    // First try direct lookup in special cases
    if (specialCases[name]) {
      return specialCases[name];
    }

    // If not found in special cases, try to find a matching special case
    const matchingCase = Object.entries(specialCases).find(([key, value]) => 
      value.toLowerCase() === name.toLowerCase()
    );

    if (matchingCase) {
      return matchingCase[1];
    }

    return name;
  };

  const validEnemyTeam = Array.isArray(enemyTeam) 
    ? enemyTeam
        .filter(pick => pick && typeof pick === 'object' && pick.champion)
        .map(pick => ({
          ...pick,
          champion: formatChampionName(pick.champion)
        }))
    : [];

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <h2>Counter Analysis</h2>
      </div>
      
      {validEnemyTeam.length > 0 ? (
        validEnemyTeam.map((pick, index) => (
          <CounterPicks 
            key={`${pick.champion}-${index}`} 
            championName={pick.champion} 
          />
        ))
      ) : (
        <div className="no-pick-message">
          Select enemy champions to see counter picks
        </div>
      )}
    </div>
  );
};

export default StatsPanel; 