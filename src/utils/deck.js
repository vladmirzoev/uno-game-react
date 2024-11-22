import Card from "../components/Card";

const colours = ["yellow", "blue", "red", "green"];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', 'Skip', 'Reverse']

export const createDeck = () => {
    let deck = [];

    for (let colour of colours) {
        for (let value of values) {
            switch (value) {
                case '0':
                    deck.push({ colour, value });
                    break;
                default:
                    deck.push({ colour, value });
                    deck.push({ colour, value });
                    break;
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        deck.push({ colour: "black", value: "Change Colour"});
        deck.push({ colour: "black", value: "+4"});
    }
    
    return deck;
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

// export const shuffle = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
//       // swap elements array[i] and array[j]
//       // we use "destructuring assignment" syntax to achieve that
//       // you'll find more details about that syntax in later chapters
//       // same can be written as:
//       // let t = array[i]; array[i] = array[j]; array[j] = t
//       [array[i], array[j]] = [array[j], array[i]];
//     }
// }

export const drawCards = (deck, numCards) => {
    return {
      drawnCards: deck.slice(-numCards),
      remainingDeck: deck.slice(0, -numCards)
    };
};
  
// export const reshuffleDiscardPile = (discardPile) => {
//     const topCard = discardPile[discardPile.length - 1];
//     const reshuffledDeck = shuffle(discardPile.slice(0, -1));
//     return [topCard, ...reshuffledDeck];
// };