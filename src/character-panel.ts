import { LitElement, html } from "@polymer/lit-element";

export class CharacterPanel extends LitElement {
  _render() {
    let char = this.data;
    return html`
      <link rel="stylesheet" href="../styles/character-panel.scss" />
      <div class="character-panel">
				<h3 class="character-name">${char.name}</h3>

				<div class="character-init">${char.initiative}</div>
			</div>
    `;
  }
}

customElements.define("character-panel", CharacterPanel);
