
function setup() {
  const showsEndpoint = "https://api.tvmaze.com/shows";
  const episodesEndpoint = "https://api.tvmaze.com/shows/82/episodes";

  fetch(showsEndpoint)
    .then((response) => response.json())
    .then((data) => {
      makeShowsListing(data);
      addShowFiltering(data);
      // addSearchFunctionality(data);
      

    })
    .catch((error) => console.log(error));

  fetch(episodesEndpoint)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data))
    
      
    .catch((error) => console.log(error));
}

function addSearchFunctionality(allShows) {
  const searchElem = document.createElement("input");
  searchElem.className = "search-input";
  searchElem.type = "text";
  searchElem.placeholder = "Search shows";
  searchElem.addEventListener("input", () => {
    const searchTerm = searchElem.value.toLowerCase();
    const filteredShows = allShows.filter((show) => {
      const name = show.name.toLowerCase();
      const genres = show.genres.map((genre) => genre.toLowerCase());
      const summary = show.summary.toLowerCase();
      return (
        name.includes(searchTerm) ||
        genres.includes(searchTerm) ||
        summary.includes(searchTerm)
      );
    });
    makeShowsListing(filteredShows);
  });

  const rootElem = document.getElementById("root");
  rootElem.insertBefore(searchElem, rootElem.firstChild);
}

function makeShowsListing(shows) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const showsContainer = document.createElement("div");
  showsContainer.className = "shows-container";
  rootElem.appendChild(showsContainer);

  shows.forEach((show) => {
    const showElem = document.createElement("div");
    showElem.className = "show";

    showElem.setAttribute("data-show-id", show.id);

    showElem.addEventListener("click", () => {
      const episodesEndpoint = `https://api.tvmaze.com/shows/${show.id}/episodes`;
      fetch(episodesEndpoint)
        .then((response) => response.json())
        .then((data) => {
          makePageForEpisodes(data);
          const episodesContainer = rootElem.querySelector(".episodes-container");
          episodesContainer.style.display = "block";
        })
        .catch((error) => console.log(error));
    });
  
    const showName = document.createElement("h2");
    showName.className = "show-name";
    showName.textContent = show.name;
    showElem.appendChild(showName);

    const showImage = document.createElement("img");
    showImage.className = "show-image";
    showImage.src = show.image.medium;
    showImage.alt = show.name;
    showElem.appendChild(showImage);

    const showSummary = document.createElement("summary");
    showSummary.className = "show-summary";
    showSummary.innerHTML = show.summary;
    showElem.appendChild(showSummary);

    // Create a div to wrap genres, status, rating, and runtime
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "details-container";

     const ratingDiv = document.createElement("div");
     ratingDiv.className = "rating-div";
     ratingDiv.textContent = `Rating: ${show.rating.average || "N/A"}`;

    const genresDiv = document.createElement("div");
    genresDiv.className = "status-div";
    genresDiv.textContent = `Genres: ${show.genres.join(", ")}`;

    const statusDiv = document.createElement("div");
    statusDiv.className = "status-div";
    statusDiv.textContent = `Status: ${show.status}`;

    const runtimeDiv = document.createElement("div");
    runtimeDiv.className = "status-div";
    runtimeDiv.textContent = `Runtime: ${show.runtime} minutes`;

    // Wrap the elements inside a div
    const showDetails = document.createElement("div");
    showDetails.className = "show-details";
    showDetails.appendChild(showImage);
    showDetails.appendChild(showSummary);

    detailsContainer.appendChild(ratingDiv);
    detailsContainer.appendChild(genresDiv);
    detailsContainer.appendChild(statusDiv);
    detailsContainer.appendChild(runtimeDiv);

    showElem.appendChild(showDetails);

    showElem.appendChild(detailsContainer);
    showsContainer.appendChild(showElem);
  });

  if (shows.length === 0) {
    const noResultsElem = document.createElement("div");
    noResultsElem.className = "no-results";
    noResultsElem.textContent = "No results found.";
    showsContainer.appendChild(noResultsElem);
  }
 }

