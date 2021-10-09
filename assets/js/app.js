(function setUpGame() {
    randomWord();
    displayHiddenWord();
    createButtons();
    addKeyListeners();
    getHints();
})();

function checkAnswer(letter) {
    console.log(`You selected ${letter}!`);

    // If the letter hasn't already been guessed (=== -1), add it to the guessedLetters array
    guessedLetters.indexOf(letter) === -1 ? guessedLetters.push(letter) : null;
    console.log(guessedLetters);

    // Set the guessed letter's keyboard key as disabled once used
    document.getElementById(letter).setAttribute('disabled', true);

    if (correctAnswer.indexOf(letter) >= 0) {
        updateHiddenWord();
        checkIfWordComplete();
    } else if (correctAnswer.indexOf(letter) === -1) {
        donutLeft = donutLeft - 20;
        updateDonut();
        checkIfDonutGone();
    }
}

function updateHiddenWord() {
    // Grab the correctAnswer and split it to create an array of the letters
    // Use map to reformat each letter in the correctAnswer array
    // If a letter has been guessed (is included in the guessedLetters array), then display the letter, else display an underscore
    guessState = correctAnswer.split('').map(letter => (guessedLetters.indexOf(letter) >= 0 ? letter : "_")).join('');

    document.getElementById('game-word').innerHTML = guessState;
}

function checkIfWordComplete() {
    if (guessState === correctAnswer) {
        // Update page to say "You've won!"
        console.log("WIN WIN WIN");
        document.getElementById('game-title').innerHTML = "You win!";
        document.getElementById('game-text').innerHTML = `
            You get to keep ${donutLeft}% of the donut!</p>
            <p>The answer is:
        `;
        document.getElementById('keyboard').style.display = "none";
        document.getElementsByClassName('remaining-donut')[0].style.display = "none";
        document.getElementsByClassName('hints')[0].style.display = "none";
    }
}

function updateDonut() {
    document.getElementById('percent').innerHTML = donutLeft;
    document.getElementById('donut').src = `./assets/images/donut-${donutLeft}.svg`;
}

function checkIfDonutGone() {
    if (donutLeft === 0) {
        // Update page to say "You lost!"
        console.log("LOSE LOSE LOSE");
        document.getElementById('game-title').innerHTML = "You lose!";
        document.getElementById('game-text').innerHTML = `
            Oh no! Ripley ate all of the donut!</p>
            <p>The correct answer is:
        `;
        document.getElementById('game-word').innerHTML = correctAnswer;
        document.getElementById('keyboard').style.display = "none";
        document.getElementsByClassName('remaining-donut')[0].style.display = "none";
        document.getElementsByClassName('hints')[0].style.display = "none";
    }
}

function reset() {
    // Reset the game back to default
}