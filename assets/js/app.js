(function showHomePage() {
    addLevelListeners();
    addRestartListener();
})();

function setUpGame(level) {
    displayGame();
    randomWord(level);
    displayHiddenWord();
    createButtons();
    addKeyListeners();
    getHints();
}

function addLevelListeners() {
    let levelButtons = document.getElementsByClassName('level');
    
    for (const levelButton of levelButtons) {
        levelButton.addEventListener('click', function () {
            let level = this.id;
            console.log(level);
            setUpGame(level);
    })}
}

function addRestartListener() {
    let restartButton = document.getElementById('restart');

    restartButton.addEventListener('click', function () {
        console.log('restart the game')
        document.location.reload();
    })
}

