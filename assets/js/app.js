(function() {
    // Wait for the DOM to finish loading before adding level button event listeners.
    document.addEventListener('DOMContentLoaded', function addLevelListeners() {
        let levelButtons = document.getElementsByClassName('level');
        
        for (let levelButton of levelButtons) {
            levelButton.addEventListener('click', levelButtonHandler);
        }

        /**
         * Assigns the level button's ID to a variable and passes it to the setUpGame function.
         */
        function levelButtonHandler() {
            let level = this.id;
            setUpGame(level);
        }
    });

    /**
     * Sets up the game once a level is selected.
     * @param {string} level  - id of the level button selected.
     */
    function setUpGame(level) {
        runGame.displayGame();
        runGame.randomWord(level);
        runGame.displayHiddenWord();
        runGame.createButtons();
        runGame.addKeyListeners();
        runGame.getHint();
    }
})();