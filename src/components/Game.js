import { useEffect, useState } from "react";
import { createDeck } from "../utils/deck"
import Card from "./Card";
import React from "react";
import { shuffle } from "../utils/deck";
import CardDisplay from "./CardDisplay";

export const Game = () => {
    const [gameOver, setGamerOver] = useState(true);
    const [winner, setWinner] = useState('');
    const [player1Hand, setPlayer1Hand] = useState([]);
    const [player2Hand, setPlayer2Hand] = useState([]);
    const [turn, setTurn] = useState('');
    const [discardPile, setDiscardPile] = useState([]);
    const [activePile, setActivePile] = useState([]);
    const [currentColour, setCurrentColour] = useState('');
    const [currentValue, setCurrentValue] = useState('');


    useEffect(() => {
      const deck = createDeck();
      // shuffle(deck);
      console.log('Deck after shuffle:', deck);
      console.log('Initial deck size = ' + deck.length)
      setPlayer1Hand(deck.splice(0, 7));
      console.log('I added cards to player 1');
      setPlayer2Hand(deck.splice(0, 7));
      console.log('I added cards to player 2');
      const firstCard = deck.splice(0,1)[0];
      setDiscardPile([firstCard]);
      console.log('First card:', firstCard);
      console.log('Discard pile top card: ', discardPile[0]);
      console.log('COLOUR: ' + firstCard.colour + '\nCurrent Value: ' + firstCard.value);
      if (firstCard && firstCard.colour && firstCard.value) {
        setCurrentColour(firstCard.colour);
        setCurrentValue(firstCard.value);
        console.log('COLOUR: ' + firstCard.colour + '\nCurrent Value: ' + firstCard.value);
      } else {
        console.log('CARD INVALID');
      }
      console.log('Deck size: '+ deck.length);
      setActivePile(deck);
    }, []);


    console.log('Discard size: ' + discardPile.length);


    return (
      <div className="game">
          <h1>UNO Game</h1>
          <CardDisplay cards={activePile} title="DECK" />
          <CardDisplay cards={player1Hand} title="Player 1 Hand" />
          <CardDisplay cards={player2Hand} title="Player 2 Hand" />
          <CardDisplay cards={discardPile} title="Discard Pile" />
          <div className="current-card">
              <h3>Current Card</h3>
              <p>Color: {currentColour}</p>
              <p>Value: {currentValue}</p>
          </div>
      </div>
  );
}
