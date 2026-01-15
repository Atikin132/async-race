import { Page } from "../interfaces/page.interface.js";

export abstract class BasePage implements Page {
  protected container = document.createElement("div");

  abstract create(parent: HTMLElement): void;

  show(): void {
    this.container.style.display = "block";
  }

  hide(): void {
    this.container.style.display = "none";
  }
}
