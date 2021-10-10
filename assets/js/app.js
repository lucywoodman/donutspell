// Wait for the DOM to finish loading before adding level button event listeners.
document.addEventListener('DOMContentLoaded', function addLevelListeners() {
    let levelButtons = document.getElementsByClassName('level');
    
    for (const levelButton of levelButtons) {
        levelButton.addEventListener('click', function () {
            let level = this.id;
            setUpGame(level);
    })}    
})

/**
 * Sets up the game once a level is selected.
 * @param {string} level  - id of the level button selected.
 */
function setUpGame(level) {
    displayGame();
    randomWord(level);
    displayHiddenWord();
    createButtons();
    addKeyListeners();
    getHints();
}