// Main Class
export class Modal {

    // showModal:
    // When called it will show the modal
    showModal(modalName) {
        const modal = document.getElementById(modalName);
        modal.style.display = "flex";
    }

    // hideModal:
    // When called it will hide the modal
    hideModal(modalName) {
        const modal = document.getElementById(modalName);
        modal.style.display = "none";
    }

    // resultModal:
    // When called will show end game results
    resultModal(resultMessage, resultReason) {
        document.getElementById("resultMessage").textContent = resultMessage;
        document.getElementById("resultReason").textContent = resultReason;

        this.showModal("resultModal");

        document.getElementById("playAgainButton").onclick = () => {
            location.reload();
        }
        document.getElementById("leaveButton").onclick = () => {
            window.location.href = "../webpages/games.html";
        }
    }

    // rulesModal:
    // When called will show the games rules
    rulesModal(modalName) {
        const modal = document.getElementById("rulesModal");
        modal.style.display = "flex"; // Show the rules modal

        const rulesButton = document.getElementById("rulesButton");
        rulesButton.onclick = () => {
            this.hideModal("rulesModal"); // Correctly hide the rules modal
            this.showModal(modalName); // Show the next modal if needed
        }
    }
}