// Main Class
export class Deck {
    // Store all variables
    cards = [];

    constructor() {
        const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        // Iterate over each suit in the suits array
        for (let suit of suits) {
            // Iterate over each rank in the ranks array
            for (let rank of ranks) {
                // Create a card object with its rank, suit and image source
                this.cards.push(
                    {
                        rank: rank,
                        suit: suit,
                        src: `../images/Cards/${suit}/${rank}.svg`
                    });
            }
        }
    }

    // addCard:
    // Uses random to randomly generate cards when called
    addCard() {
        const index = Math.floor(this.cards.length * Math.random());
        const card = this.cards[index];
        this.cards.splice(index, 1);
        return card;
    }
}