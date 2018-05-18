import { InitiativeApp } from "./initiative-app";
import { loadCharacters, getRandomNumber } from "./util";
import { PlayerCharacter, EnemyCharacter } from "./model";

// ==================================================================

console.clear();

let characters = [];
for (let i = 0; i < 5; i++) {
  let nc = new PlayerCharacter();
  nc.name = "Player";
  nc.initiative = getRandomNumber(1, 25);

  characters.push(nc);
}

let app = new InitiativeApp();
app.characters = characters;

console.log(app);
document.body.appendChild(app);

app.addEventListener("ready", ev => {
  console.log("Application ready.");
});

document
  .querySelector("button#prev-turn-btn")
  .addEventListener("click", _ => app.prev());

document
  .querySelector("button#next-turn-btn")
  .addEventListener("click", _ => app.next());

document.querySelector("button#persist").addEventListener("click", () => {
  console.log(localStorage);
  console.log(app.characters);
  localStorage.setItem("characters", JSON.stringify(app.characters));
});

document.querySelector("button#load").addEventListener("click", async () => {
  let oldCharacters = app.characters;
  let newCharacters = await loadCharacters();

  app.characters = [];
  app.characters = newCharacters;
  app.regenerate();
});

document.querySelector("button#clean").addEventListener("click", () => {
  let confirm = window.confirm("Clear characters?");
  if (confirm) {
    app.characters = [];
  }
});

document.addEventListener("keyup", event => {
  switch (event.key) {
    case "ArrowLeft":
    case "PageUp":
      app.prev();
      break;
    case "ArrowRight":
    case "PageDown":
      app.next();
      break;
    default:
      console.log(event.key);
      break;
  }
});
