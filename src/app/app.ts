import { Screen } from "../interfaces/screen.interface.js";
import header from "../layout/header/header.js";
import { Page } from "../types/page.type.js";
import MainCreator from "../utils/main/main-creator.js";

export default class App {
  private pages = new Map<string, Screen>();
  private current?: Screen;
  private root: HTMLElement;

  private headerElement?: HTMLElement;
  private main = new MainCreator({
    classes: ["main"],
  }).getElement();

  constructor(root: HTMLElement) {
    this.root = root;
  }

  init(initPage: Page): void {
    this.headerElement = header(initPage);

    this.root.append(this.headerElement);
    this.root.append(this.main);
  }

  register(page: Page, screen: Screen): void {
    this.pages.set(page, screen);
    screen.create(this.root);
    screen.hide();
  }

  navigate(page: Page): void {
    this.current?.hide();

    const next = this.pages.get(page);
    if (!next) {
      return;
    }

    this.current = next;
    next.show();

    this.updateHeader(page);
  }

  private updateHeader(page: Page): void {
    if (!this.headerElement) {
      return;
    }

    const newHeader = header(page);
    this.headerElement.replaceWith(newHeader);
    this.headerElement = newHeader;
  }
}
