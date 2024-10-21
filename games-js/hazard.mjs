import {Dice} from './dice.mjs';

class Hazard {
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

// Initialize the Hazard class
document.addEventListener('DOMContentLoaded', () => {
    new Hazard();
})