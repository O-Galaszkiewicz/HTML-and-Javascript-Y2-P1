import {Dice} from './dice.mjs';

class Craps {
    dice;
    diceImg;

    constructor() {
        // Buttons

        // Values

        // Player

        this.diceImg = document.querySelector('#diceImg');

        this.dice = new Dice();
    }

}

// Initialize the Craps class
document.addEventListener('DOMContentLoaded', () => {
    new Craps();
})