import { act, useCallback, useEffect, useState } from "react";
import { createDeck } from "../utils/deck"
import Card from "./Card";
import React from "react";
import { shuffle } from "../utils/deck";
import CardDisplay from "./CardDisplay";
import ColourSelector from './ColourSelector'

export const Game = () => {
    const [gameOver, setGamerOver] = useState(true);
    const [winner, setWinner] = useState('');
    const [players, setPlayers] = useState([]);
    const [turn, setTurn] = useState(0);
    const [discardPile, setDiscardPile] = useState([]);
    const [activePile, setActivePile] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectingColour, setSelectingColour] = useState(false);
    const [wildCardToPlay, setWildCardToPlay] = useState(null);



    // const playGame = () => {
    //   while (!isGameOver){
        
    //   }
    // }
    const isGameOver = () => {
      if (isWinner()){
        setWinner(`Player ${turn + 1}`);
        setGamerOver(true);
        alert('game over!')
        return true;
      }
      return false;
    }
    const isWinner = () => {
      if (players[turn].length === 0) {
        console.log('There is a WINNER!', `\nCongrats, player ${turn+1}`)
        return true;
      }
      return false;
    }

    const nextPlayer = () => {
      if (!isGameOver()) {
        
        setTurn((prevTurn) => {
          const nextPlayer = prevTurn + 1;
          return nextPlayer % players.length;
        })
      }
    }

    const initializeGame = useCallback(() => {
      console.log('Starting the game!');
      const deck = createDeck();
      shuffle(deck);

      const numPlayers = 3; //to be changed
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
          updatedPlayers[playerIndex] = [...updatedPlayers[playerIndex], drawnCard];
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
    
      if (playedCard.colour === 'black') {
        handleWildCard(playerIndex, cardIndex, playedCard);
        return;
      }
    
      completeCardPlay(playerIndex, cardIndex, playedCard);
    };

    // const completeCardPlay = (playerIndex, cardIndex, playedCard, selectedColour = null) => {
    //   setPlayers((prevPlayers) => {
    //     const newPlayers = prevPlayers.map((player, index) => {
    //       if (index === playerIndex) {
    //         return player.filter((_, i) => i !== cardIndex);
    //       }
    //       return player;
    //     });
    //     return newPlayers;
    //   });
    
    //   setDiscardPile((prevDiscardPile) => {
    //     return prevDiscardPile.concat(playedCard);
    //   });
    
    //   if (selectedColour) {
    //     // Create a new object based on playedCard, but with the colour changed
    //     const updatedCard = {
    //         ...playedCard,
    //         colour: selectedColour
    //     };
    //     setCurrentCard(updatedCard);
    // } else {
    //     // If no colour was selected, use the original playedCard
    //     setCurrentCard(playedCard);
    // }
    //   console.log(`Player: ${playerIndex+1} \nPlayed: ${playedCard.colour} | ${playedCard.value}`);
    
    //   switch (playedCard.value) {
    //     case "skip":
    //       handleSkip();
    //       break;
    //     case "+2":
    //       handleDrawTwo();
    //       break;
    //     case "wild":
    //     case "wild+4":
    //       if (selectedColour) {
    //         console.log(`Wild card played. New colour: ${selectedColour}`);
    //         nextPlayer();
    //       }
    //       break;
    //     default:
    //       nextPlayer();
    //   }
    // };
    const completeCardPlay = (playerIndex, cardIndex, playedCard, selectedColor = null) => {
      console.log('completeCardPlay called with:', { playerIndex, cardIndex, playedCard, selectedColor });
    
      if (playedCard === undefined) {
        console.error('playedCard is undefined');
        return;
      }
    
      setPlayers((prevPlayers) => {
        const newPlayers = prevPlayers.map((player, index) => {
          if (index === playerIndex) {
            return player.filter((_, i) => i !== cardIndex);
          }
          return player;
        });
        return newPlayers;
      });
    
      const updatedCard = selectedColor ? {...playedCard, colour: selectedColor} : playedCard;
      setDiscardPile((prevDiscardPile) => [...prevDiscardPile, updatedCard]);
      setCurrentCard(updatedCard);
    
      console.log(`Player: ${playerIndex+1} \nPlayed: ${updatedCard.colour} | ${updatedCard.value}`);
    
      // Handle special cards
      switch (updatedCard.value) {
        case "skip":
          handleSkip();
          break;
        case "+2":
          handleDrawTwo();
          break;
        case "Change Colour":
          if (selectedColor) {
            console.log(`Wild card played. New color: ${selectedColor}`);
            nextPlayer();
          }
          break;
        case "+4":
          if (selectedColor) {
            console.log(`Wild card played. New color: ${selectedColor}`);
            nextPlayer();
          }
          handleDrawTwo();
          handleDrawTwo();
          break;
        default:
          nextPlayer();
      }
    };
    console.log('Discard size: ' + discardPile.length);


    const reshuffleDeck = (array) => {
      if (array.length === 0) {
        const newDeck = shuffle([...discardPile.slice(0, -1)]);
        setActivePile(newDeck);
        setDiscardPile([discardPile[discardPile.length - 1]]);
      }
    }

    // Card-specific Functionality
    const handleSkip = () => {
      console.log('Player is skipping their turn');
      nextPlayer();
      nextPlayer();
    }

    const handleDrawTwo = () => {
      const nextPlayerIndex = (turn + 1) % players.length;
      console.log(`Player ${nextPlayerIndex + 1} draws 2 cards`);
      drawCard(nextPlayerIndex);
      drawCard(nextPlayerIndex);
      handleSkip();
    }

    
    const handleWildCard = (playerIndex, cardIndex, card) => {
      setWildCardToPlay({ playerIndex, cardIndex, card });
      setSelectingColour(true);
    };

    // Basic card validation

    const isColourFit = (card) => {
      if (card.colour === currentCard.colour) return true;
      return false;
    }

    const isValueFit = (card) => {
      if (card.value === currentCard.value) return true;
      return false;
    }
    
    const isWild = (card) => {
      if (card.colour === 'black') return true;
      return false;
    }

    // Move Validation

    const isValidMove = (card) => {
      if (isColourFit(card) || isValueFit(card) || isWild(card)) {
        return true;
      }
      alert('INVALID MOVE!')
      return false;
    }

    // UI 

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
            
            {selectingColour && wildCardToPlay && (
              <ColourSelector 
                onColourSelect={(selectedColour) => {
                  setSelectingColour(false);
                  console.log('Calling completeCardPlay with:', { ...wildCardToPlay, selectedColour });
                  completeCardPlay(wildCardToPlay.playerIndex, wildCardToPlay.cardIndex, wildCardToPlay.card, selectedColour);
                  setWildCardToPlay(null);
                }} 
              />
            )}
          <CardDisplay cards={discardPile} title="Discard Pile" />
          <div className="current-card">
              <h3>Current Card</h3>
              {currentCard && (
                <>
                  <p>Colour: {currentCard.colour}</p>
                  <p>Value: {currentCard.value}</p>
                </>
              )}
          </div>
          {/* <CardDisplay cards={players[0]} title={"Player 1 cards:"} />; */}
      </div>
  );
}
