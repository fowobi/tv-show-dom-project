
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
 
 
  console.log(allEpisodes);
}


   //This is header-Displaying Number Code 
function makePageForEpisodes(episodeList) {
  
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
   addSelectFunctionality(episodeList);
   addSearchFunctionality(episodeList);
  const episodeCountElem = document.createElement("episode-count-p");
  // episodeCountElem.className = "episode-count";
  episodeCountElem.textContent = `Displaying ${episodeList.length} / ${getAllEpisodes().length} episodes`;
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
function getEpisodeCode(episode) {
  const season = episode.season.toString().padStart(2, "0");
  const number = episode.number.toString().padStart(2, "0");
  return `S${season}E${number}`;
}

//This is Search input Code
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
    //  updateEpisodeCount(filteredEpisodes.length, allEpisodes.length);

   

    
  });

  const rootElem = document.getElementById("root");
  rootElem.insertBefore(searchElem, rootElem.firstChild);
}



//This is Select Code

function addSelectFunctionality(allEpisodes) {
  const selectElem = document.createElement("select");
  selectElem.className = "episo-select";
  selectElem.addEventListener("change", () => {
    const selectedOption = selectElem.options[selectElem.selectedIndex];
    const selectedEpisode = allEpisodes.find(
      (episode) => getEpisodeCode(episode) === selectedOption.value
    );
    makePageForEpisodes([selectedEpisode]);
    
  });

  allEpisodes.forEach((episode) => {
    const episodeOption = document.createElement("option");
    episodeOption.value = getEpisodeCode(episode);
    episodeOption.textContent = getEpisodeCode(episode) + " - " + episode.name;
    selectElem.appendChild(episodeOption);
  });

  const selectWrapperElem = document.createElement("div");
  selectWrapperElem.appendChild(selectElem);

  const rootElem = document.getElementById("root");
  rootElem.insertBefore(selectWrapperElem, rootElem.firstChild);

  
}

window.onload = setup;