function addShowFiltering(allShows) {
  const rootElem = document.getElementById("root");
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";
  rootElem.insertBefore(filterContainer, rootElem.firstChild);

  const filterInput = document.createElement("input");
  filterInput.className = "show-filter-input";
  filterInput.placeholder = "Enter a show name...";
  filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase().trim();
    const filteredShows = allShows.filter((show) => {
      const showName = show.name.toLowerCase();
      const showSummary = show.summary.toLowerCase();
      return (
        showName.includes(filterValue) || showSummary.includes(filterValue)
      );
    });

    // console.log("here", filteredShows);
    makeFilteredShowsListing(filteredShows);

  });
  filterContainer.appendChild(filterInput);


  const filterCount = document.createElement("p");
  filterCount.className = "filter-count";
  filterContainer.appendChild(filterCount);

  const filteredShowsContainer = document.createElement("div");
  filteredShowsContainer.className = "filtered-shows-container";
  rootElem.appendChild(filteredShowsContainer);

  function makeFilteredShowsListing(filteredShows) {
    filteredShowsContainer.innerHTML = "";
    filterCount.textContent = `Found ${filteredShows.length} shows`;

    if (filteredShows.length === 0) {
      filterCount.style.display = "none";
      return;
    } else {
      filterCount.style.display = "block";
    }

    const rootElem = document.getElementById("root");

    //Remove existing dropdown container code
    const existingDropdownContainer = document.querySelector(".filtered-shows-dropdown-container");
    if (existingDropdownContainer) {
      existingDropdownContainer.remove();
    }

    const filteredShowsDropdownContainer = document.createElement("div");
    filteredShowsDropdownContainer.className =
      "filtered-shows-dropdown-container";
    rootElem.insertBefore(filteredShowsDropdownContainer, rootElem.firstChild);

    const filteredShowsDropdown = document.createElement("select");
    filteredShowsDropdown.className = "filtered-shows-dropdown";
    filteredShowsDropdown.addEventListener("change", () => {
      const selectedShowId = parseInt(filteredShowsDropdown.value);
      const selectedShow = filteredShows.find(
        (show) => show.id === selectedShowId
      );

     
     if (selectedShow) {
      
    console.log(selectedShow);
    }
    
    // Clear existing show details code
      const existingShowDetailsContainer = rootElem.querySelector(".show-details-container");
      if (existingShowDetailsContainer) {
        existingShowDetailsContainer.remove();
      }
    
      // Hide all show divs code
      const showsContainer = document.querySelector(".shows-container");
      const showDivs = showsContainer.getElementsByClassName("show");
      for (let i = 0; i < showDivs.length; i++) {
        const showDiv = showDivs[i];
        showDiv.style.display = "none";
      }
    
      // Show only the selected show
      const selectedShowDiv = showsContainer.querySelector(`[data-show-id="${selectedShow.id}"]`);
      if (selectedShowDiv) {
        selectedShowDiv.style.display = "block";
      }
    }
  

);
     
    filteredShows.forEach((show) => {
      const showOption = document.createElement("option");
      showOption.value = show.id;
      showOption.textContent = show.name;
      filteredShowsDropdown.appendChild(showOption);
    });

    filteredShowsDropdownContainer.appendChild(filteredShowsDropdown);
    
    // Show only the filtered shows
    const showsContainer = document.querySelector(".shows-container");
    const showDivs = showsContainer.getElementsByClassName("show");
    for (let i = 0; i < showDivs.length; i++) {
      const showDiv = showDivs[i];
      const showId = parseInt(showDiv.getAttribute("data-show-id"));
      if (filteredShows.some((show) => show.id === showId)) {
        showDiv.style.display = "block";
      } else {
        showDiv.style.display = "none";
      }
    }
  }

}


// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   const episodesContainer = rootElem.querySelector(".episodes-container");
//   if (!episodesContainer) {
//     const episodesContainer = document.createElement("div");
//     episodesContainer.className = "episodes-container";
//     rootElem.appendChild(episodesContainer);
//   } else {
//     episodesContainer.innerHTML = "";
//   }
// }

// This is the Season Code
function getEpisodeCode(episode) {
  const season = episode.season.toString().padStart(2, "0");
  const number = episode.number.toString().padStart(2, "0");
  const episodeId = `S${season}E${number}`;
  return episodeId;
}


function makePageForEpisodes(episodeList, selectedShowId = "") {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  addSelectFunctionality(episodeList, selectedShowId);
  addSearchFunctionality(episodeList);
  const episodeCountElem = document.createElement("p");
  episodeCountElem.className = "episode-count";
  episodeCountElem.textContent = `Displaying ${episodeList.length} / ${episodeList.length} episodes`;
  rootElem.appendChild(episodeCountElem);


 // This big container for the Movie(grid-container)
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  rootElem.appendChild(gridContainer);

  // This is the each movie Card container Code(grid-item)
  episodeList.forEach((episode) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridContainer.appendChild(gridItem);

    // This is Movie Title Code both episode-Name and episode-Code
    const episodeCode = getEpisodeCode(episode);
    const episodeTitle = `${episode.name} - ${episodeCode} `;
    const episodeTitleElem = document.createElement("h2");
    episodeTitleElem.className = "episode-title-elem";
    episodeTitleElem.textContent = episodeTitle;
    gridItem.appendChild(episodeTitleElem);

    // This is Image Code
    const imgElem = document.createElement("img");
    imgElem.src = episode.image.medium;
    imgElem.alt = episodeTitle;
    gridItem.appendChild(imgElem);

    // This is the Episode summary code
    const summaryElem = document.createElement("summary");
    summaryElem.className = "summary-elem";
    summaryElem.innerHTML = episode.summary;
    gridItem.appendChild(summaryElem);
  });
}

