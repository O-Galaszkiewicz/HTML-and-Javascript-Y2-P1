// Imports
import { Dice } from "./dice.mjs";
import { Modal } from "../webpages-js/modal.mjs";
import { AuthSystem } from "../webpages-js/userdata.mjs";

// Main Class
class Hazard {
    // Store all variables
    dice;
    playerDiceDiv;
    playerDice = [];
    playerRoll = 0
    playerMain = 0;
    playerChance = 0;
    playerTurns = 0;
    betVal = 0;
    currentBet = 0;
    oddsTable = {
        4: { 5: 1.2, 6: 0.8, 7: 0.67, 8: 0.8, 9: 1, 10: 1.33 },
        5: { 4: 1.33, 6: 1.25, 7: 0.8, 8: 0.67, 9: 1, 10: 1.33 },
        6: { 4: 1.67, 5: 1.25, 7: 1.2, 8: 1, 9: 1.25, 10: 1.67 },
        7: { 4: 2, 5: 1.5, 6: 1.2, 8: 1.2, 9: 1.5, 10: 2 },
        8: { 4: 1.67, 5: 1.25, 6: 1, 7: 1.2, 9: 0.8, 10: 1.33 },
        9: { 4: 1.33, 5: 1, 6: 0.8, 7: 0.67, 8: 0.8, 10: 1.33 }
    };

    constructor() {
        // Initialize the Classes and Dice Containers
        this.dice = new Dice();
        this.modalInstance = new Modal();
        this.userDataInstance = new AuthSystem();
        this.playerDiceDiv = document.querySelector("#playerDiceDiv");

        // Initialize Buttons
        this.rollDiceButton = document.getElementById("rollDiceButton");
        this.betButton = document.getElementById("betButton");
        this.mainButtons = document.querySelectorAll(".mainButton")

        // Initialize Values
        this.betVal = document.getElementById("betVal");
        this.betModalStr = "betModal";

        // Event listeners
        this.mainButtons.forEach(button => {
            button.onclick = () => {
                this.playerMain = parseInt(button.getAttribute("data-main"))
            }
        })

        // Button Event Handlers
        this.betButton.onclick = () => {
            this.confirmBet();
        }

        this.rollDiceButton.onclick = () => {
            this.roll();
        }

        // Initialize the Rules Modal
        this.modalInstance.hideModal(this.betModalStr);
        this.modalInstance.rulesModal(this.betModalStr);
    }

    // roll:
    // Roll the dice and add it to the Player Total
    roll() {
        this.playerDiceDiv.innerHTML = "";
        this.playerDice = [];
        this.playerRoll = 0;

        for (let i = 0; i < 2; i = i + 1) {
            // Use the addDice method from the Dice class
            const dice = this.dice.addDice();
            const diceValue = this.getDiceVal(dice);
            const newDiceImg = document.createElement("img");
            newDiceImg.src = dice.src;

            // Append result dice to the playerDiceDiv and increase Player Total
            // by the dice value
            this.playerDice.push(dice);
            this.playerRoll += diceValue;
            this.playerDiceDiv.appendChild(newDiceImg);
        }
        this.checkRoll();
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
        } else if (this.playerMain === 0) {
            betReason = "Please select a main number before betting.";
            document.getElementById("betReason").textContent = betReason;
            return;
        }

        // Once the input is valid, take the bet from the players score
        // and update their score while saving the bet in the game
        data.score = balance - betAmount;
        this.userDataInstance.setUserData(data.score);
        this.currentBet = betAmount;

        // Console only - Tell the user their bet and new balance
        // I don't know a good way to indicate it to the player after the bet
        // has been made
        console.log(`Starting Bet: ${betAmount}, New Balance: ${data.score}`);

