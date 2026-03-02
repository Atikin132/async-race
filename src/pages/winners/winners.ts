import infoPageComponent from "../../components/info-page.component/info-page.component.js";
import ElementCreator from "../../utils/element-creator.js";
import { BasePage } from "../base-page.js";
import nextPrevComponent from "../../components/next-prev.component/next-prev.component.js";
import { winnersController } from "../../controllers/winners.controller.js";
import winnersTableComponent from "../../components/winners-table.component/winners-table.component.js";
import "./winners.css";

export class Winners extends BasePage {
  private _winnersInfoTableContainer?: HTMLElement;
  private _winnersTable?: HTMLElement;

  private get winnersInfoTableContainer(): HTMLElement {
    if (!this._winnersInfoTableContainer) {
      throw new Error("winnersInfoTableContainer is not initialized");
    }
    return this._winnersInfoTableContainer;
  }

  private get winnersTable(): HTMLElement {
    if (!this._winnersTable) {
      throw new Error("winnersTable is not initialized");
    }
    return this._winnersTable;
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

  private renderTable(): void {
    this.winnersTable.innerHTML = "";
    this.winnersTable.append(
      winnersTableComponent(
        winnersController.winners,
        winnersController.currentPage,
        async (field) => {
          winnersController.setSort(field);
          await this.update();
        },
      ),
    );
  }

  async update(): Promise<void> {
    await winnersController.loadWinners();
    this.renderInfoContainer();
    this.renderTable();
    this.updatePaginationButtons(
      ".winners",
      winnersController.currentPage,
      winnersController.totalPages,
    );
    this.updateSortIndicators();
  }

  private updateSortIndicators(): void {
    const headers =
      this.container.querySelectorAll<HTMLTableCellElement>("th.sortable");

    for (const th of headers) {
      const field = th.dataset.sort;
      th.classList.remove("ASC", "DESC");
      if (field === winnersController.sortField) {
        th.classList.add(winnersController.sortOrder);
      }
    }
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.className = "winners";

    this._winnersInfoTableContainer = new ElementCreator({
      parent: this.container,
      classes: ["winners-info-table-container"],
    }).getElement();

    this._winnersTable = new ElementCreator({
      parent: this._winnersInfoTableContainer,
      classes: ["winners-table-container"],
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

export const winnersUI = new Winners();
