import React from 'react';
import Card from './Card';

const Deck = ({ cards, onDraw }) => {
  const isEmpty = () => {
    if (this.length === 1) return true;
    return false;
  }
  return (
    <div className="deck">
      <div className="deck__cards">
        {cards.map((card, index) => (
          <Card key={index} color={card.color} value={card.value} />
        ))}
      </div>
      <button className="deck__draw-button" onClick={onDraw}>Draw Card</button>
    </div>
  );
};

export default Deck;