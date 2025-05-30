import React from 'react';
import './TeamCompositionOverview.css';

const TeamCompositionOverview = ({ blueTeam, redTeam }) => {
  // Helper function to analyze team composition
  const analyzeTeamComp = (team) => {
    const analysis = {
      damage: { physical: 0, magical: 0, true: 0 },
      roles: new Set(),
      cc: 0,
      engage: 0,
      poke: 0,
      teamfight: 0,
      splitPush: 0,
      scaling: 0
    };

    team.forEach(champion => {
      // This is a placeholder for champion analysis
      // In a real implementation, this would use actual champion data
      // to calculate these values based on champion attributes
      analysis.roles.add('placeholder');
    });

    return analysis;
  };

  const blueTeamAnalysis = analyzeTeamComp(blueTeam);
  const redTeamAnalysis = analyzeTeamComp(redTeam);

  const renderTeamSection = (teamName, picks, analysis) => (
    <div className={`team-section ${teamName.toLowerCase()}-team`}>
      <h3 className="team-title">{teamName} Team</h3>
      <div className="team-picks-overview">
        {picks.map((champion, index) => (
          <div key={index} className="champion-overview">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${champion}.png`}
              alt={champion}
              className="champion-icon"
            />
            <span className="champion-name">{champion}</span>
          </div>
        ))}
      </div>
      <div className="composition-stats">
        <div className="stat-group">
          <h4>Damage Profile</h4>
          <div className="damage-bars">
            <div className="damage-bar">
              <span className="label">Physical</span>
              <div className="bar-container">
                <div className="bar physical" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="damage-bar">
              <span className="label">Magical</span>
              <div className="bar-container">
                <div className="bar magical" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="stat-group">
          <h4>Team Strengths</h4>
          <div className="strength-indicators">
            <div className="strength-item">
              <span className="label">Teamfight</span>
              <div className="strength-bar">
                <div className="bar" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="strength-item">
              <span className="label">Pick Potential</span>
              <div className="strength-bar">
                <div className="bar" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="strength-item">
              <span className="label">Split Push</span>
              <div className="strength-bar">
                <div className="bar" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="stat-group">
          <h4>Power Spikes</h4>
          <div className="power-spikes">
            <div className="spike-phase">
              <span className="label">Early Game</span>
              <div className="spike-indicator" data-strength="medium"></div>
            </div>
            <div className="spike-phase">
              <span className="label">Mid Game</span>
              <div className="spike-indicator" data-strength="high"></div>
            </div>
            <div className="spike-phase">
              <span className="label">Late Game</span>
              <div className="spike-indicator" data-strength="low"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="team-composition-overview">
      {renderTeamSection('Blue', blueTeam, blueTeamAnalysis)}
      <div className="composition-comparison">
        <h4>Composition Comparison</h4>
        <div className="comparison-bars">
          <div className="comparison-item">
            <span className="label">Engage Potential</span>
            <div className="comparison-bar">
              <div className="blue-bar" style={{ width: '45%' }}></div>
              <div className="red-bar" style={{ width: '55%' }}></div>
            </div>
          </div>
          <div className="comparison-item">
            <span className="label">Scaling</span>
            <div className="comparison-bar">
              <div className="blue-bar" style={{ width: '60%' }}></div>
              <div className="red-bar" style={{ width: '40%' }}></div>
            </div>
          </div>
          <div className="comparison-item">
            <span className="label">Objective Control</span>
            <div className="comparison-bar">
              <div className="blue-bar" style={{ width: '50%' }}></div>
              <div className="red-bar" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
      {renderTeamSection('Red', redTeam, redTeamAnalysis)}
    </div>
  );
};

export default TeamCompositionOverview; 