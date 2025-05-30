import React from 'react';
import './TeamCompositionOverview.css';

const TeamCompositionOverview = ({ blueTeam, redTeam }) => {
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
      'LeBlanc': 'Leblanc',
      'Chogath': 'Chogath'
    };

    // Remove any special characters and spaces first
    const formattedName = name.replace(/[^a-zA-Z]/g, '');
    return imageSpecialCases[name] || formattedName;
  };

  // Champion data mapping for analysis
  const championData = {
    // AD Carries
    'Ashe': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 3, engage: 3, poke: 4 },
    'Caitlyn': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 2, engage: 1, poke: 5 },
    'Jinx': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 2, engage: 1, poke: 3 },
    'Kaisa': { damage: 'mixed', scaling: 'late', role: 'marksman', cc: 0, engage: 3, poke: 2 },
    'Vayne': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 2, engage: 1, poke: 1 },
    'Ezreal': { damage: 'mixed', scaling: 'mid', role: 'marksman', cc: 0, engage: 2, poke: 5 },
    'Lucian': { damage: 'physical', scaling: 'mid', role: 'marksman', cc: 0, engage: 3, poke: 3 },
    'Tristana': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 2, engage: 3, poke: 2 },
    'Twitch': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 1, engage: 2, poke: 2 },
    'Xayah': { damage: 'physical', scaling: 'late', role: 'marksman', cc: 3, engage: 2, poke: 2 },
    
    // Mages
    'Ahri': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 3, engage: 4, poke: 3 },
    'Annie': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 4, engage: 4, poke: 2 },
    'Lux': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 3, engage: 2, poke: 5 },
    'Syndra': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 3, engage: 2, poke: 4 },
    'Viktor': { damage: 'magical', scaling: 'late', role: 'mage', cc: 2, engage: 1, poke: 4 },
    'Orianna': { damage: 'magical', scaling: 'late', role: 'mage', cc: 3, engage: 4, poke: 3 },
    'Veigar': { damage: 'magical', scaling: 'late', role: 'mage', cc: 3, engage: 2, poke: 3 },
    'Brand': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 2, engage: 2, poke: 4 },
    'Xerath': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 2, engage: 1, poke: 5 },
    'Ziggs': { damage: 'magical', scaling: 'mid', role: 'mage', cc: 2, engage: 1, poke: 5 },
    
    // Tanks
    'Maokai': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 4, engage: 4, poke: 2 },
    'Ornn': { damage: 'mixed', scaling: 'mid', role: 'tank', cc: 5, engage: 5, poke: 2 },
    'Sion': { damage: 'mixed', scaling: 'late', role: 'tank', cc: 3, engage: 4, poke: 2 },
    'Malphite': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 3, engage: 5, poke: 2 },
    'Nautilus': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 4, engage: 4, poke: 1 },
    'Leona': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 5, engage: 5, poke: 1 },
    'Sejuani': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 4, engage: 4, poke: 1 },
    'Zac': { damage: 'magical', scaling: 'mid', role: 'tank', cc: 4, engage: 5, poke: 1 },
    
    // Fighters
    'Darius': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 2, engage: 3, poke: 1 },
    'Garen': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 1, engage: 2, poke: 1 },
    'Riven': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 2, engage: 4, poke: 1 },
    'Aatrox': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 3, engage: 3, poke: 2 },
    'Irelia': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 2, engage: 4, poke: 1 },
    'Jax': { damage: 'mixed', scaling: 'late', role: 'fighter', cc: 2, engage: 3, poke: 1 },
    'Renekton': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 2, engage: 3, poke: 1 },
    'Wukong': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 3, engage: 4, poke: 1 },
    'Briar': { damage: 'physical', scaling: 'mid', role: 'fighter', cc: 2, engage: 4, poke: 1 },
    'Chogath': { damage: 'magical', scaling: 'late', role: 'tank', cc: 3, engage: 3, poke: 2 },
    
    // Assassins
    'Zed': { damage: 'physical', scaling: 'mid', role: 'assassin', cc: 0, engage: 4, poke: 3 },
    'Katarina': { damage: 'magical', scaling: 'mid', role: 'assassin', cc: 0, engage: 3, poke: 2 },
    'Talon': { damage: 'physical', scaling: 'mid', role: 'assassin', cc: 1, engage: 4, poke: 2 },
    'Akali': { damage: 'magical', scaling: 'mid', role: 'assassin', cc: 1, engage: 4, poke: 2 },
    'Fizz': { damage: 'magical', scaling: 'mid', role: 'assassin', cc: 1, engage: 4, poke: 2 },
    'LeBlanc': { damage: 'magical', scaling: 'mid', role: 'assassin', cc: 2, engage: 4, poke: 3 },
    'Khazix': { damage: 'physical', scaling: 'mid', role: 'assassin', cc: 0, engage: 3, poke: 2 },
    'Rengar': { damage: 'physical', scaling: 'mid', role: 'assassin', cc: 0, engage: 4, poke: 1 },
    
    // Supports
    'Lulu': { damage: 'magical', scaling: 'mid', role: 'support', cc: 4, engage: 2, poke: 3 },
    'Thresh': { damage: 'magical', scaling: 'mid', role: 'support', cc: 4, engage: 5, poke: 2 },
    'Soraka': { damage: 'magical', scaling: 'mid', role: 'support', cc: 2, engage: 1, poke: 3 },
    'Janna': { damage: 'magical', scaling: 'mid', role: 'support', cc: 4, engage: 2, poke: 3 },
    'Nami': { damage: 'magical', scaling: 'mid', role: 'support', cc: 4, engage: 3, poke: 3 },
    'Pyke': { damage: 'physical', scaling: 'mid', role: 'support', cc: 3, engage: 5, poke: 2 },
    'Senna': { damage: 'physical', scaling: 'late', role: 'support', cc: 2, engage: 2, poke: 4 },
    'Yuumi': { damage: 'magical', scaling: 'late', role: 'support', cc: 2, engage: 1, poke: 3 }
  };

  // Helper function to analyze team composition
  const analyzeTeamComp = (team) => {
    const analysis = {
      damage: { physical: 0, magical: 0, mixed: 0 },
      roles: new Set(),
      cc: 0,
      engage: 0,
      poke: 0,
      teamfight: 0,
      scaling: { early: 0, mid: 0, late: 0 }
    };

    team.forEach(champion => {
      const data = championData[champion] || {
        damage: 'physical',
        scaling: 'mid',
        role: 'unknown',
        cc: 2,
        engage: 2,
        poke: 2
      };

      // Update damage profile
      if (data.damage === 'physical') analysis.damage.physical++;
      else if (data.damage === 'magical') analysis.damage.magical++;
      else if (data.damage === 'mixed') {
        analysis.damage.physical += 0.5;
        analysis.damage.magical += 0.5;
      }

      // Update roles
      analysis.roles.add(data.role);

      // Update combat stats
      analysis.cc += data.cc;
      analysis.engage += data.engage;
      analysis.poke += data.poke;
      analysis.teamfight += (data.cc + data.engage) / 2;

      // Update scaling
      if (data.scaling === 'early') analysis.scaling.early++;
      else if (data.scaling === 'mid') analysis.scaling.mid++;
      else if (data.scaling === 'late') analysis.scaling.late++;
    });

    // Normalize values
    const total = team.length || 1;
    analysis.cc /= total;
    analysis.engage /= total;
    analysis.poke /= total;
    analysis.teamfight /= total;

    return analysis;
  };

  const blueTeamAnalysis = analyzeTeamComp(blueTeam);
  const redTeamAnalysis = analyzeTeamComp(redTeam);

  // Calculate relative strengths (as percentages)
  const calculateStrength = (value, max = 5) => (value / max) * 100;

  const renderTeamSection = (teamName, picks, analysis) => (
    <div className={`team-section ${teamName.toLowerCase()}-team`}>
      <h3 className="team-title">{teamName} Team</h3>
      <div className="team-picks-overview">
        {picks.map((champion, index) => (
          <div key={index} className="champion-overview">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${formatChampionNameForImage(champion)}.png`}
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
                <div 
                  className="bar physical" 
                  style={{ width: `${(analysis.damage.physical / picks.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="damage-bar">
              <span className="label">Magical</span>
              <div className="bar-container">
                <div 
                  className="bar magical" 
                  style={{ width: `${(analysis.damage.magical / picks.length) * 100}%` }}
                ></div>
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
                <div className="bar" style={{ width: `${calculateStrength(analysis.teamfight)}%` }}></div>
              </div>
            </div>
            <div className="strength-item">
              <span className="label">Engage</span>
              <div className="strength-bar">
                <div className="bar" style={{ width: `${calculateStrength(analysis.engage)}%` }}></div>
              </div>
            </div>
            <div className="strength-item">
              <span className="label">Poke</span>
              <div className="strength-bar">
                <div className="bar" style={{ width: `${calculateStrength(analysis.poke)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="stat-group">
          <h4>Power Spikes</h4>
          <div className="power-spikes">
            <div className="spike-phase">
              <span className="label">Early Game</span>
              <div className="spike-indicator" data-strength={
                analysis.scaling.early > analysis.scaling.mid && analysis.scaling.early > analysis.scaling.late
                  ? "high"
                  : analysis.scaling.early > 0 ? "medium" : "low"
              }></div>
            </div>
            <div className="spike-phase">
              <span className="label">Mid Game</span>
              <div className="spike-indicator" data-strength={
                analysis.scaling.mid >= analysis.scaling.early && analysis.scaling.mid >= analysis.scaling.late
                  ? "high"
                  : analysis.scaling.mid > 0 ? "medium" : "low"
              }></div>
            </div>
            <div className="spike-phase">
              <span className="label">Late Game</span>
              <div className="spike-indicator" data-strength={
                analysis.scaling.late > analysis.scaling.mid && analysis.scaling.late > analysis.scaling.early
                  ? "high"
                  : analysis.scaling.late > 0 ? "medium" : "low"
              }></div>
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
              <div 
                className="blue-bar" 
                style={{ width: `${(blueTeamAnalysis.engage / (blueTeamAnalysis.engage + redTeamAnalysis.engage)) * 100}%` }}
              ></div>
              <div 
                className="red-bar" 
                style={{ width: `${(redTeamAnalysis.engage / (blueTeamAnalysis.engage + redTeamAnalysis.engage)) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="comparison-item">
            <span className="label">Teamfight</span>
            <div className="comparison-bar">
              <div 
                className="blue-bar" 
                style={{ width: `${(blueTeamAnalysis.teamfight / (blueTeamAnalysis.teamfight + redTeamAnalysis.teamfight)) * 100}%` }}
              ></div>
              <div 
                className="red-bar" 
                style={{ width: `${(redTeamAnalysis.teamfight / (blueTeamAnalysis.teamfight + redTeamAnalysis.teamfight)) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="comparison-item">
            <span className="label">Poke</span>
            <div className="comparison-bar">
              <div 
                className="blue-bar" 
                style={{ width: `${(blueTeamAnalysis.poke / (blueTeamAnalysis.poke + redTeamAnalysis.poke)) * 100}%` }}
              ></div>
              <div 
                className="red-bar" 
                style={{ width: `${(redTeamAnalysis.poke / (blueTeamAnalysis.poke + redTeamAnalysis.poke)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {renderTeamSection('Red', redTeam, redTeamAnalysis)}
    </div>
  );
};

export default TeamCompositionOverview; 