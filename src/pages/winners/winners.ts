import { BasePage } from "../base-page.js";

export class Winners extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.innerHTML = `<h2>Winners</h2> <button data-route="garage">Go to Garage</button>`;
  }
}
