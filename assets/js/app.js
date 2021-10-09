function addLevelListeners() {
    let levelButtons = document.getElementsByClassName('level');
    
    for (const levelButton of levelButtons) {
        levelButton.addEventListener('click', function () {
            let level = this.id;
            console.log(level);
            setUpGame(level);
    })}
}

addLevelListeners();

function setUpGame(level) {
    displayGame();
    randomWord(level);
    displayHiddenWord();
    createButtons();
    addKeyListeners();
    getHints();
}

