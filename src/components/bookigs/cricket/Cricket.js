import React from 'react';
import cricket from '../../../constants/cricket.json';
import Slots from '../../shared/slots/Slots.js';
import './Cricket.css';

const Cricket = () => {
  const [groundName, setGroundName] = React.useState('');

  return (
    <div className="cricket-container">
      <div className="ground-list">
        {cricket.map((field) => (
          <div
            key={field.id}
            className={`ground-card ${groundName === field.name ? "active" : ""}`}
            onClick={() => setGroundName(field.name)}
          >
            {field.name}
          </div>
        ))}
      </div>

      {groundName && (
        <>
          <h2 className="ground-title">{groundName}</h2>
          <Slots slots={cricket.find(field => field.name === groundName)?.slots} />
        </>
      )}
    </div>
  );
};

export default Cricket;
