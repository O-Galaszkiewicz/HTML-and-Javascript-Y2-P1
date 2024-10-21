export class Deck {
    cards = [];

    constructor() {
        const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(
                    {
                        rank: rank,
                        suit: suit,
                        src: `../images/Cards/${suit}/${rank}.svg`
                    });
            }
        }
    }

    addCard() {
        const index = Math.floor(this.cards.length * Math.random());
        const card = this.cards[index];
        this.cards.splice(index, 1);
        return card;
    }

}