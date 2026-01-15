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

      if (route !== undefined) {
        this.app.navigate(route);
      }
    });
  }
}
