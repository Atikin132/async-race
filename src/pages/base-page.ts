import { Screen } from "../interfaces/screen.interface.js";

export abstract class BasePage implements Screen {
  protected container = document.createElement("div");

  abstract create(parent: HTMLElement): void;

  show(): void {
    this.container.style.display = "flex";
  }

  hide(): void {
    this.container.style.display = "none";
  }

  updatePaginationButtons(
    containerSelector: string,
    currentPage: number,
    totalPages: number,
    firstPage: number = 1,
  ): void {
    const prevBtn = document.querySelector<HTMLButtonElement>(
      `${containerSelector} .prev-button`,
    );
    const nextBtn = document.querySelector<HTMLButtonElement>(
      `${containerSelector} .next-button`,
    );

    if (prevBtn) {
      const isFirstPage = currentPage === firstPage;
      prevBtn.classList.toggle("no-active", isFirstPage);
      prevBtn.disabled = isFirstPage;
    }

    if (nextBtn) {
      const isLastPage = currentPage === totalPages;
      nextBtn.classList.toggle("no-active", isLastPage);
      nextBtn.disabled = isLastPage;
    }
  }
}
