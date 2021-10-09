let answerWords = [
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
    correctAnswer = answerWords[Math.floor(Math.random() * answerWords.length)];
    console.log(correctAnswer);
}

function displayHiddenWord() {
    let hiddenWord = '';
    for (let {} of correctAnswer) {
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
    document.addEventListener('keydown', function (event) {
        let key = event.key.toLowerCase();
        // If the pressed key is not included in the alphabet, log a message to the console
        alphabet.includes(key) ? checkAnswer(key) : console.log("You must select a letter");
    });
    
    let keyboardKeys = document.getElementsByTagName('button');
    
    for (const keyboardKey of keyboardKeys) {
        keyboardKey.addEventListener('click', function () {
            let keyboardKey = this.id.toLowerCase();
            checkAnswer(keyboardKey);
    })}
}

