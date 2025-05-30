import React from 'react';
import CounterPicks from './CounterPicks';
import './StatsPanel.css';

const StatsPanel = ({ enemyTeam }) => {
  const validEnemyTeam = Array.isArray(enemyTeam) 
    ? enemyTeam.filter(pick => pick && typeof pick === 'object' && pick.champion)
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