// function addSearchFunctionality(allShows) {
//   const searchElem = document.createElement("input");
//   searchElem.className = "search-input";
//   searchElem.type = "text";
//   searchElem.placeholder = "Search shows";
//   searchElem.addEventListener("input", () => {
//     const searchTerm = searchElem.value.toLowerCase();
//     const filteredShows = allShows.filter((show) => {
//       const name = show.name.toLowerCase();
//       const genres = show.genres.map((genre) => genre.toLowerCase());
//       const summary = show.summary.toLowerCase();
//       return (
//         name.includes(searchTerm) ||
//         genres.includes(searchTerm) ||
//         summary.includes(searchTerm)
//       );
//     });
//     makeShowsListing(filteredShows);
//   });

//   const rootElem = document.getElementById("root");
//   rootElem.insertBefore(searchElem, rootElem.firstChild);
// }

// //commented code
// function addSelectFunctionality(allEpisodes) {
//   const selectWrapperElem = document.createElement("div");
//   selectWrapperElem.className = "select-wrapper";



//   // Create episode select input
//   const episodeSelectElem = document.createElement("select");
//   episodeSelectElem.className = "episode-select";
//    episodeSelectElem.onchange = function () {
//    const selectedOption = episodeSelectElem.options[episodeSelectElem.selectedIndex];
//     const selectedEpisode = allEpisodes.find((episode) => episode.id === parseInt(selectedOption.value));
//     makePageForEpisodes([selectedEpisode]);
//     window.location.hash = `#${episodeSelectElem.value}`;
//   };

//   // Add option for all episodes
//   const allEpisodesOption = document.createElement("option");
//   allEpisodesOption.value = "";
//   allEpisodesOption.textContent = "All Episodes";
//   episodeSelectElem.appendChild(allEpisodesOption);

//  // Create a copy of the original episode data
//     const originalEpisodes = [...allEpisodes];

//   //Sort episodes by name in alphabetical order, case-insensitive
//   allEpisodes.sort((a, b) =>
//     a.name.toLowerCase().localeCompare(b.name.toLowerCase())
//   );

 
//    // new code-just now
//    allEpisodes.forEach((episode) => {
//     const episodeOption = document.createElement("option");
//     episodeOption.value = episode.id;
//     episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
//     episodeSelectElem.appendChild(episodeOption);
//   });


//   // Add episode select input to select wrapper
//   selectWrapperElem.appendChild(episodeSelectElem);

//   // Create movie select input- just commented
//    const movieSelectElem = document.createElement("select");
//    movieSelectElem.className = "movie-select";
//    movieSelectElem.addEventListener("change", () => {
//     const selectedOption = movieSelectElem.options[movieSelectElem.selectedIndex];
//     const selectedShowId = selectedOption.value;
 
//   if (selectedShowId !== " ") {
//       const selectedShow = allShows.find((show) => show.id === parseInt(selectedShowId));
//     const endpoint = `https://api.tvmaze.com/shows/${selectedShow.id}/episodes`;
//       fetch(endpoint)
//         .then((response) => response.json())
//         .then((data) => {
//           allEpisodes = data; 
//           resetEpisodeDropdown();
//           makePageForEpisodes(data);
           
//         })
//         .catch((error) => console.log(error));
//     } else {
//       resetEpisodeDropdown();
//       makePageForEpisodes(allEpisodes);
        
//     }
//   });
   

//   // Add option for no movie selected
//   const noMovieOption = document.createElement("option");
//   noMovieOption.value = " ";
//   noMovieOption.textContent = "Select a Show";
//   movieSelectElem.appendChild(noMovieOption);
  
//  // Retrieve the list of shows using getAllShows() function
//   const allShows = getAllShows();

// // Extract show names from the objects
//   const showNames = allShows.map((show) => show.name);

  
//   // Sort show names in alphabetical order, case-insensitive
//  showNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

