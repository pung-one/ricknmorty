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
let minPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters (page) {
  cardContainer.innerHTML = "";
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;
  const characterArr = data.results;
  console.log(data);
  characterArr.forEach((element) => {
    cardContainer.append(createCharacterCard(element.name, element.image, element.status, element.type, element.episode.length));
  })
  
}

fetchCharacters(page);

nextButton.addEventListener("click", async () => {
  if (page <= maxPage) {
    page++;
    console.log(page);
    fetchCharacters(page);
    pagination.textContent = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", async () => {
  if (page > minPage) {
    page--;
    console.log(page);
    fetchCharacters(page);
    pagination.textContent = `${page} / ${maxPage}`;
  }
});