import { isPage } from "../types/page.type.js";
import App from "./app.js";

export class Router {
  constructor(private app: App) {}

  init(): void {
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const route = target.dataset.route;

      if (route !== undefined && isPage(route)) {
        this.app.navigate(route);
      }
    });
  }
}
