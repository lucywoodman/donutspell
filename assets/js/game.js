let correctAnswer = '';
let donutLeft = 100;
let guessedLetters = [];
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let guessState = null;

function displayGame() {
    document.getElementById('content--home').style.display = 'none';
    document.getElementById('content--game').style.display = 'block';
    document.getElementsByClassName('nav__item--active')[0].classList.remove('nav__item--active');
}

function randomWord(level) {
    let wordList = level === 'hard'   ? hardWords 
                 : level === 'medium' ? medWords
                 : level === 'easy'   ? easyWords
                 : null;
    correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(correctAnswer);
}

function displayHiddenWord() {
    let hiddenWord = '';
    for (let _letter of correctAnswer) {
        hiddenWord += '_';
    }
    document.getElementById('game-word').innerHTML = hiddenWord;
}

function createButtons() {
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="key" id="${letter}">${letter}</button>`;
    }
    document.getElementById('keyboard').innerHTML = html;
}

function addKeyListeners() {
    document.addEventListener('keydown', keyboardKeyHandler);
    
    let keyboardKeys = document.getElementsByClassName('key');
    
    for (const keyboardKey of keyboardKeys) {
        keyboardKey.addEventListener('click', function () {
            let keyboardKey = this.id.toLowerCase();
            checkAnswer(keyboardKey);
    })}
}

function keyboardKeyHandler(event) {
    let key = event.key.toLowerCase();
    alphabet.includes(key) ? checkAnswer(key) : console.log("You must select a letter");
}

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
        document.getElementById('hint').style.display = "none";
        document.getElementById('restart').style.display = "block";
        document.removeEventListener('keydown', keyboardKeyHandler);
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
        document.getElementById('hint').style.display = "none";
        document.getElementById('restart').style.display = "block";
        document.removeEventListener('keydown', keyboardKeyHandler);
    }
}