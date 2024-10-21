/*
Rules of the Game:
    Objective:
        Player must beat the dealer by having a higher card total without going over 21

    Card Values:
        2 -> 10 = Face Value
        J, Q, K = 10
        Ace = 1 or 11 (only at start, adding more cards resets to 1)

    Definitions:
        Blackjack = an Ace and a card worth 10 points (21 total)
        Hole = the dealer's card that is face down
        Hit = draw another card
        Stand = take no more cards
        Bust = going over 21

    How to Play:
        Players place bets by putting the desired number of chips
        Dealer deals two cards:
            Player gets two visible cards
            Dealer gets one visible card and on hidden (Hole)
        The Dealer asks player each turn if they hit or stand (double or split start only)
        Once the player stands, the dealer reveals their hole card and either hits or stands
        Dealer stops hitting once they reach a card total 17 or higher

    Winning:
        If the Player total is higher than Dealer, 
        Dealer busts 
        If the card total is not higher than 21

    Payouts:
        Blackjack: 2.5x
        Both Player and Dealer get Blackjack: 1x
        Higher Total than Dealer: 2x
        Lower Total than Dealer: 0x

    Optional:
        Can only Double at start:
            Gain one card only and double the bet
        Can split at start
            Get two decks with additional cards, play each deck one by one
*/

/*
Classes and Methods:

Method 1 - Win-Loss Handling:
    If player loses - multiply score by 0
    If player ties - multiply score by 1
    If player beats dealer or dealer goes bust - multiply score by 2
    If player gets blackjack - multiply score by 2.5

Method 2 - Bet Size:
    Player inputs a value
    It gets taken away from player score
    Input value is stored
    Use Win-Loss Handling to multiply input value and add it to player score

Method 5 - Split:
    When split button is pushed, create a new deck with the second card
    Calculate the total deck value and check against the Win-Loss Handling

Method 6 - Double:
    When double button is pushed, double the bet and add a new card to the deck
    Switch to dealer

Method 7 - Dealer:
    Dealer will hit until the total deck value is 17 or more

Method 8 - Deck Value:
    Will add the value of cards to return the total deck value

...

*/
import {Deck} from './deck.mjs';

class Blackjack {
    deck;
    dealImg;
    
    constructor() {
        this.dealImg = document.querySelector('#cardImg');
        
        // Buttons
        this.hitButton = document.getElementById('hitButton');
        this.standButton = document.getElementById('standButton');
        this.betButton = document.getElementById('betButton');
        this.deck = new Deck();
        
        // Values
        this.betVal = document.getElementById('betVal');
        
        // Player
        
        this.betButton.onclick = ()=> {
            this.bet();
        }
    
        this.standButton.onclick = ()=> {
            this.stand();
        }
    
        this.hitButton.onclick = ()=> {
            this.hit();
        }
    }
    
    hit() {
        // Call addCard method
        // Push the return into array
        // Call gameCondition method
        const card = this.deck.addCard();
        this.dealImg.src = card.src;
        console.log(card);
    }

    stand() {
        // Call dealer
    }

    bet() {
        // If the Bet input is more than player score, send error
        // Else:
        //     Store Bet input
        //     Take it from player score
    }

    player() {
        playerCards = [];
    }

    dealer() {
        dealerCards = [];
        // Call hit method
        // Push the return into dealer array
        // Call gameCondition method
    }

    deckCards() {
        //
    }

    addCard() {
        //
    }

    gameCondition() {
        // If current deck total is 21+ or less than other deck total, fail (x0 bet)
        // If current deck total is equal to other deck total, tie (x1 bet)
        // If current deck total is greater than other deck total, win (x2 bet)
        // If current deck total is 21 on start, win (x2.5 bet)
    }
}

// Initialize the Blackjack class
document.addEventListener('DOMContentLoaded', () => {
    new Blackjack();
})