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

let answer = '';
let donutLeft = 100;
let guessed = [];
let alphabet = 'abcdefghijklmnopqrstuvwxyz';

function randomWord() {
    answer = easyWords[Math.floor(Math.random() * easyWords.length)];
    console.log(answer);
    return answer;
}

randomWord();

// FETCH FUNCTIONS 
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem!', error))
}

// HELPER FUNCTIONS
function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
}

// Fetch the answer's definition from API
fetchData(`https://api.datamuse.com/words?sp=${answer}&md=d`)
    .then(data => console.log(data[0].defs[0]) )


function createButtons() {
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="key" id="${letter}" onclick="checkAnswer('${letter}')">${letter}</button>`;
    }
    document.getElementById('keyboard').innerHTML = html;
}

function displayHiddenWord() {
    let hiddenWord = '';
    for (const letter of answer) {
        hiddenWord += '_';
    }
    document.getElementById('game-word').innerHTML = hiddenWord;
}

displayHiddenWord();
createButtons();

function addKeyListeners() {
    document.addEventListener('keydown', function (event) {
        let key = event.key.toLowerCase();
        if (alphabet.includes(key)) {
            checkAnswer(key);
        } else {
            console.log("You must select a letter");
        }
    })
}

addKeyListeners();

function checkAnswer(letter) {
    console.log(`You selected ${letter}!`);

    guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
    console.log(guessed);

    document.getElementById(letter).setAttribute('disabled', true);
    
}