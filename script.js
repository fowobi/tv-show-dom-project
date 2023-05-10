
function setup() {
  const endpoint = 'https://api.tvmaze.com/shows/82/episodes';
  fetch(endpoint)
    .then(response => response.json())
    .then(data => makePageForEpisodes(data))
    .catch(error => console.log(error));
  }
 
 //This is the Season Code
  function getEpisodeCode(episode) {
  const season = episode.season.toString().padStart(2, "0");
  const number = episode.number.toString().padStart(2, "0");
  const episodeId = `S${season}E${number}`;
  // return `S${season}E${number}`;
  return episodeId;
}

  
//This is header-Displaying Number Code 
function makePageForEpisodes(episodeList) {
 const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  addSelectFunctionality(episodeList);
  addSearchFunctionality(episodeList);
  const episodeCountElem = document.createElement("p");
  episodeCountElem.className = "episode-count";
  episodeCountElem.textContent = `Displaying ${episodeList.length} / ${episodeList.length} episodes`;
  rootElem.appendChild(episodeCountElem);

  //This big container for the Movie(grid-container)
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  rootElem.appendChild(gridContainer);
 
//This is the each movie Card container Code(grid-item)
  episodeList.forEach((episode) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridContainer.appendChild(gridItem);

   

   //This is Movie Title Code both episode-Name and episode-Code
    const episodeCode = getEpisodeCode(episode);
    const episodeTitle = `${episode.name} - ${episodeCode} `;
    const episodeTitleElem = document.createElement("h2");
    episodeTitleElem.textContent = episodeTitle;
    gridItem.appendChild(episodeTitleElem);
   
    //This is Image Code
    const imgElem = document.createElement("img");
    imgElem.src = episode.image.medium;
    imgElem.alt = episodeTitle;
    gridItem.appendChild(imgElem);


   // This is the Episode summary code 
    const summaryElem = document.createElement("summary");
    summaryElem.innerHTML = episode.summary;
    gridItem.appendChild(summaryElem);
  });
}

// This is Search input Code
function addSearchFunctionality(allEpisodes) {
  const searchElem = document.createElement("input");
  searchElem.className = "search-input";
  searchElem.type = "text";
  searchElem.placeholder = "Search episodes";
  searchElem.addEventListener("input", () => {
    const searchTerm = searchElem.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      const name = episode.name.toLowerCase();
      const summary = episode.summary.toLowerCase();
      return name.includes(searchTerm) || summary.includes(searchTerm);
    });
    
    makePageForEpisodes(filteredEpisodes);
    

   });

  const rootElem = document.getElementById("root");
  rootElem.insertBefore(searchElem, rootElem.secondChild);
}
function addSelectFunctionality(allEpisodes) {
  const selectWrapperElem = document.createElement("div");
  selectWrapperElem.className = "select-wrapper";

  // Create episode select input
  const episodeSelectElem = document.createElement("select");
  episodeSelectElem.className = "episode-select";
  episodeSelectElem.addEventListener("change", () => {
    const selectedOption = episodeSelectElem.options[episodeSelectElem.selectedIndex];
    const selectedEpisode = allEpisodes.find(
      (episode) => getEpisodeCode(episode) === selectedOption.value
    );
    makePageForEpisodes([selectedEpisode]);
  });

  episodeSelectElem.onchange = function(){
    window.location.hash = `#${episodeSelectElem.value}`;
  };

  // Add option for all episodes
  const allEpisodesOption = document.createElement("option");
  allEpisodesOption.value = "";
  allEpisodesOption.textContent = "All Episodes";
  episodeSelectElem.appendChild(allEpisodesOption);

  // Sort episodes by name in alphabetical order, case-insensitive
  allEpisodes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));


  // Add options for each episode
  allEpisodes.forEach((episode) => {
    const episodeOption = document.createElement("option");
    episodeOption.value = getEpisodeCode(episode);
    episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
    episodeSelectElem.appendChild(episodeOption);
  });

  // Add episode select input to select wrapper
  selectWrapperElem.appendChild(episodeSelectElem);

  // Create movie select input
  const movieSelectElem = document.createElement("select");
  movieSelectElem.className = "movie-select";
  movieSelectElem.addEventListener("change", () => {
    const selectedOption = movieSelectElem.options[movieSelectElem.selectedIndex];
    const selectedShowId = selectedOption.value;
    if (selectedShowId !== "") {
      const selectedShow = allShows.find(show => show.name === selectedOption.textContent);
      const endpoint = `https://api.tvmaze.com/shows/${selectedShow.id}/episodes`;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => makePageForEpisodes(data))
        .catch(error => console.log(error));
    } else {
      makePageForEpisodes(allEpisodes);
    }
  });

  // Add option for no movie selected
  const noMovieOption = document.createElement("option");
  noMovieOption.value = "";
  noMovieOption.textContent = "Select a Show";
  movieSelectElem.appendChild(noMovieOption);

// Retrieve the list of shows using getAllShows() function
const allShows = getAllShows();

// Extract show names from the objects
const showNames = allShows.map(show => show.name);

// Sort show names in alphabetical order, case-insensitive
showNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

showNames.forEach((showName) => {
  const showId = showName.toLowerCase().replace(/\s+/g, "-");
  const showOption = document.createElement("option");
  showOption.value = showId;
  showOption.textContent = showName;
  movieSelectElem.appendChild(showOption);
});


// Add movie select input to select wrapper
  selectWrapperElem.appendChild(movieSelectElem);

  // Add select wrapper to root element
  const rootElem = document.getElementById("root");
  rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);
}
window.onload = setup;


