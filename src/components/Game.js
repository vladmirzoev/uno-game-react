import { useEffect, useState } from "react";
import { createDeck } from "../utils/deck"
import Card from "./Card";
import React from "react";
import { shuffle } from "../utils/deck";

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
      shuffle(deck);
      console.log('Initial deck size = ' + deck.length)
      setPlayer1Hand(deck.splice(0, 7));
      console.log('I added cards to player 1');
      setPlayer2Hand(deck.splice(0, 7));
      console.log('I added cards to player 2');
      const firstCard = deck.splice(0,1);
      setDiscardPile([firstCard]);
      // setCurrentColour(currentCard.colour);
      // setCurrentValue(currentCard.value);
      // discardPile.push(currentCard);
      console.log('COLOUR: ' + currentColour + '\nCurrent Value: ' + currentValue);
      console.log('Deck size: '+ deck.length);
    }, []);


    console.log('Discard size: ' + discardPile.length);

    // const [deck, setDeck] = useState([]);
    // const [players, setPlayers] = useState([
    //     { id: 1, hand: [] },
    //     { id: 2, hand: [] },
    // ]);

    // // const [currentPlayer, setCurrentPlayer] = useState(0);
    // // const [discardPile, setDiscardPile] = useState([]);
    // // const [direction, setDirection] = useState(1);

    // useEffect(() => {
    //     startGame();
    // }, []);

    // const startGame = () => {
    //     const newDeck = createDeck();
    //     if (!Array.isArray(newDeck)) {
    //         console.error('createDeck did not return an array:', newDeck);
    //         return;
    //     }
    //     const { drawnCards: player1Hand, remainingDeck: deckAfterPlayer1 } = drawCards(newDeck, 7);
    //     const { drawnCards: player2Hand, remainingDeck: deckAfterPlayer2 } = drawCards(deckAfterPlayer1, 7);
    //     const { drawnCards: [firstCard], remainingDeck: finalDeck } = drawCards(deckAfterPlayer2, 1);
        

    //     setDeck(finalDeck);
    //     setPlayers([
    //         { id: 1, hand: player1Hand },
    //         { id: 2, hand: player2Hand },
    //     ])
    //     setDiscardPile([firstCard]);
    // }

    // const handleDrawCard = () => {
    //     if (deck.length === 0) {
    //         const updatedDeck = reshuffleDiscardPile(discardPile);
    //         setDeck(updatedDeck.slice(1));
    //         setDiscardPile(updatedDeck[0]);
    //     }

    //     const { drawnCards: [drawCard], remainingDeck } = drawCards(deck, 1);
    //     const updatedPlayers = [...players];
    //     updatedPlayers[currentPlayer].hand.push(drawCard);
    //     setPlayers(updatedPlayers);
    //     setDeck(remainingDeck);
    //     nextTurn();
    // };

    // const nextTurn = () => {
    //     setCurrentPlayer((prevPlayer) => {
    //       // Calculate the next player index
    //       const nextPlayer = (prevPlayer + direction + players.length) % players.length;
    //       return nextPlayer;
    //     });
    //   };

    //   const playCard = (cardIndex) => {
    //     const playerHand = players[currentPlayer].hand;
    //     const cardToPlay = playerHand[cardIndex];
    //     const topCard = discardPile[discardPile.length - 1];
    
    //     if (canPlayCard(cardToPlay, topCard)) {
    //       // Remove the card from the player's hand
    //       const updatedPlayers = [...players];
    //       updatedPlayers[currentPlayer].hand.splice(cardIndex, 1);
    //       setPlayers(updatedPlayers);
    
    //       // Add the card to the discard pile
    //       setDiscardPile([...discardPile, cardToPlay]);
    
    //       // Handle special cards
    //       handleSpecialCard(cardToPlay);
    
    //       // Check for win condition
    //       if (updatedPlayers[currentPlayer].hand.length === 0) {
    //         alert(`Player ${currentPlayer + 1} wins!`);
    //         startGame();
    //         return;
    //       }
    
    //       nextTurn();
    //     } else {
    //       alert("You can't play this card!");
    //     }
    //   };
    
    //   const canPlayCard = (card, topCard) => {
    //     return (
    //       card.color === topCard.color ||
    //       card.value === topCard.value ||
    //       card.color === 'black'
    //     );
    //   };
    
    //   const handleSpecialCard = (card) => {
    //     switch (card.value) {
    //       case 'Reverse':
    //         setDirection(direction * -1);
    //         break;
    //       case 'Skip':
    //         nextTurn();
    //         break;
    //       case 'Draw Two':
    //         drawCards(2);
    //         nextTurn();
    //         break;
    //       case 'Wild Draw Four':
    //         drawCards(4);
    //         nextTurn();
    //         break;
    //       default:
    //         break;
    //     }
    //   };
    //   const drawCards = (deck, numCards) => {
    //     if (!Array.isArray(deck)) {
    //         console.error('Deck is not an array:', deck);
    //         return { drawnCards: [], remainingDeck: [] };
    //       }
        
    //       const drawnCards = deck.slice(-numCards);
    //       const remainingDeck = deck.slice(0, -numCards);
        
    //       return { drawnCards, remainingDeck };
        // if (!deck || deck.length < numCards) {
        //   console.warn('Not enough cards in the deck to draw');
        //   return { drawnCards: [], remainingDeck: deck };
        // }
        // const updatedPlayers = [...players];
        // const nextPlayerIndex = (currentPlayer + direction + players.length) % players.length;
        // const drawnCards = deck.slice(-numCards);
        // const remainingDeck = deck.slice(0, -numCards);
        // for (let i = 0; i < numCards; i++) {
        //     if (deck.length === 0) {
        //     const newDeck = discardPile.slice(0, -1);
        //     setDeck(shuffle(newDeck));
        //     setDiscardPile([discardPile[discardPile.length - 1]]);
        //     }
        //     const drawnCard = deck.pop();
        //     updatedPlayers[nextPlayerIndex].hand.push(drawnCard);
        // }
        // setPlayers(updatedPlayers);
        // setDeck([...deck]);
        // return { drawnCards, remainingDeck };
      // };
    //   const drawCards = (numCards) => {
    //     const updatedPlayers = [...players];
    //     const nextPlayerIndex = (currentPlayer + direction + players.length) % players.length;
    //     for (let i = 0; i < numCards; i++) {
    //       if (deck.length === 0) {
    //         const newDeck = discardPile.slice(0, -1);
    //         setDeck(shuffle(newDeck));
    //         setDiscardPile([discardPile[discardPile.length - 1]]);
    //       }
    //       const drawnCard = deck.pop();
    //       updatedPlayers[nextPlayerIndex].hand.push(drawnCard);
    //     }
    //     setPlayers(updatedPlayers);
    //     setDeck([...deck]);
    //   };
    
    //   const nextTurn = () => {
    //     setCurrentPlayer((currentPlayer + direction + players.length) % players.length);
    //   };
    
      // const shuffle = (array) => {
      //   for (let i = array.length - 1; i > 0; i--) {
      //     const j = Math.floor(Math.random() * (i + 1));
      //     [array[i], array[j]] = [array[j], array[i]];
      //   }
      //   return array;
      // };

    const cardsList = activePile.map( card => 
        <li>{card}</li>
    );


    return (
        <div className="game">
           <div className="game__hand">
              <h3>Player 1 hand size: {player1Hand.length}</h3>
                {player1Hand.map((card, cardIndex) => (
                    <Card key={cardIndex} colour={card.color} value={card.value} />
                ))}
            </div>
           <div className="game__hand">
              <h3>Player 2 hand size: {player2Hand.length}</h3>
                {player2Hand.map((card, cardIndex) => (
                    <Card key={cardIndex} colour={card.color} value={card.value} />
                ))}
            </div>
            <div className="game__deck">
            <h3>Discard Pile: {discardPile.length}</h3>
                {discardPile.length > 0 && (
                <Card colour={discardPile[0].colour} value={discardPile[0].value} />
                )}
            </div>
            {/* <h1 className="game__title">UNO Game</h1>
            <button onClick={startGame}>Start game!</button>

            <div className="game__deck">
                <h2>Entire Deck (test)</h2>
                <div className="game__deck-cards">
                    <ul>{cardsList}</ul>
                    
                   
                </div>
            </div>
            
            <div className="game__players">
                {players.map((player, index) => (
                <div key={player.id} className={`game__player ${index === currentPlayer ? 'game__player--active' : ''}`}>
                    <h2>Player {player.id}</h2>
                    <div className="game__hand">
                        {player.hand.map((card, cardIndex) => (
                            <Card key={cardIndex} colour={card.color} value={card.value} />
                        ))}
                    </div>
                    <button className="game__draw-button" onClick={drawCards}> Draw A Card! </button>
                </div>
                ))}
            </div>
         
            <div className="game__discard-pile">
                <h3>Discard Pile</h3>
                {discardPile.length > 0 && (
                <Card colour={discardPile[discardPile.length - 1].colour} value={discardPile[discardPile.length - 1].value} />
                )}
            </div> */}
        </div>
    );
}
