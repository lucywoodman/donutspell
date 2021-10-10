// Set up global variables
let correctAnswer = '';
let donutLeft = 100;
let guessedLetters = [];
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let guessState = null;

/**
 * Hides the home content and displays the game content.
 * Removes the active class on the main nav home item.
 */
function displayGame() {
    document.getElementById('content--home').style.display = 'none';
    document.getElementById('content--game').style.display = 'block';
    document.getElementsByClassName('nav__item--active')[0].classList.remove('nav__item--active');
}

/**
 * Loads the correct list of words based on the level selected.
 * Pulls a random word from the list and assigns it to the correctAnswer variable.
 * @param {string} level - id of the level selected on the homepage.
 */
function randomWord(level) {
    let wordList = level === 'hard'   ? hardWords 
                 : level === 'medium' ? medWords
                 : level === 'easy'   ? easyWords
                 : null;
    correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
}

/**
 * Creates underscores for each letter in the correctAnswer.
 * Adds the underscores inside the #game-word element in the DOM.
 */
function displayHiddenWord() {
    let hiddenWord = '';
    for (let _letter of correctAnswer) {
        hiddenWord += '_';
    }
    document.getElementById('game-word').innerHTML = hiddenWord;
}

/**
 * Creates a button element for each letter in the alphabet variable.
 * Adds the buttons inside the #keyboard element in the DOM.
 */
function createButtons() {
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="key" id="${letter}">${letter}</button>`;
    }
    document.getElementById('keyboard').innerHTML = html;
}

/**
 * Adds event listeners to the keyboard buttons for keyboard and mouse.
 */
function addKeyListeners() {
    // Adds keyboard event listener (with a named function to allow it to be removed later).
    document.addEventListener('keydown', keyboardKeyHandler);
    
    // Gets the array of keyboard buttons from the DOM.
    let mouseButtons = document.getElementsByClassName('key');
    // Loops through the array.
    for (const button of mouseButtons) {
        // Adds mouse event listener to each button.
        button.addEventListener('click', mouseKeyHandler);
    }
}

/**
 * Handles keydown events from keyboard inputs for the game.
 * Checks the input before passing it to the checkAnswer function.
 * @param {keydown} event - passed from addKeyListeners function.
 */
function keyboardKeyHandler(event) {
    // Converts the pressed key input to lowercase.
    let key = event.key.toLowerCase();
    // Checks that the input is lowercase and included in the alphabet.
    // True: passes it to the checkAnswer function.
    // False: logs a message to the console.
    alphabet.includes(key) ? checkAnswer(key) : console.log("You must select a letter");
}

/**
 * Handles click events from mouse inputs for the game's keyboard.
 * Passes the input to the checkAnswer function.
 */
function mouseKeyHandler() {
    // Converts the button's id name to lowercase.
    let button = this.id.toLowerCase();
    // Passes the button's id to the checkAnswer function.
    checkAnswer(button);
}

/**
 * Checks whether the letter from the mouse/keyboard input has been guessed or not.
 * Disables the keyboard key once it's been used.
 * Updates the game status.
 * @param {string} letter - key or button id from keyboard event listeners.
 */
function checkAnswer(letter) {
    // If the letter hasn't already been guessed, adds it to the guessedLetters array, else does nothing.
    guessedLetters.indexOf(letter) === -1 ? guessedLetters.push(letter) : null;

    // Sets the guessed letter's keyboard key as disabled once used.
    document.getElementById(letter).setAttribute('disabled', true);

    // If the letter is part of correctAnswer, runs updateHiddenWord and checkIfWordComplete functions.
    if (correctAnswer.indexOf(letter) >= 0) {
        updateHiddenWord();
        checkIfWordComplete();
    // If the letter is not part of correctAnswer, reduces the amount of donut left and runs updateDonut and checkIfDonutGone functions.
    } else if (correctAnswer.indexOf(letter) === -1) {
        donutLeft = donutLeft - 20;
        updateDonut();
        checkIfDonutGone();
    }
}

/**
 * Splits correctAnswer into an array of letters.
 * Checks each letter to see if it's been guessed using the guessedLetters array.
 * Updates the hidden word.
 */
function updateHiddenWord() {
    // If a letter has been guessed (is included in the guessedLetters array), displays the letter, else displays an underscore.
    guessState = correctAnswer.split('').map(letter => (guessedLetters.indexOf(letter) >= 0 ? letter : "_")).join('');
    document.getElementById('game-word').innerHTML = guessState;
}

/**
 * Checks to see if the guessed word matches the correct answer.
 * If it does, loads the winning message and ends the game.
 */
function checkIfWordComplete() {
    if (guessState === correctAnswer) {
        // Updates the title.
        document.getElementById('game-title').innerHTML = "You win!";
        // Replaces the text to show amount of donut saved.
        document.getElementById('game-text').innerHTML = `
            You get to keep ${donutLeft}% of the donut!</p>
            <p>The answer is:
        `;
        // Hides the keyboard.
        document.getElementById('keyboard').style.display = "none";
        // Hides the answer hint.
        document.getElementById('hint').style.display = "none";
        // Displays the "Play again" button.
        document.getElementById('restart').style.display = "block";
        // Removes the keyboard event listeners.
        document.removeEventListener('keydown', keyboardKeyHandler);
    } else {
        return;
    }
}

/**
 * Updates the page with the amount of donut left, inside the #percent element.
 * Updates the page with the matching donut image, inside the #donut element.
 */
function updateDonut() {
    document.getElementById('percent').innerHTML = donutLeft;
    document.getElementById('donut').src = `./assets/images/donut-${donutLeft}.svg`;
}

/**
 * Checks to see if the donut has all gone (player has run out of incorrect turns).
 * If it has, loads the losing message and ends the game.
 */
function checkIfDonutGone() {
    if (donutLeft === 0) {
        // Updates the title.
        document.getElementById('game-title').innerHTML = "You lose!";
        // Replaces the text to show why the game is lost.
        document.getElementById('game-text').innerHTML = `
            Oh no! Ripley ate all of the donut!</p>
            <p>The correct answer is:
        `;
        // Displays the correct answer.
        document.getElementById('game-word').innerHTML = correctAnswer;
        // Hides the keyboard.
        document.getElementById('keyboard').style.display = "none";
        // Hides the answer hint.
        document.getElementById('hint').style.display = "none";
        // Displays the "Play again" button.
        document.getElementById('restart').style.display = "block";
        // Removes the keyboard event listeners.
        document.removeEventListener('keydown', keyboardKeyHandler);
    }
}