// Imports
import { Modal } from "./modal.mjs";

// Main Class
export class AuthSystem {

    constructor() {
        this.modalClass = new Modal();
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.email = document.getElementById("email");
        this.phonenum = document.getElementById("phonenum");
        this.score = 5000

        this.errorElement = document.getElementById("error");
        this.form = document.getElementById("form");

        this.loginModalStr = "loginModal"

        if (this.form) {
            this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        }

        if (document.getElementById(this.loginModalStr)) {
            this.checkLoginStatus();
        }
    }

    // register:
    // Register Method to store user data in local storage
    register() {
        const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
        const userData = {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value,
            phonenum: this.phonenum.value,
            score: this.score.valueOf()
        };

        const userExists = existingUsers.find(user =>
            user.username === userData.username);

        if (userExists) {
            console.log("User Already exists")
        } else {
            existingUsers.push(userData);
            localStorage.setItem("userData", JSON.stringify(existingUsers));
            window.location.href = "../webpages/login.html";
        }
    }

    // login:
    // Login Method to validate against stored data
    login() {
        const storedUser = JSON.parse(localStorage.getItem("userData")) || [];

        if (storedUser.length === 0) {
            console.log("No user found. Please register first.");
            return false;
        }

        const matchedUser = storedUser.find(user =>
            user.username === this.username.value &&
            user.password === this.password.value &&
            user.email === this.email.value &&
            user.phonenum === this.phonenum.value
        );

        if (matchedUser) {
            console.log("Login successful!");
            sessionStorage.setItem("loggedInUser", JSON.stringify({
                username: matchedUser.username
            }));

            return true;
        } else {
            console.log("Invalid details")
            return false;
        }
    }

    // getUserData:
    // Gets logged in user and checks logged in user with local storage
    // to get their data
    getUserData() {
        // Get session storage user and local storage data
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        // Find the user in local storage that matches the logged in user
        const matchedUser = storedUser.find(user =>
            user.username === loggedInUser.username
        );
        // If the user exists, return their data
        if (matchedUser) {
            return matchedUser;
        }
    }

    // setUserData:
    // Checks logged in user with local storage and changes their score
    setUserData(score) {
        // Get session storage user and local storage data
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const storedUser = JSON.parse(localStorage.getItem("userData"));

        // Find the user in local storage that matches the logged in user
        const matchedUser = storedUser.find(user =>
            user.username === loggedInUser.username
        );

        // If the user exists, change their score
        if (matchedUser) {
            matchedUser.score = score;
            localStorage.setItem("userData", JSON.stringify(storedUser));
        }
    }

    // checkLoginStatus:
    // Method for checking if the player is logged in or not
    checkLoginStatus() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            this.modalClass.showModal(this.loginModalStr);
        } else {
            this.modalClass.hideModal(this.loginModalStr);
        }
    }

    // Method to handle form submission
    handleSubmit(e) {
        let messages = [];

        // Username validation
        if (this.username.value === "" || this.username.value === null) {
            messages.push("Username is empty");
        } else if (this.username.value.length < 4) {
            messages.push("Username is too short (< 4)");
        } else if (this.username.value.length > 30) {
            messages.push("Username is too long (> 30)");
        }

        // Password validation
        if (this.password.value === "" || this.password.value === null) {
            messages.push("Password is empty");
        } else if (this.password.value.length < 6) {
            messages.push("Password is too short (< 6)");
        } else if (this.password.value.length > 30) {
            messages.push("Password is too long (> 30)");
        }

        // Email validation
        if (this.email && (this.email.value === "" || this.email.value === null)) {
            messages.push("Email is empty");
        } else if (this.email) {
            // Regular expression to validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email.value)) {
                messages.push("Email format is invalid")
            }
        }

        // Phone number validation
        if (this.phonenum && (this.phonenum.value === "" || this.phonenum.value === null)) {
            messages.push("Phone Number is empty");
        } else if (this.phonenum) {
            // Regular expression to validate phone number format
            const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,7}$/;
            if (!phonePattern.test(this.phonenum.value)) {
                messages.push("Phone Number format is invalid (must be 10–13 digits)");
            }
        }

        // Error handling
        if (messages.length > 0) {
            e.preventDefault();
            this.errorElement.innerText = messages.join("\n");
        } else {
            e.preventDefault(); // Prevent the form from submitting
            if (e.submitter.id === "registerButton") {
                this.register();
            } else if (e.submitter.id === "loginButton") {
                this.login();
            }
        }
    }
}

// Initialize the AuthSystem class
document.addEventListener("DOMContentLoaded", () => {
    new AuthSystem();
});
