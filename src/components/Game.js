import { useEffect, useState } from "react";
import { createDeck } from "../utils/deck"
import Card from "./Card";
import React from "react";

export const Game = () => {
    const [deck, setDeck] = useState([]);
    const [players, setPlayers] = useState([
        { id: 1, hand: [] },
        { id: 2, hand: [] },
    ]);

    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [discardPile, setDiscardPile] = useState([]);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        const newDeck = createDeck();
        const { drawnCards: player1Hand, remainingDeck: }
        const player1Hand = newDeck.splice(0, 7);
        const player2Hand = newDeck.splice(0, 7);
        const firstCard = newDeck.splice(0, 1)[0];

        setDeck(newDeck);
        setPlayers([
            { id: 1, hand: player1Hand },
            { id: 2, hand: player2Hand },
        ])
        setDiscardPile([firstCard]);
    }

    const cardsList = deck.map( card => 
        <li>{card}</li>
    );


    return (
        <div className="game">
            <h1 className="game__title">UNO Game</h1>
            <button onClick={startGame}>Start game!</button>
            {/* Display the entire deck */}
            <div className="game__deck">
                <h2>Entire Deck (test)</h2>
                <div className="game__deck-cards">
                    <ul>{cardsList}</ul>
                    
                    {/* {deck.map((card, index) => (
                        <Card key={index} color={card.color} value={card.value} />
                    ))}
                     */}
                </div>
            </div>
            
            <div className="game__players">
                {players.map((player, index) => (
                <div key={player.id} className={`game__player ${index === currentPlayer ? 'game__player--active' : ''}`}>
                    <h2>Player {player.id}</h2>
                    <div className="game__hand">
                        {player.hand.map((card, cardIndex) => (
                            <Card key={cardIndex} color={card.color} value={card.value} />
                        ))}
                    </div>
                </div>
                ))}
            </div>
            <div className="game__discard-pile">
                <h3>Discard Pile</h3>
                {discardPile.length > 0 && (
                <Card color={discardPile[discardPile.length - 1].color} value={discardPile[discardPile.length - 1].value} />
                )}
            </div>
        </div>
    );
}
