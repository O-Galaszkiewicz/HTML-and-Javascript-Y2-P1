// Imports
import { Deck } from "./deck.mjs";
import { Modal } from "../webpages-js/modal.mjs";
import { AuthSystem } from "../webpages-js/userdata.mjs";

// Main Class
class Blackjack {
    // Store all variables
    deck;
    playerCardDiv;
    dealerCardDiv;
    playerCards = [];
    dealerCards = [];
    playerTotal = 0;
    dealerTotal = 0;
    betVal = 0;
    currentBet = 0;
    playerStands = false;
    playerAceAs11 = false;
    dealerAceAs11 = false;
    dealerFirstCardSrc;
    dealerFirstCardElement;

    constructor() {
        // Initialize the Classes and Card Containers
        this.deck = new Deck();
        this.modalInstance = new Modal();
        this.userDataInstance = new AuthSystem();
        this.playerCardDiv = document.querySelector("#playerCardDiv");
        this.dealerCardDiv = document.querySelector("#dealerCardDiv");

        // Initialize Buttons
        this.hitButton = document.getElementById("hitButton");
        this.standButton = document.getElementById("standButton");
        this.betButton = document.getElementById("betButton");

        // Initialize Values
        this.betVal = document.getElementById("betVal");
        this.betModalStr = "betModal";

        // Button Event Handlers
        this.betButton.onclick = () => {
            this.confirmBet();
        }

        this.hitButton.onclick = () => {
            this.hit("player");
        }

        this.standButton.onclick = () => {
            this.stand();
        }

        // Initialize the Bet Modal
        this.modalInstance.hideModal(this.betModalStr);
        this.modalInstance.rulesModal(this.betModalStr);
    }

    // hit:
    // For a given person, add a card via addCard from deck
    hit(person) {
        // Use the addCard method from the Deck class
        const card = this.deck.addCard();
        const cardValue = this.getCardVal(card, person);
        console.log(cardValue)
        const newCardImg = document.createElement("img");
        newCardImg.src = card.src;

        // If the person is the Player, append card to their deck
        if (person === "player") {
            this.playerCardDiv.appendChild(newCardImg);
            this.playerCards.push(card);
            this.playerTotal += cardValue;
        }
        // If the person is the Dealer, append card to their deck
        else if (person === "dealer") {
            // If the Dealers card is the first one, hide it
            if (!this.dealerFirstCardElement) {
                this.dealerFirstCardSrc = card.src;
                newCardImg.src = "../images/Cards/hidden.svg";
                this.dealerFirstCardElement = newCardImg;
            }
            // Otherwise, use the normal image
            else {
                newCardImg.src = card.src
            }
            this.dealerCards.push(card);
            this.dealerTotal += cardValue;
            this.dealerCardDiv.appendChild(newCardImg);
        }

        // Call handleAces for that person to determine if the Ace is a 1
        // or an 11, then check the Total
        this.handleAces(person);
        this.checkTotal();
    }

    // handleAces:
    // Depending on the person, their respective Total will increase by 11
    // if possible otherwise by 1
    handleAces(person) {
        // If the person is the Player and their Total is more than 21
        // and have an Ace, take 10 from their Total since the Ace becomes a 1
        if (person === "player" && this.playerTotal > 21 && this.playerAceAs11) {
            this.playerTotal -= 10;
            this.playerAceAs11 = false;
        }
        // If its the Dealer, do the same logic like for the Player
        else if (person === "dealer" && this.dealerTotal > 21 && this.dealerAceAs11) {
            this.dealerTotal -= 10;
            this.dealerAceAs11 = false;
        }
    }

    // revealDealerCard:
    // Main method for revealing the hidden card of the Dealer
    revealDealerCard() {
        // If the Dealers first card has an element and original source,
        // change the element source to the original
        if (this.dealerFirstCardElement && this.dealerFirstCardSrc) {
            this.dealerFirstCardElement.src = this.dealerFirstCardSrc;
        }
    }

    // stand:
    // When the Player hits the stand button, the Dealer will play
    stand() {
        this.playerStands = true;
        this.revealDealerCard();
        this.dealer();
    }

    // confirmBet:
    // Checks if the user bet input is valid then hides the popup window,
    // it takes the bet value from the players' score and stores the bet
    // in currentBet, it starts the game after everything is done
    confirmBet() {
        const betAmount = parseInt(this.betVal.value);
        const data = this.userDataInstance.getUserData();
        const balance = data.score || 0;
        let betReason = "";

        // If the user doesnt enter anything or if the bet is 0 or less,
        // warn them
        if (isNaN(betAmount) || betAmount <= 0) {
            betReason = "Please enter a valid bet amount.";
            document.getElementById("betReason").textContent = betReason;
            return;
        } else if (betAmount > balance) {
            betReason = "Insufficient balance for this bet.";
            document.getElementById("betReason").textContent = betReason;
            return;
        }

        // Once the input is valid, take the bet from the players score
        // and update their score while saving the bet in the game
        data.score = balance - betAmount;
        this.userDataInstance.setUserData(data.score);
        this.currentBet = betAmount;

        // Console only - Tell the user their bet and new balance
        // I don't know a good way to indicate it to the Player after the bet
        // has been made
        console.log(`Starting Bet: ${betAmount}, New Balance: ${data.score}`);

        // Hides the modal and starts the game
        this.modalInstance.hideModal(this.betModalStr)
        this.initiateGame();
    }

