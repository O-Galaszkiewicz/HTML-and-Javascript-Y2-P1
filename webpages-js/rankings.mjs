// update user score
function updateScore() {
    const userName = sessionStorage.loggedInUser;
    const user = JSON.parse(localStorage[userName]);
    if (score > user.topScore) {
        user.topScore = score;

        localStorage[userName] = JSON.stringify(user);
    }
}

// user ranking table
function ranking() {
    let tableStr = '<table><tr><th>Name</th><th>Score</th></tr>';
    const keys = Object.keys(localStorage);
    console.log(localStorage);
    for(let key of keys) {
        console.log(key)
        const user = JSON.parse(localStorage[key]);
        console.log(user);
        tableStr += `<tr><td>${user.name}</td><td>${user.topScore}</td></tr>`
    }
    tableStr += "</table>"
    const tableDiv = document.querySelector('#Ranking');
    tableDiv.innerHTML = tableStr;
}