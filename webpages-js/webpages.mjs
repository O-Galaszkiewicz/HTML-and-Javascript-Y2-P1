// Main Class
class WebpageNav {
    
    constructor() {
        this.indexLink = document.getElementById("indexNavButton");
        this.gamesLink = document.getElementById("gamesNavButton");
        this.rankingsLink = document.getElementById("rankingsNavButton");
        this.loginLink = document.getElementById("loginNavButton");
        this.registrationLink = document.getElementById("registrationNavButton");
    
        // Button Event Handlers
        if (this.indexLink) {
            this.indexLink.onclick = () => {
                this.navigateTo("./index.html");
            }
        }
        if (this.gamesLink) {
            this.gamesLink.onclick = () => {
                this.navigateTo("./games.html");
            }
        }
        if (this.rankingsLink) {
            this.rankingsLink.onclick = () => {
                this.navigateTo("./rankings.html");
            }
        }
        if (this.loginLink) {
            this.loginLink.onclick = () => {
                this.navigateTo("./login.html");
            }
        }
        if (this.registrationLink) {
            this.registrationLink.onclick = () => {
                this.navigateTo("./registration.html");
            }
        }
    }

    // navigateTo:
    // Changes the window to the given link
    navigateTo(link) {
        window.location.href = link;
    }
}

// Initialize the WebpageNav class
document.addEventListener("DOMContentLoaded", () => {
    new WebpageNav();
})