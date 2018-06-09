/* this first bit of code tells the browser to wait until the html is loaded to activate the javascript functions */

$(watchSubmit);

/* set up an event listener on the submit button to grab the search data that the user inputs in the form */

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); // this line prevents the default submit behavior and keep the submitted value within our program

    /* this gets the entire value of the js-query class (the input: a very complicated scary looking set of infinite-seeming nested nodes)... */
    let queryTarget = $(event.currentTarget).find('.js-query');

    /* ... and this gets the actual string from that scary nest of nodes (the actual word(s) the user input in the search form) */
    let query = queryTarget.val();

    /* clear the user input out of the form, so it's ready for the next search */
    queryTarget.val("");

    /* this is the part of the function that gets the data from the API and displays it. we callback the function getDataFromApi, which has two parameters: 1) query, which is defined abo ve as the string the user input; and 2) displayYouTubeSearchData, which will index through the data we get and render it, itself calling back the renderResults function */
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

/* set a const to rep the search url for youtube, so we only have to paste it in once */

let YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

/* create a function to get the data from the youtube API: set the constant query to rep the request for data that we send to the API (this is the frame for the info we request); the API understands this format and returns the requested info, and in our 'callback', we do something with that data, in this case, we display it  */

function getDataFromApi(searchTerm, callback) {
  let query = {
    part: 'snippet',
    q: searchTerm,
    key: 'AIzaSyDpUVuV32nq8YF4GG0FNhbaQgiwh-cYrAE',
  }

  /* getJSON = get javascript object from the API; we give it the API's url, the search term, and the function (what we want to do with it) */
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(results) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${results.id.videoId}"><img src="${results.snippet.thumbnails.medium.url}" alt=""></a><br>

      ${results.snippet.title}</a> by <a href="${results.snippet.channelTitle}" target="_blank">${results.snippet.channelTitle}</a>
    </div>
  `;
}

/* this function takes the data provided by the API, indexes through it, and renders it*/

function displayYouTubeSearchData(data) {
  let results = data.items.map((item) => renderResult(item));

  /* here the html-formatted results are input into the empty div in our html */
  $('.js-search-results').html(results);
}