import { Screen } from "../interfaces/screen.interface.js";
import footer from "../layout/footer/footer.js";
import header from "../layout/header/header.js";
import { Page } from "../types/page.type.js";
import MainCreator from "../utils/main/main-creator.js";

export default class App {
  private pages = new Map<string, Screen>();
  private current?: Screen;
  private root: HTMLElement;

  private headerElement?: HTMLElement;
  private main?: HTMLElement;
  private footer?: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  init(initPage: Page): void {
    this.headerElement = header(initPage);
    this.main = new MainCreator({
      classes: ["main"],
    }).getElement();
    this.footer = footer();
    this.root.append(this.headerElement);
    this.root.append(this.main);
    this.root.append(this.footer);
  }

  register(page: Page, screen: Screen): void {
    this.pages.set(page, screen);
    if (this.main) {
      screen.create(this.main);
    }
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
