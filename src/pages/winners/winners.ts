import infoPageComponent from "../../components/info-page.component/info-page.component.js";
import ElementCreator from "../../utils/element-creator.js";
import { BasePage } from "../base-page.js";
import nextPrevComponent from "../../components/next-prev.component/next-prev.component.js";

import "./winners.css";
import { winnersController } from "../../controllers/winners.controller.js";
import ButtonCreator from "../../utils/button/button-creator.js";

const FIRST_PAGE = 1;
export class Winners extends BasePage {
  private _winnersInfoTableContainer?: HTMLElement;

  private get winnersInfoTableContainer(): HTMLElement {
    if (!this._winnersInfoTableContainer) {
      throw new Error("winnersInfoTableContainer is not initialized");
    }
    return this._winnersInfoTableContainer;
  }

  private renderInfoContainer(): void {
    this.winnersInfoTableContainer
      .querySelector(".info-page-container")
      ?.remove();

    this.winnersInfoTableContainer.prepend(
      infoPageComponent(
        "Winners",
        winnersController.totalWinnersCount,
        winnersController.currentPage,
      ),
    );
  }
  private updateNextPrevBtn() {
    const prevBtn = document.querySelector(".winners .prev-button");
    const nextBtn = document.querySelector(".winners .next-button");
    if (prevBtn instanceof HTMLButtonElement) {
      if (winnersController.currentPage === FIRST_PAGE) {
        prevBtn.classList.add("no-active");
        prevBtn.disabled = true;
      } else {
        prevBtn.classList.remove("no-active");
        prevBtn.disabled = false;
      }
    }
    if (nextBtn instanceof HTMLButtonElement) {
      if (winnersController.currentPage === winnersController.totalPages) {
        nextBtn.classList.add("no-active");
        nextBtn.disabled = true;
      } else {
        nextBtn.classList.remove("no-active");
        nextBtn.disabled = false;
      }
    }
  }

  private async update(): Promise<void> {
    await winnersController.loadWinners();
    this.renderInfoContainer();
    this.updateNextPrevBtn();
  }

  private async generateWinners(): Promise<void> {
    await winnersController.createWinner(
      winnersController.totalWinnersCount + 1,
      2,
      3,
    );
  }

  private async handleGenerateClick(): Promise<void> {
    await this.generateWinners();
    await this.update();
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.className = "winners";

    const button = new ButtonCreator({
      parent: this.container,
      classes: ["button"],
      text: "Generate Winners",
    }).getElement();

    button.addEventListener("click", () => {
      void this.handleGenerateClick();
    });

    this._winnersInfoTableContainer = new ElementCreator({
      parent: this.container,
      classes: ["winners-info-table-container"],
    }).getElement();

    this.container.append(
      nextPrevComponent(
        async () => {
          await winnersController.prevPage();
          await this.update();
        },
        async () => {
          await winnersController.nextPage();
          await this.update();
        },
      ),
    );

    this.update().catch(() => {
      throw new Error("Error loading winners");
    });
  }
}
