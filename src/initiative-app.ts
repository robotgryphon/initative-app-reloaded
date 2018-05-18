import { html, render } from "lit-html/lib/lit-extended";
import { repeat } from "lit-html/lib/repeat";

import { name } from "faker";

import { Character, PlayerCharacter, EnemyCharacter } from "./model";
import "./character-panel";

export class InitiativeApp extends HTMLElement {
  protected _characters: Character[];
  protected current: Element;
  public currentCharacter: Character;
  public nextCharacter: Character;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._characters = new Array<Character>();
  }

  connectedCallback() {
    this.redraw();
    this.current = this.shadowRoot.querySelector("character-panel");
    this.dispatchEvent(new Event("ready"));
  }

  public next() {
    this.current.addEventListener("animationend", _ => {
      let el = this.current;
      el.remove();
      el.classList.remove("removing");

      this.current = this.nextCharacter;
      this.nextCharacter = this.current.nextElement;
      this.container.appendChild(el);
    });

    this.current.classList.add("removing");
  }

  public get characters() {
    return this._characters;
  }

  public set characters(c: Character[]) {
    if (!c) return;
    let characters = c.sort((a, b) => {
      let initA = a.initiative || 0;
      let initB = b.initiative || 0;
      return initB - initA;
    });

    this._characters = characters;
    this.redraw();
    this.dispatchEvent(new Event("characters-updated"));
  }

  private getCharacterTemplate(c: Character) {
    let enemy = c instanceof EnemyCharacter;
    return html`<character-panel type$="${
      enemy ? "enemy" : "player"
    }" data="${c}"></character-panel>`;
  }

  private get template() {
    if (this._characters.length == 0) return html``;

    return html`
        <div id="track">
            ${repeat(this._characters, (c: Character) =>
              this.getCharacterTemplate(c)
            )}
        </div>`;
  }

  redraw() {
    render(this.template, this.shadowRoot);
  }
}
customElements.define("initiative-app", InitiativeApp);
export default InitiativeApp;
