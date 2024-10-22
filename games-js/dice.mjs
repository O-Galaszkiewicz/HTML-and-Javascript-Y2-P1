export class DiceSides {
    sides = [];

    constructor() {
        const faces = [1, 2, 3, 4, 5, 6];
        for (let face of faces) {
            this.sides.push(
                {
                    side: face,
                    src: `../images/Dice/${face}.svg`
                });
        }
    }

    addDice() {
        const index = Math.floor(this.sides.length * Math.random());
        const face = this.sides[index];
        this.sides.splice(index, 1);
        return face;
    }

}