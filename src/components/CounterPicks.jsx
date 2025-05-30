import React, { useState } from 'react';
import counterPicksData from '../data/counterPicks.json';
import './CounterPicks.css';

const CounterPicks = ({ championName }) => {
  const [failedImages, setFailedImages] = useState(new Set());

  if (!championName) return null;

  // Format champion name to match our data structure
  const formattedChampName = championName.replace(/[^a-zA-Z]/g, '');
  
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

  // Try to find the champion in our data structure
  let championData = counterPicksData[formattedChampName];
  
  // If not found, try the special cases
  if (!championData) {
    // First try direct lookup in special cases
    const specialCaseName = Object.entries(specialCases).find(([key, value]) => 
      value.toLowerCase() === championName.toLowerCase()
    );
    
    if (specialCaseName) {
      championData = counterPicksData[specialCaseName[1].replace(/[^a-zA-Z]/g, '')];
    }
    
    // If still not found, try reverse lookup
    if (!championData) {
      const reverseLookup = Object.entries(specialCases).find(([key, value]) => 
        key.toLowerCase() === formattedChampName.toLowerCase()
      );
      if (reverseLookup) {
        championData = counterPicksData[reverseLookup[1].replace(/[^a-zA-Z]/g, '')];
      }
    }
  }

  if (!championData) return null;

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
      'Dr. Mundo': 'DrMundo',
      'Jarvan IV': 'JarvanIV',
      'Aurelion Sol': 'AurelionSol',
      'Tahm Kench': 'TahmKench',
      'Twisted Fate': 'TwistedFate',
      'Xin Zhao': 'XinZhao',
      'Master Yi': 'MasterYi',
      'Miss Fortune': 'MissFortune',
      'Lee Sin': 'LeeSin',
      'LeBlanc': 'Leblanc'
    };

    // Check for exact match in special cases first
    if (imageSpecialCases[name]) {
      return imageSpecialCases[name];
    }

    // Remove any special characters and spaces
    const formattedName = name.replace(/[^a-zA-Z]/g, '');
    
    // Check if the formatted name matches any special case
    const specialCase = Object.entries(imageSpecialCases).find(([key, value]) => 
      key.replace(/[^a-zA-Z]/g, '').toLowerCase() === formattedName.toLowerCase()
    );

    return specialCase ? specialCase[1] : formattedName;
  };

  const getChampionImageUrl = (championName) => {
    const formattedName = formatChampionNameForImage(championName);
    return `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${formattedName}.png`;
  };

  const handleImageError = (championName) => {
    setFailedImages(prev => new Set([...prev, championName]));
  };

  return (
    <div className="counter-picks-container" style={{ padding: '8px', marginBottom: '8px' }}>
      <h3 className="counter-picks-title" style={{ 
        fontSize: '1.1rem', 
        marginBottom: '6px',
        fontWeight: '600',
        color: '#e4e4e4'
      }}>
        Counters to {championName}
      </h3>
      
      <div className="counter-description" style={{ 
        fontSize: '0.85rem', 
        padding: '4px', 
        marginBottom: '6px',
        color: '#a0a0a0',
        lineHeight: '1.4'
      }}>
        <p>{championData.description}</p>
      </div>

      <div className="counters-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        width: '100%'
      }}>
        {championData.counters.map((counter, index) => (
          <div key={counter} className="counter-card" style={{
            padding: '6px 4px 4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(26, 32, 44, 0.95)',
            borderRadius: '4px',
            gap: '2px'
          }}>
            <div className="counter-image" style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid #3498db',
              background: failedImages.has(counter) ? '#1a202c' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!failedImages.has(counter) && (
                <img
                  src={getChampionImageUrl(counter)}
                  alt={counter}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={() => handleImageError(counter)}
                />
              )}
            </div>
            <div className="counter-info" style={{ 
              textAlign: 'center',
              lineHeight: '1',
              marginTop: '2px'
            }}>
              <h4 style={{ 
                fontSize: '0.95rem', 
                margin: 0,
                fontWeight: '500',
                color: '#e4e4e4',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                lineHeight: '1.1'
              }}>{counter}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterPicks; 