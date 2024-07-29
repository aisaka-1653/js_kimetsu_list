"use strict";

const GITHUB_BASE_URL = 'https://ihatov08.github.io/';
const API_BASE_URL = 'https://ihatov08.github.io/kimetsu_api/api/';

const containerElement = document.getElementById('content');
const radioButtons = document.querySelectorAll('.radio');

const createLoadingElement = () => {
  const loadingElement = document.createElement('p')
  loadingElement.textContent = 'loading...';
  return loadingElement;
};

const createErrorElement = (message) => {
  const errorElement = document.createElement('p');
  errorElement.textContent = `エラー: ${message}`;
  errorElement.style.color = 'red';
  return errorElement;
};

const fetchKimetsuData = async (endpoint) => {
  try {
    render(createLoadingElement());
    const response = await fetch(API_BASE_URL + endpoint);
    if (!response.ok) throw new Error('サーバーエラー');
    return await response.json();
  } catch (error) {
    console.error(error.message);
    render(createErrorElement(error.message));
  }
};

const createCharacterElement = ({ name, image, category }) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="character-card">
      <p>[${category}]</p>
      <p>${name}</p>
    </div>
    <img src="${GITHUB_BASE_URL}${image}" class="character-img" alt="${name}">
  `;
  return li;
};

const render = (element) => {
  containerElement.innerHTML = "";
  containerElement.appendChild(element);
};

const showCharacter = (characters) => {
  const characterList = document.createElement('ul');
  characterList.className = 'character-list';
  characterList.append(...characters.map(createCharacterElement));
  render(characterList);
};

const handleRadioChange = (e) => {
  const selectedValue = e.target.value;
  fetchKimetsuData(`${selectedValue}.json`).then(showCharacter);
};

radioButtons.forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});

fetchKimetsuData('all.json').then(showCharacter);
