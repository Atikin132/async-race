import { BasePage } from "../base-page.js";

export class Garage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.innerHTML = `<h2>Garage</h2> <button data-route="winners">Go to Winners</button>`;
  }
}
