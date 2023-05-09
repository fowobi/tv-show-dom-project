
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
//   console.log(allEpisodes);
// }


// function setup() {
//   const endpoint = 'https://api.tvmaze.com/shows/82/episodes';
//   fetch(endpoint)
//     .then(response => response.json())
//     .then(data => makePageForEpisodes(data))
//     .catch(error => console.log(error));
//   }

  
// //This is header-Displaying Number Code 
// function makePageForEpisodes(episodeList) {
//  const rootElem = document.getElementById("root");
//   rootElem.innerHTML = "";
//   addSelectFunctionality(episodeList);
//   addSearchFunctionality(episodeList);
//   const episodeCountElem = document.createElement("p");
//   episodeCountElem.className = "episode-count";
//   episodeCountElem.textContent = `Displaying ${episodeList.length} / ${episodeList.length} episodes`;
//   rootElem.appendChild(episodeCountElem);

//   //This big container for the Movie(grid-container)
//   const gridContainer = document.createElement("div");
//   gridContainer.className = "grid-container";
//   rootElem.appendChild(gridContainer);

//   //This is the each movie Card container Code(grid-item)
//   episodeList.forEach((episode) => {
//     const gridItem = document.createElement("div");
//     gridItem.className = "grid-item";
//     gridContainer.appendChild(gridItem);

//    //This is Movie Title Code both episode-Name and episode-Code
//     const episodeCode = getEpisodeCode(episode);
//     const episodeTitle = `${episode.name} - ${episodeCode} `;
//     const episodeTitleElem = document.createElement("h2");
//     episodeTitleElem.textContent = episodeTitle;
//     gridItem.appendChild(episodeTitleElem);
   
//     //This is Image Code
//     const imgElem = document.createElement("img");
//     imgElem.src = episode.image.medium;
//     imgElem.alt = episodeTitle;
//     gridItem.appendChild(imgElem);


//    // This is the Episode summary code 
//     const summaryElem = document.createElement("summary");
//     summaryElem.innerHTML = episode.summary;
//     gridItem.appendChild(summaryElem);
//   });
// }

// //This is the Season Code
// function getEpisodeCode(episode) {
//   const season = episode.season.toString().padStart(2, "0");
//   const number = episode.number.toString().padStart(2, "0");
//   return `S${season}E${number}`;
// }

// //This is Search input Code
// function addSearchFunctionality(allEpisodes) {
//   const searchElem = document.createElement("input");
//   searchElem.className = "search-input";
//   searchElem.type = "text";
//   searchElem.placeholder = "Search episodes";
//   searchElem.addEventListener("input", () => {
//     const searchTerm = searchElem.value.toLowerCase();
//     const filteredEpisodes = allEpisodes.filter((episode) => {
//       const name = episode.name.toLowerCase();
//       const summary = episode.summary.toLowerCase();
//       return name.includes(searchTerm) || summary.includes(searchTerm);
//     });
    
//     makePageForEpisodes(filteredEpisodes);
//     //  updateEpisodeCount(filteredEpisodes.length, allEpisodes.length);

//    });

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(searchElem, rootElem.secondChild);
// }

// //This is Select Code

// function addSelectFunctionality(allEpisodes) {
//   const selectElem = document.createElement("select");
//   selectElem.className = "episo-select";
//   selectElem.addEventListener("change", () => {
//     const selectedOption = selectElem.options[selectElem.selectedIndex];
//     const selectedEpisode = allEpisodes.find(
//       (episode) => getEpisodeCode(episode) === selectedOption.value
//     );
//     makePageForEpisodes([selectedEpisode]);
    
//   });

//   allEpisodes.forEach((episode) => {
//     const episodeOption = document.createElement("option");
//     episodeOption.value = getEpisodeCode(episode);
//     episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
//     selectElem.appendChild(episodeOption);
//   });

//   const selectWrapperElem = document.createElement("div");
//   selectWrapperElem.appendChild(selectElem);

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);



  
// }

// window.onload = setup;


  


















// let allShows = [];

// function setup() {
//   getAllShows().then((shows) => {
//     allShows = shows.sort((a, b) =>
//       a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
//     );
//     const showSelect = addShowSelect(allShows);
//     const selectedShowId = parseInt(showSelect.value);
//     getEpisodesForShow(selectedShowId).then((episodes) => {
//       makePageForEpisodes(episodes);
//       // addSearchFunctionality(episodes);
//       // addSelectFunctionality(episodes);
//       // addSearchFunctionality(episodes);
//     });
//   });
// }

// async function getAllShows() {
//   const response = await fetch("https://api.tvmaze.com/shows");
//   const data = await response.json();
//   return data;
// }

// async function getEpisodesForShow(showId) {
//   const response = await fetch(
//     `https://api.tvmaze.com/shows/${showId}/episodes`
//   );
//   const data = await response.json();
//   return data;
// }