//   // new code-just-commented now
//    showNames.forEach((showName) => {
//     const showOption = document.createElement("option");
//     showOption.textContent = showName;

//     // Find the corresponding show object by name
//     const show = allShows.find((show) => show.name === showName);
//     showOption.value = show.id;
//     movieSelectElem.appendChild(showOption);
//   });

   
//   // Add movie select input to select wrapper
//   selectWrapperElem.appendChild(movieSelectElem);

//   // Add select wrapper to root element
//   const rootElem = document.getElementById("root");
//   rootElem.appendChild(selectWrapperElem);

//  // Function to reset the episode dropdown to display all episodes
//   function resetEpisodeDropdown() {
//   const selectedOptionValue = episodeSelectElem.value;
//    episodeSelectElem.innerHTML = ""; 


//    const allEpisodesOption = document.createElement("option");
//     allEpisodesOption.value = "";
//     allEpisodesOption.textContent = "All Episodes";
//     episodeSelectElem.appendChild(allEpisodesOption);


//     originalEpisodes.forEach((episode) => {
//       const episodeOption = document.createElement("option");
//       episodeOption.value = episode.id;
//       episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
//       episodeSelectElem.appendChild(episodeOption);
//     });

//        if (selectedOptionValue) {
//        episodeSelectElem.value = selectedOptionValue;
//     }
 
// }





// window.onload = setup;




function addSelectFunctionality(allEpisodes) {
  const selectWrapperElem = document.createElement("div");
  selectWrapperElem.className = "select-wrapper";

  // Create episode select input
  const episodeSelectElem = document.createElement("select");
  episodeSelectElem.className = "episode-select";

  // Function to populate episode options in the dropdown
  function populateEpisodeOptions() {
    episodeSelectElem.innerHTML = "";

    // Add option for all episodes
    const allEpisodesOption = document.createElement("option");
    allEpisodesOption.value = "";
    allEpisodesOption.textContent = "All Episodes";
    episodeSelectElem.appendChild(allEpisodesOption);

    allEpisodes.forEach((episode) => {
      const episodeOption = document.createElement("option");
      episodeOption.value = episode.id;
      episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
      episodeSelectElem.appendChild(episodeOption);
    });
  }

  // Call the function to initially populate episode options
  populateEpisodeOptions(allEpisodes);

  episodeSelectElem.onchange = function () {
    const selectedOption = episodeSelectElem.options[episodeSelectElem.selectedIndex];
    const selectedEpisode = allEpisodes.find((episode) => episode.id === parseInt(selectedOption.value));
    makePageForEpisodes([selectedEpisode]);
    window.location.hash = `#${episodeSelectElem.value}`;
  };

  // Add episode select input to select wrapper
  selectWrapperElem.appendChild(episodeSelectElem);

  

  // Create movie select input
  const movieSelectElem = document.createElement("select");
  movieSelectElem.className = "movie-select";
  movieSelectElem.addEventListener("change", () => {
    const selectedOption = movieSelectElem.options[movieSelectElem.selectedIndex];
    const selectedShowId = selectedOption.value;

    if (selectedShowId !== "") {
      const selectedShow = allShows.find((show) => show.id === parseInt(selectedShowId));
      const endpoint = `https://api.tvmaze.com/shows/${selectedShow.id}/episodes`;
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          allEpisodes = data;
          populateEpisodeOptions(); // Update episode options in the dropdown
          makePageForEpisodes(data);
        })
        .catch((error) => console.log(error));
    } else {
      populateEpisodeOptions(allEpisodes); // Update episode options in the dropdown
      makePageForEpisodes(allEpisodes);
    }
  });

     // Add option for no movie selected
  const noMovieOption = document.createElement("option");
  noMovieOption.value = " ";
  noMovieOption.textContent = "Select a Show";
  movieSelectElem.appendChild(noMovieOption);
  
 // Retrieve the list of shows using getAllShows() function
  const allShows = getAllShows();

// Extract show names from the objects
  const showNames = allShows.map((show) => show.name);

  
  // Sort show names in alphabetical order, case-insensitive
 showNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // new code-just-commented now
   showNames.forEach((showName) => {
    const showOption = document.createElement("option");
    showOption.textContent = showName;

    // Find the corresponding show object by name
    const show = allShows.find((show) => show.name === showName);
    showOption.value = show.id;
    movieSelectElem.appendChild(showOption);
  });

  // Add movie select input to select wrapper
  selectWrapperElem.appendChild(movieSelectElem);

  // Add select wrapper to root element
  const rootElem = document.getElementById("root");
  rootElem.appendChild(selectWrapperElem);


 

  }




window.onload = setup;