    // getCardVal:
    // Gets the cards rank and returns an appropriate value
    getCardVal(card, person) {
        // If the card rank is between 2 and 10, return their rank
        // (worth face value)
        if (card.rank >= 2 && card.rank <= 10) {
            return card.rank;
        }
        // If the card rank is more than 10 (Jack, Queen and King),
        // return 10 since they are only worth 10
        else if (card.rank >= 11 && card.rank <= 13) {
            return 10;
        }
        // If the card rank is 1 (an Ace)
        else if (card.rank === 1) {
            // If the person is the Player, adjust their Total
            if (person === "player") {
                // If the Total is 21 or less after 11 has been added,
                // return 11 and store that the Player got an 11 Ace as true
                // otherwise return 1 (face value)
                if (!this.playerAceAs11 && (this.playerTotal + 11 <= 21)) {
                    this.playerAceAs11 = true;
                    return 11;
                } else {
                    return 1;
                }
            }
            // If the person is the Dealer, do the same logic as from the Player
            else if (person === "dealer") {
                if (!this.dealerAceAs11 && (this.dealerTotal + 11 <= 21)) {
                    this.dealerAceAs11 = true;
                    return 11;
                } else {
                    return 1;
                }
            }
        }
    }

    // dealer:
    // Main Dealer logic, Dealer must stop once their Total is 17 or above
    dealer() {
        if (this.dealerTotal >= 17 && this.dealerTotal <= 21) {
            this.checkTotal();
        } else {
            do {
                this.hit("dealer");
            } while (this.dealerTotal < 17)
        }
    }

    // endGame:
    // Uses the bet value and multiplier to change the earnings from the game
    endGame(multiplier) {
        const data = this.userDataInstance.getUserData();

        // Calculate winnings and update Player balance
        const winnings = this.currentBet * multiplier;
        data.score += winnings;

        // Update local storage with new balance
        this.userDataInstance.setUserData(data.score);

        // Tell the user their earnings and new balance
        console.log(`Game Over. Winnings: ${winnings}, New Balance: ${data.score}`);
    }

    // checkBlackjack:
    // Only at start - Check if either the Player or Dealer got blackjack
    // to prevent the Player or Dealer from going past 21 since they already
    // won the game
    checkBlackjack() {
        let resultMessage = "";
        let resultReason = "";

        if (this.dealerTotal === 21 && this.playerTotal !== 21) {
            resultMessage = "Blackjack";
            resultReason = "Dealer wins!";
            this.revealDealerCard();
            this.endGame(0);
        } else if (this.playerTotal === 21 && this.dealerTotal !== 21) {
            resultMessage = "Blackjack";
            resultReason = "Player wins!";
            this.revealDealerCard();
            this.endGame(2.5);
        }

        // If there is a result message and reason send it to the
        // displayResultModal method
        if (resultMessage && resultReason) {
            this.modalInstance.resultModal(resultMessage, resultReason);
        }
    }

    // checkTotal:
    // Check the players and Dealers Total for if they won or lost
    checkTotal() {
        let resultMessage = "";
        let resultReason = "";

        // Lose condition - Bust
        if (this.playerTotal > 21) {
            resultMessage = "You Lose";
            resultReason = "Player busts!";
            this.revealDealerCard();
            this.endGame(0);
        }
        // If the Player stands and the Dealer Total is 17 or more
        if (this.playerStands && this.dealerTotal >= 17) {
            // Lose condition - Dealer has more than Player and has 21 or less
            if (this.dealerTotal > this.playerTotal && (this.dealerTotal <= 21 && this.dealerTotal >= 17)) {
                resultMessage = "You Lose";
                resultReason = "Dealer wins!";
                this.endGame(0);
            }

            // Draw - Dealer and Player have the same Total
            else if (this.dealerTotal === this.playerTotal) {
                resultMessage = "Push";
                resultReason = "It's a tie!";
                this.endGame(1);
            }

            // Win condition - Player has more than Dealer and has 21 or less
            else if (this.playerTotal > this.dealerTotal && (this.playerTotal <= 21 && this.playerTotal >= 17)) {
                resultMessage = "You Win";
                resultReason = "Player wins!";
                this.endGame(2);
            }
            // Win condition - Dealer busts
            else if (this.dealerTotal > 21) {
                resultMessage = "You Win";
                resultReason = "Dealer busts!";
                this.endGame(2);
            }
        }

        // If there is a result message and reason send it to the
        // displayResultModal method
        if (resultMessage && resultReason) {
            this.modalInstance.resultModal(resultMessage, resultReason);
        }
    }

    // initiateGame:
    // Calls the hit method twice for both Player and Dealer
    // to get two cards each as Blackjack is
    initiateGame() {
        // Hits twice for Player and Dealer like in real blackjack,
        // afterwards check if either the Player or Dealer already got
        // blackjack
        this.hit("player");
        this.hit("player");
        this.hit("dealer");
        this.hit("dealer");
        this.checkBlackjack();
    }
}

// Initialize the Blackjack class
document.addEventListener("DOMContentLoaded", () => {
    new Blackjack();
})