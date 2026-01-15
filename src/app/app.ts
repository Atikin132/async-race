import { Page } from "../interfaces/page.interface.js";

export default class App {
  private pages = new Map<string, Page>();
  private current?: Page;
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  register(name: string, page: Page): void {
    this.pages.set(name, page);
    page.create(this.root);
    page.hide();
  }

  navigate(name: string): void {
    this.current?.hide();

    const next = this.pages.get(name);
    if (!next) {
      return;
    }

    this.current = next;
    next.show();
  }
}