// function addShowSelect(shows) {
//   const selectElem = document.createElement("select");
//   selectElem.className = "show-select";
//   selectElem.addEventListener("change", () => {
//     const selectedOption = selectElem.options[selectElem.selectedIndex];
//     const selectedShowId = parseInt(selectedOption.value);
//     getEpisodesForShow(selectedShowId).then((episodes) => {
//       makePageForEpisodes(episodes);
//       addSearchFunctionality(episodes);
//     });
//   });

//   shows.forEach((show) => {
//     const showOption = document.createElement("option");
//     showOption.value = show.id;
//     showOption.textContent = show.name;
//     selectElem.appendChild(showOption);
//   });

//   const selectWrapperElem = document.createElement("div");
//   selectWrapperElem.appendChild(selectElem);

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);

//   return selectElem;
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.innerHTML = "";

//   const episodeCountElem = document.createElement("p");
//   episodeCountElem.className = "episode-count";
//   addSelectFunctionality(episodeList);
//   addSearchFunctionality(episodeList);
//   episodeCountElem.textContent = `Displaying ${episodeList.length} / ${episodeList.length} episodes`;
//   rootElem.appendChild(episodeCountElem);

//   const gridContainer = document.createElement("div");
//   gridContainer.className = "grid-container";
//   rootElem.appendChild(gridContainer);

//   episodeList.forEach((episode) => {
//     const gridItem = document.createElement("div");
//     gridItem.className = "grid-item";
//     gridContainer.appendChild(gridItem);

//     const episodeCode = getEpisodeCode(episode);
//     const episodeTitle = `${episode.name} - ${episodeCode} `;
//     const episodeTitleElem = document.createElement("h2");
//     episodeTitleElem.textContent = episodeTitle;
//     gridItem.appendChild(episodeTitleElem);

//     const imgElem = document.createElement("img");
//     imgElem.src = episode.image.medium;
//     imgElem.alt = episodeTitle;
//     gridItem.appendChild(imgElem);

//     const summaryElem = document.createElement("summary");
//     summaryElem.innerHTML = episode.summary;
//     gridItem.appendChild(summaryElem);
//   });
// }

// function getEpisodeCode(episode) {
//   const season = episode.season.toString().padStart(2, "0");
//   const number = episode.number.toString().padStart(2, "0");
//   return `S${season}E${number}`;
// }

// //This is Search input Code
// function addSearchFunctionality(allEpisodes) {
//   const searchElem = document.createElement("input");
//   searchElem.className = "search-input";
//   searchElem.type = "text";
//   searchElem.placeholder = "Search episodes";
//   searchElem.addEventListener("input", () => {
//     const searchTerm = searchElem.value.toLowerCase();
//     const filteredEpisodes = allEpisodes.filter((episode) => {
//       const name = episode.name.toLowerCase();
//       const summary = episode.summary.toLowerCase();
//       return name.includes(searchTerm) || summary.includes(searchTerm);
//     });
    
//     makePageForEpisodes(filteredEpisodes);
//      updateEpisodeCount(filteredEpisodes.length, allEpisodes.length);

   

    
//   });

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(searchElem, rootElem.secondChild);
// }



// // //This is Select Code

// function addSelectFunctionality(allEpisodes) {
//   const selectElem = document.createElement("select");
//   selectElem.className = "episo-select";
//   selectElem.addEventListener("change", () => {
//     const selectedOption = selectElem.options[selectElem.selectedIndex];
//     const selectedEpisode = allEpisodes.find(
//       (episode) => getEpisodeCode(episode) === selectedOption.value
//     );
//     makePageForEpisodes([selectedEpisode]);
    
//   });

//   allEpisodes.forEach((episode) => {
//     const episodeOption = document.createElement("option");
//     episodeOption.value = getEpisodeCode(episode);
//     episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
//     selectElem.appendChild(episodeOption);
//   });

//   const selectWrapperElem = document.createElement("div");
//   selectWrapperElem.appendChild(selectElem);

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);

  
// }

// window.onload = setup;










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

//This is the Season Code
// function getEpisodeCode(episode) {
//   const season = episode.season.toString().padStart(2, "0");
//   const number = episode.number.toString().padStart(2, "0");
//   const episodeId = `S${season}E${number}`;
//   // return `S${season}E${number}`;
//   return episodeId;
// }


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
    const endpoint = `https://api.tvmaze.com/shows/${selectedShowId}/episodes`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => makePageForEpisodes(data))
      .catch(error => console.log(error));
  });

  // Add option for no movie selected
  const noMovieOption = document.createElement("option");
  noMovieOption.value = "";
  noMovieOption.textContent = "Select a Show";
  movieSelectElem.appendChild(noMovieOption);

   // Add options for each show
  const showIds = [82, 527, 169, 22036, 5];
  const showNames = ["Game of Thrones", "The Sopranos", "Breaking Bad", "Planet Earth II", "True Detective"];
  showIds.forEach((showId, index) => {
    const showOption = document.createElement("option");
    showOption.value = showId;
    showOption.textContent = showNames[index];
    movieSelectElem.appendChild(showOption);
  });

// Add movie select input to select wrapper
  selectWrapperElem.appendChild(movieSelectElem);

  // Add select wrapper to root element
  const rootElem = document.getElementById("root");
  rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);
}
window.onload = setup;


