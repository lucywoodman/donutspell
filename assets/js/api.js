function fetchData(url) {
    fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => createHint(data[0].shortdef[0]))
    .catch(err => {console.error(err);});
}

// HELPER FUNCTIONS
function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
}