/**
 * Fetches a simple definition of the correct answer word from the Mirriam-Webster Developer Center API.
 * When the response is successfully received, converts the response to JSON, pulls the required data and adds it to the DOM.
 */
async function getHints() {
  fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${correctAnswer}?key=df6eee5d-53f0-48ce-a696-76eabea17b10`)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => createHint(data[0].shortdef[0]))
    .catch(err => {console.error(err);});
  
  /**
   * Checks the status of the API for the fetch request. If the API is okay, returns the response. If not, throws an error.
   * @param {response} response - the initial response from the fetch where this function is called.
   * @returns resolved or rejected promise.
   */
  function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  /**
   * Takes the definition from the API response and adds it to the DOM, inside the #hint element.
   * @param {string} data - A string pulled from the API JSON response.
   */
  function createHint(data) {
    // If there isn't a definition, displays a generic message.
    if (data === undefined) {
      let hint = `
        <p>Hint: no hint available, sorry!</p>
      `;
      document.getElementById('hint').innerHTML = hint;
    // If there is a definition, displays it.
    } else {
      let hint = `
        <p>Hint: ${data}</p>
      `;
      document.getElementById('hint').innerHTML = hint;
    }
  }
}
