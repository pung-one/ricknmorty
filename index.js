import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters (page) {
  cardContainer.innerHTML = "";
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await response.json();
  const characterArr = data.results;
  console.log(data);
  characterArr.forEach((element) => {
    cardContainer.append(createCharacterCard(element.name, element.image, element.status, element.type, element.episode.length));
  })
  
}

fetchCharacters();

nextButton.addEventListener("click", async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await response.json();
  maxPage = data.info.pages;
  page++;
  console.log(maxPage);
  if (page <= maxPage) {
    fetchCharacters(page);
    pagination.textContent = `${page} / ${maxPage}`;
  }
});

