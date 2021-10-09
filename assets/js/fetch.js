async function getHints() {
  fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${correctAnswer}?key=df6eee5d-53f0-48ce-a696-76eabea17b10`)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => createHint(data[0].shortdef[0]))
    .catch(err => {console.error(err);});
  
  // HELPER FUNCTIONS
  function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  function createHint(data) {
    let hint = `
        <p>Hint: ${data}</p>
    `;
  
    console.log(hint);
    document.getElementById('hint').innerHTML = hint;
  }
}
