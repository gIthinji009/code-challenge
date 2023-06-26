// Your code here
const characters = [];
function getCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((data) => {
      characters = data;
      console.log(characters);
    });
}

getCharacters();
const characterBar = document.getElementById("character-bar");
characters.forEach((character) => {
  const span = document.createElement("span");
  span.innerText = character.name;
  characterBar.appendChild(span);
});
const detailedInfo = document.getElementById("detailed-info");
const characterForm = document.getElementById("character-form");
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const imageUrl = document.getElementById("image-url").value;
  const character = {
    name,
    imageUrl,
    votes: 0,
  };
  characters.push(character);
  getCharacters();
});
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  const characterId = detailedInfo.dataset.characterId;
  fetch(`http://localhost:3000/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votes: 0,
    }),
  });
});
const votesForm = document.getElementById("votes-form");
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const characterId = detailedInfo.dataset.characterId;
  const votes = document.getElementById("votes").value;
  fetch(`http://localhost:3000/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votes,
    }),
  });
  const detailedInfo = document.getElementById("detailed-info");
  detailedInfo.innerHTML = `
    <p id="name">${characterId.name}</p>
    <img
      id="image"
      src="${characterId.image}"
      alt="${characterId.name}"
    />
    <h4>Total Votes: <span id="vote-count">${votes}</span></h4>
  `;
  
});

