import { html, render } from "lit-html/lib/lit-extended";
import { repeat } from "lit-html/lib/repeat";
import Glide from "@glidejs/glide/dist/glide.modular.esm";
import { name } from "faker";

import { Character, PlayerCharacter, EnemyCharacter } from "./model";
import "./character-panel";

export class InitiativeApp extends HTMLElement {
  protected _characters: Character[];
  protected glide;

  constructor() {
    super();
    this._characters = new Array<Character>();
  }

  connectedCallback() {
    this.redraw();
    this.createSlider();
    this.dispatchEvent(new Event("ready"));
  }

  public next() {
    this.glide.go(">");
  }

  public prev() {
    this.glide.go("<");
  }

  protected createSlider() {
    this.glide = new Glide(this, {
      type: "slider",
      startAt: 0,
      perView: 2,
      peek: 100,
      focusAt: "center",
      classes: {
        activeSlide: "active-slide"
      }
    });

    this.glide.mount();
  }

  public regenerate() {
    if (this.glide) this.glide.destroy();
    this.createSlider();
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
    if (this._characters.length == 0)
      return html`<div data-glide-el="track"></div>`;

    return html`
        <div data-glide-el="track">
          <ul class="glide__slides">
            ${repeat(this.characters, (c: Character) =>
              this.getCharacterTemplate(c)
            )}
          </ul>
        </div>`;
  }

  redraw() {
    render(this.template, this);
  }
}
customElements.define("initiative-app", InitiativeApp);
export default InitiativeApp;
