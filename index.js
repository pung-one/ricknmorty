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
let searchQuery = "";

async function fetchCharacters (page, name) {
  cardContainer.innerHTML = "";
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`)
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;
  const characterArr = data.results;
  characterArr.forEach((element) => {
    cardContainer.append(createCharacterCard(element.name, element.image, element.status, element.type, element.episode.length));
  }) 
}

fetchCharacters(page, searchQuery);

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters(page, searchQuery);
  }
});

prevButton.addEventListener("click", () => {
  if (page > minPage) {
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters(page, searchQuery);
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  fetchCharacters(page, searchQuery);
})