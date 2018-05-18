import { LitElement, html } from "@polymer/lit-element";

export class CharacterPanel extends LitElement {
  _render() {
    let char = this.data;
    return html`
      <style>
        :host {
          text-align: center;
        }

        .character-name {
          font-size: 32pt;
          flex-grow: 1;
          word-break: break-all;
          text-align: center;
          margin: 0;
        }

        .character-init {
          font-size: 24pt;
        }

        :host([type="enemy"]) {
          background-color: lighten(red, 35);
        }
      </style>

      <div class="character-panel">
				<h3 class="character-name">${char.name}</h3>

				<div class="character-init">${char.initiative}</div>
			</div>
    `;
  }
}

customElements.define("character-panel", CharacterPanel);
