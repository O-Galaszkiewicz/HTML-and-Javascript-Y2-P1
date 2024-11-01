// Main Class
export class Dice {
    // Store all variables
    sides = [];

    constructor() {
        const faces = [1, 2, 3, 4, 5, 6];
        // Iterate over every face in the faces array
        for (let face of faces) {
            // Create a sides object with its face and image source
            this.sides.push(
                {
                    face: face,
                    src: `../images/Dice/${face}.svg`
                });
        }
    }

    // addDice:
    // Uses random to randomly generate dice when called
    addDice() {
        // Reset the dice if none are left
        if (this.sides.length === 0) {
            this.resetDice();
        }
        const index = Math.floor(this.sides.length * Math.random());
        const face = this.sides[index];
        this.sides.splice(index, 1);
        return face;
    }

    // resetDice:
    // Resets the Dice stored in the sides array
    resetDice() {
        this.sides = [];
        const faces = [1, 2, 3, 4, 5, 6];
        // Iterate over every face in the faces array
        for (let face of faces) {
            // Create a sides object with its face and image source
            this.sides.push(
                {
                    face: face,
                    src: `../images/Dice/${face}.svg`
                });
        }
    }
}