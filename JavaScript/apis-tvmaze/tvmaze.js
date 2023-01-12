"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
const noImg = "http://tinyurl.com/missing-tv";

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
  console.log(res);
  const shows = res.data.map((results) => {
    const show = results.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : noImg,
    };
  });
  return shows;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img src= "${show.image}" alt= "${noImg}">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="epiBtn">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `
    );
    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const $term = $("#search-query").val();
  const shows = await getShowsByTerm($term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = res.data.map((episode) => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    };
  });
  return episodes;
}

/** Write a clear docstring for this function... */
// get list of episodes and append them to the DOM

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    let $epiData = $(
      `<li>${episode.name}(Season: ${episode.season}, Episode: ${episode.number})</li>`
    );
    $episodesList.append($epiData);
  }
  $episodesArea.show();
}

async function displayEpisodes (e) {
  const $showID = $(e.target).closest('.Show').data('show-id');

  const episodes = await getEpisodesOfShow($showID);
  populateEpisodes(episodes);
}

$showsList.on('click', '.epiBtn', displayEpisodes)