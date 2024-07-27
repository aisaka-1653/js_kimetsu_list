"use strict";

const GITHUB_BASE_URL = 'https://ihatov08.github.io/';
const API_BASE_URL = 'https://ihatov08.github.io/kimetsu_api/api/';

function createLoadingElement() {
  const loadingElement = document.createElement('p')
  loadingElement.textContent = 'loading...';
  return loadingElement;
}

async function fetchKimetsuData(endpoint) {
  render(createLoadingElement());
  const response = await fetch(API_BASE_URL + endpoint);
  return await response.json();
}

function createElement(character) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const name = document.createElement('p');
  const image = document.createElement('img');
  const category = document.createElement('p');

  name.textContent = character.name;
  image.src = GITHUB_BASE_URL + character.image;
  category.textContent = `[${character.category}]`;
    
  div.className = 'character-card';
  image.className = 'character-img';

  div.appendChild(category);
  div.appendChild(name);
  li.appendChild(div);
  li.appendChild(image);

  return li;
} 

function render(element) {
  containerElement.innerHTML = "";
  containerElement.appendChild(element);
}

function showCharacter(characters) {
  const characterList = document.createElement('ul');

  characterList.className = 'character-list';
  const liElements = characters.map(createElement);

  for (let li of liElements) {
    characterList.appendChild(li);
  }
  render(characterList);
}

function handleRadioChange(e) {
  const selectedValue = e.target.value;
  fetchKimetsuData(`${selectedValue}.json`).then(characters => {
    showCharacter(characters);
  });
}

const containerElement = document.getElementById('content');
const radioButtons = document.querySelectorAll('.radio');

radioButtons.forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});

fetchKimetsuData('all.json').then(characters => {
  showCharacter(characters);
});
