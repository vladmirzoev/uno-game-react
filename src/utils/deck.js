import Card from "../components/Card";

const colours = ["red", "yellow", "blue", "green"];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', 'Skip', 'Reverse']

export const createDeck = () => {
    let deck = [];

    for (let colour of colours) {
        for (let value of values) {
            switch (value) {
                case '0':
                    deck.push(Card({ colour, value }));
                    break;
                default:
                    deck.push(Card({ colour, value }));
                    deck.push(Card({ colour, value }));
                    break;
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        deck.push(Card({ colour: "black", value: "Change Colour"}));
        deck.push(Card({ colour: "black", value: "+4"}));
    }
    
    return shuffle(deck);
}

// const shuffle = (deckArray) => {
//     let currentIndex = deckArray.length;

//   // While there remain elements to shuffle...
//     while (currentIndex !== 0) {

//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [deckArray[currentIndex], deckArray[randomIndex]] = [deckArray[randomIndex], deckArray[currentIndex]];
//   }
//   alert('DEck was shuffled')
//   for (let card in deckArray) {
//     console.log(card);
//   }
  
// }

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const drawCards = (deck, numCards) => {
    return {
      drawnCards: deck.slice(-numCards),
      remainingDeck: deck.slice(0, -numCards)
    };
};
  
export const reshuffleDiscardPile = (discardPile) => {
    const topCard = discardPile[discardPile.length - 1];
    const reshuffledDeck = shuffle(discardPile.slice(0, -1));
    return [topCard, ...reshuffledDeck];
};