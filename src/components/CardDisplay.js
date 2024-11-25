import React from 'react';
import Card from './Card';

const CardDisplay = ({ cards, title }) => {
  return (
    <div className="card-display">
      <h3>{title}</h3>
      <div className="card-list">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <Card colour={card.colour} value={card.value} />
            {/* <p>{card.colour} | {card.value}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;