let easyWords = [
    "accident",
    "actual",
    "address",
    "answer",
    "appear",
    "arrive",
    "believe",
    "bicycle",
    "breath",
    "breathe",
    "build",
    "busy",
    "calendar",
    "caught",
    "centre",
    "century",
    "certain",
    "circle",
    "complete",
    "consider",
    "continue",
    "decide",
    "describe",
    "different",
    "difficult",
    "disappear",
    "early",
    "earth",
    "eight",
    "enough",
    "exercise",
    "experience",
    "experiment",
    "extreme",
    "famous",
    "favourite",
    "February",
    "forward",
    "fruit",
    "grammar",
    "group",
    "guard",
    "guide",
    "heard",
    "heart",
    "height",
    "history",
    "imagine",
    "increase",
    "important",
    "interest",
    "island",
    "knowledge",
    "learn",
    "length",
    "library",
    "material",
    "medicine",
    "mention",
    "minute",
    "natural",
    "naughty",
    "notice",
    "occasion",
    "often",
    "opposite",
    "ordinary",
    "particular",
    "peculiar",
    "perhaps",
    "popular",
    "position",
    "possess",
    "possible",
    "potatoes",
    "pressure",
    "probably",
    "promise",
    "purpose",
    "quarter",
    "question",
    "recent",
    "regular",
    "reign",
    "remember",
    "sentence",
    "separate",
    "special",
    "straight",
    "strange",
    "strength",
    "suppose",
    "surprise",
    "therefore",
    "though",
    "thought",
    "through",
    "various",
    "weight",
    "woman"
];

let correctAnswer = '';
let donutLeft = 100;
let guessedLetters = [];
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let guessState = null;

function randomWord() {
    correctAnswer = easyWords[Math.floor(Math.random() * easyWords.length)];
    console.log(correctAnswer);
    return correctAnswer;
}

randomWord();

fetchData(`https://dictionaryapi.com/api/v3/references/learners/json/${correctAnswer}?key=df6eee5d-53f0-48ce-a696-76eabea17b10`);
function createHint(data) {
    let hints = `
        <p>${data}</p>
    `;
    
    document.getElementById('answer-hints').innerHTML = hints;
}

function createButtons() {
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="key" id="${letter}" onclick="checkAnswer('${letter}')">${letter}</button>`;
    }
    document.getElementById('keyboard').innerHTML = html;
}

function displayHiddenWord() {
    let hiddenWord = '';
    for (const letter of correctAnswer) {
        hiddenWord += '_';
    }
    document.getElementById('game-word').innerHTML = hiddenWord;
}

displayHiddenWord();
createButtons();

function addKeyListeners() {
    document.addEventListener('keydown', function (event) {
        let key = event.key.toLowerCase();
        // If the pressed key is not included in the alphabet, log a message to the console
        alphabet.includes(key) ? checkAnswer(key) : console.log("You must select a letter");
    })
}

addKeyListeners();

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
    }
}

function reset() {
    // Reset the game back to default
}