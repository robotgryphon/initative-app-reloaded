import { Character, PlayerCharacter, EnemyCharacter } from "./model";

export async function loadCharacters() {
  let characters = JSON.parse(localStorage.getItem("characters")) || [];

  let mapped = characters.map(c => {
    switch (c.type.toLowerCase()) {
      case "enemy":
        return new EnemyCharacter(c);

      case "player":
        return new PlayerCharacter(c);

      default:
        return new Character(c);
    }
  });

  return mapped.filter(c => c);
}

export async function filterCharacters(characters) {
  let filtered = [];
  characters.forEach(character => {
    let seen = false;
    filtered.forEach(fc => {
      if (character.name == fc.name) {
        seen = true;
      }
    });

    if (!seen) filtered.push(character);
  });

  return filtered;
}

export function getRandomNumber(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
