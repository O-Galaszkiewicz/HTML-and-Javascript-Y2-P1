import { AuthSystem } from "./userdata.mjs";

class Rankings {
    constructor() {
        this.rankingsBody = document.getElementById("rankingsBody");
        this.authSystem = new AuthSystem();
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem("userData")) || [];
    }

    sortUserData(users) {
        return users.sort((a, b) => b.score - a.score);
    }

    clearTable() {
        this.rankingsBody.innerHTML = "";
    }

    displayRankings() {
        const userData = this.getAllUsers();
        const sortedUsers = this.sortUserData(userData);

        this.clearTable();

        sortedUsers.forEach(user => {
            const row = document.createElement("tr");

            // Create and append the username cell with a CSS class
            const usernameCell = document.createElement("td");
            usernameCell.textContent = user.username;
            usernameCell.classList.add("text");
            row.appendChild(usernameCell);

            // Create and append the score cell with a CSS class
            const scoreCell = document.createElement("td");
            scoreCell.textContent = user.score;
            scoreCell.classList.add("text");
            row.appendChild(scoreCell);

            // Append the row to the table body
            this.rankingsBody.appendChild(row);
        });
    }
}

// Initialize the Rankings class when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const rankings = new Rankings();
    rankings.displayRankings();
});
