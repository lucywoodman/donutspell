function fetchData(url) {
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
            "x-rapidapi-key": "26d3012ecbmsh246de17f4462878p1d3995jsn727d0dcee879"
        }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => associatedWords(data.assoc_word))
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