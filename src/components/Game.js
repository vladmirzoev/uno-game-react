import { act, useCallback, useEffect, useState } from "react";
import { createDeck } from "../utils/deck"
import Card from "./Card";
import React from "react";
import { shuffle } from "../utils/deck";
import CardDisplay from "./CardDisplay";

export const Game = () => {
    const [gameOver, setGamerOver] = useState(true);
    const [winner, setWinner] = useState('');
    const [players, setPlayers] = useState([]);
    const [player1Hand, setPlayer1Hand] = useState([]);
    const [player2Hand, setPlayer2Hand] = useState([]);
    const [turn, setTurn] = useState(0);
    const [discardPile, setDiscardPile] = useState([]);
    const [activePile, setActivePile] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentColour, setCurrentColour] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    // const playGame = () => {
    //   while (!isGameOver){
        
    //   }
    // }
    const isGameOver = () => {
      if (isWinner(turn)){
        return true;
      }
    }
    const isWinner = (playerIndex) => {
      if (players[playerIndex].length === 0) {
        console.log('There is a WINNER!', `\nCOngrats, player ${playerIndex+1}`)
        return true;
      }
    }

    const nextPlayer = () => {
      setTurn((prevTurn) => {
        const nextPlayer = prevTurn + 1;
        return nextPlayer % players.length;
      })
    }

    const initializeGame = useCallback(() => {
      console.log('Starting the game!');
      const deck = createDeck();
      shuffle(deck);

      const numPlayers = 2; //to be changed
      const initialHands = [];

      //dealing cards to each player
      for (let i = 0; i < numPlayers; i++) {
        initialHands.push(deck.splice(0, 7));
      }
      console.log("Players' hands: ", initialHands);

      //getting first card
      const firstCard = deck.splice(0,1)[0];
      setDiscardPile([firstCard]);

      setPlayers(initialHands);
      setCurrentCard(firstCard);
      setActivePile(deck);
      console.log("First Card ", firstCard);
    }, []);

    useEffect(() => {
      initializeGame();
    }, [initializeGame]);

    const isCurrentPlayer = (playerIndex) => {
      if (playerIndex !== turn) {
        return false;
      }
      return true;
    };

    const makeMove = (action) => {
      if (!isCurrentPlayer){
        alert("Sorry, it's not your turn!");
        return;
      }
      switch (action) {
        case "draw":
          drawCard(turn);
          nextPlayer();
          break;
        case "play":
          if (selectedCard !== null){
            playCard(turn, selectedCard);
            setSelectedCard(null);
            nextPlayer();
          }
          break;
        default:
          return;
      }
    }

    const drawCard = (playerIndex) => {
      reshuffleDeck(activePile);
      
      setActivePile((prevPile) => {
        const newPile = [...prevPile];
        const drawnCard = newPile.pop();
        setPlayers((prevPlayers) => {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[turn] = [...updatedPlayers[turn], drawnCard];
          return updatedPlayers;
        });
        console.log('DRAWING CARD')
        console.log(`Player ${playerIndex + 1}`, "\ndrew: ", drawnCard);
        return newPile;
      });

    };

    const playCard = (playerIndex, cardIndex) => {
      const currentPlayerHand = players[playerIndex];
      const playedCard = currentPlayerHand[cardIndex];
      if (!isValidMove(playedCard)) {
        console.log('Invalid Move. Card returned to player\'s hand');
        return;
      }
      setPlayers((prevPlayers) => {
        const newPlayers = prevPlayers.map((player, index) => {
          if (index === playerIndex) {
            // Remove the played card from this player's hand
            return player.filter((_, i) => i !== cardIndex);
          }
          return player; // Return other players' hands unchanged
        });
        return newPlayers;
      });

      setDiscardPile((prevDiscardPile) => {
        return prevDiscardPile.concat(playedCard);
      });

      //update the active card
      setCurrentCard(playedCard);
      //documentating the move
      console.log(`Player: ${playerIndex+1} \nPlayed: ${playedCard.colour} | ${playedCard.value}`);


      //   const updatedPlayers = [...prevPlayers];
      //   const playedCard = updatedPlayers[playerIndex].splice(cardIndex, 1)[0];
      //   if (isValidMove(playedCard)) {
      //     setDiscardPile((prevDiscardPile) => {
      //       return prevDiscardPile.concat(playedCard);
      //     });
      //     //update the active card
      //     setCurrentCard(playedCard);
      //     //documentating the move
      //     console.log(`Player: ${playerIndex+1} \nPlayed: ${playedCard.colour} | ${playedCard.value}`);

      //   } else {
          
      //   }
      //   return updatedPlayers;
      // })
    };

    console.log('Discard size: ' + discardPile.length);


    const reshuffleDeck = (array) => {
      if (array.length === 0) {
        const newDeck = shuffle([...discardPile.slice(0, -1)]);
        setActivePile(newDeck);
        setDiscardPile([discardPile[discardPile.length - 1]]);
      }
    }

    const isValidMove = (card) => {
      //implement logic here
      return true;
    }

    const handleCardClick = (cardIndex) => {
      setSelectedCard(cardIndex);
      console.log("You selected card: ", players[turn][cardIndex]);
    };

    return (
      <div className="game">
          <h1>UNO Game</h1>
          <CardDisplay cards={activePile} title="DECK" />
          <div className="game-controls">
            <button onClick={() => makeMove('draw')} >DRAW</button>
            <button onClick={() => makeMove('play')} disabled={selectedCard === null}>PLAY CARD</button>
          </div>
          {/* <CardDisplay cards={players[turn]} title={`Hand of Player ${turn+1}`}/> */}
          {/* <CardDisplay cards={player1Hand} title="Player 1 Hand" />
          <CardDisplay cards={player2Hand} title="Player 2 Hand" /> */}
          <div className="current-player">
                <h2>Current Player {turn + 1}</h2>
                <div className="player-hand">
                    {players[turn] && players[turn].map((card, index) => (
                        <div 
                            key={index} 
                            className={`card ${selectedCard === index ? 'selected' : ''} ${card.colour}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {card.colour} {card.value}
                        </div>
                    ))}
                </div>
            </div>
          <CardDisplay cards={discardPile} title="Discard Pile" />
          <div className="current-card">
              <h3>Current Card</h3>
              {currentCard && (
                <>
                  <p>Color: {currentCard.colour}</p>
                  <p>Value: {currentCard.value}</p>
                </>
              )}
          </div>
          {/* <CardDisplay cards={players[0]} title={"Player 1 cards:"} />; */}
      </div>
  );
}
