import React, { useState } from 'react';
import './ChampionSelector.css';

const ChampionSelector = ({ champions = [], onChampionSelect, onLockIn, onReset, pickedChampions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChampion, setSelectedChampion] = useState(null);
  const version = '14.9.1';

  console.log('ChampionSelector: Current picked champions:', pickedChampions);

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChampionClick = (champion) => {
    console.log('Champion clicked:', champion.name);
    if (pickedChampions.includes(champion.name)) {
      console.log('Champion already picked:', champion.name);
      return;
    }
    setSelectedChampion(champion);
    if (onChampionSelect) {
      onChampionSelect(champion);
    }
  };

  const handleLockIn = () => {
    console.log('Locking in champion:', selectedChampion?.name);
    if (selectedChampion && onLockIn) {
      onLockIn(selectedChampion);
      setSelectedChampion(null);
      setSearchTerm(''); // Clear search after lock-in
    }
  };

  const handleReset = () => {
    console.log('Resetting champion selection');
    setSelectedChampion(null);
    setSearchTerm('');
    if (onReset) {
      onReset();
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="champion-selector">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="champion-grid-container">
        <div className="champion-grid">
          {filteredChampions.length > 0 ? (
            filteredChampions.map((champion) => (
              <div
                key={champion.id}
                className={`champion-item ${
                  pickedChampions.includes(champion.name) ? 'picked' : ''
                } ${selectedChampion?.id === champion.id ? 'selected' : ''}`}
                onClick={() => handleChampionClick(champion)}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                />
                <div className="champion-name">{champion.name}</div>
              </div>
            ))
          ) : (
            <div className="no-results">No champions found</div>
          )}
        </div>
      </div>
      <div className="controls">
        <button className="control-button" onClick={handleReset}>
          Reset
        </button>
        <button
          className="control-button"
          onClick={handleLockIn}
          disabled={!selectedChampion}
        >
          Lock In
        </button>
      </div>
    </div>
  );
};

export default ChampionSelector;