        // Hides the modal
        this.modalInstance.hideModal(this.betModalStr);
    }

    // getDiceVal:
    // Gets the dice value
    getDiceVal(dice) {
        return dice.face;
    }


    // checkRoll:
    // Check the players roll for if they won or lost
    checkRoll() {
        let resultMessage = "";
        let resultReason = "";

        // Hazard Main Logic:
        if (this.playerChance === 0) {
            // Lose condition - Player rolls a 2 or 3
            if (this.playerRoll === 2 || this.playerRoll === 3) {
                resultMessage = "You Lose";
                resultReason = `You rolled a ${this.playerRoll}, which is an Out.`;
                this.endGame("out")
                this.playerTurns += 1;
            }

            // Lose condition - Main is 5 or 9 and Roll is 11 or 12
            else if (
                (this.playerRoll === 11 || this.playerRoll === 12) &&
                (this.playerMain === 5 || this.playerMain === 9)) {
                resultMessage = "You Lose";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is an Out.`;
                this.endGame("out")
                this.playerTurns += 1;
            }

            // Lose condition - Main is 6 or 8 and Roll is 11
            else if (this.playerRoll === 11 &&
                (this.playerMain === 6 || this.playerMain === 8)) {
                resultMessage = "You Lose";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is an Out.`;
                this.endGame("out")
                this.playerTurns += 1;
            }

            // Lose condition - Main is 7 and Roll is 12
            else if (this.playerRoll === 12 && this.playerMain === 7) {
                resultMessage = "You Lose";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is an Out.`;
                this.endGame("out")
                this.playerTurns += 1;
            }

            // Win condition - Main matches Roll
            else if (this.playerRoll === this.playerMain) {
                resultMessage = "You Win";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is a Nick.`;
                this.endGame("nick");
            }

            // Win condition - Main is 6 or 8 and Roll is 12
            else if (this.playerRoll === 12 &&
                (this.playerMain === 6 || this.playerMain === 8)) {
                resultMessage = "You Win";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is a Nick.`;
                this.endGame("nick");
            }

            // Win condition - Main is 7 and Roll is 11
            else if (this.playerRoll === 11 && this.playerMain === 7) {
                resultMessage = "You Win";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is a Nick.`;
                this.endGame("nick");
            }

            // Neither - Roll becomes Chance
            else {
                this.playerChance = this.playerRoll;
            }
        } else if (this.playerChance > 0) {

            // Lose condition - Player rolls Main
            if (this.playerRoll === this.playerMain) {
                resultMessage = "You Lose";
                resultReason = `You rolled a ${this.playerRoll} with a main of ${this.playerMain}, which is an Out.`;
                this.endGame("out")
            }

            // Win condition - Player rolls Chance
            else if (this.playerRoll === this.playerChance) {
                resultMessage = "You Win";
                resultReason = `You rolled a ${this.playerRoll}, which matches your Chance of ${this.playerChance}, earning a Nick!`;
                this.endGame();
            }
        }

        // If there is a result message and reason send it to the
        // displayResultModal method
        if (resultMessage && resultReason) {
            this.modalInstance.resultModal(resultMessage, resultReason);
        }
    }

    // endGame:
    // Uses the bet value and multiplier to change the earnings from the game
    endGame(outcome) {
        const data = this.userDataInstance.getUserData();
        let winnings = 0;

        // Calculate winnings and update player balance

        if (outcome === "nick") {
            winnings = this.currentBet * 2;
        } else if (outcome === "out") {
            winnings = 0;
        } else if (this.playerMain && this.playerChance) {
            const odds = this.oddsTable[this.playerMain]?.[this.playerChance];
            if (odds) {
                winnings = odds * this.currentBet;
            }
        }

        data.score += winnings;

        // Update local storage with new balance
        this.userDataInstance.setUserData(data.score);

        // Tell the user their earnings and new balance
        console.log(`Game Over. Winnings: ${winnings}, New Balance: ${data.score}`);
    }
}

// Initialize the Hazard class
document.addEventListener("DOMContentLoaded", () => {
    new Hazard();
})