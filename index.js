"use strict";

const GITHUB_BASE_URL = 'https://ihatov08.github.io/';
const API_BASE_URL = 'https://ihatov08.github.io/kimetsu_api/api/';

async function fetchKimetsuData(endpoint) {
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

function showCharacter(characters) {
  const characterList = document.querySelector('.character-list');
  const liElements = characters.map(createElement);
  for (let li of liElements) {
    characterList.appendChild(li);
  }
}

fetchKimetsuData('all.json').then(characters => {
  showCharacter(characters);
});
