import { Winner } from "../interfaces/winner.interface.js";
import { winnersService } from "../services/winners-service.js";
import { SortOrder } from "../types/sort-order.type.js";
import { WinnersSortField } from "../types/winners-sort-field.type.js";

const WINNERS_PER_PAGE = 10;
const FIRST_PAGE = 1;

class WinnersController {
  private page = FIRST_PAGE;
  winners: Winner[] = [];
  totalWinnersCount = 0;

  private _sortField?: WinnersSortField;
  private _sortOrder: SortOrder = "ASC";

  get sortField(): WinnersSortField | undefined {
    return this._sortField;
  }

  get sortOrder(): SortOrder {
    return this._sortOrder;
  }

  async loadWinners(): Promise<void> {
    const result = await winnersService.getWinners(
      this.currentPage,
      WINNERS_PER_PAGE,
      this._sortField,
      this._sortOrder,
    );

    if (!result) {
      this.winners = [];
      this.totalWinnersCount = 0;
      return;
    }

    this.winners = result.winners;
    this.totalWinnersCount = result.totalCount;
  }

  async createWinner(
    id: number,
    wins: number,
    time: number,
  ): Promise<Winner | undefined> {
    const winner = await winnersService.createWinner(id, wins, time);

    if (!winner) {
      return undefined;
    }

    return winner;
  }

  async updateWinner(
    id: number,
    wins: number,
    time: number,
  ): Promise<Winner | undefined> {
    const winner = await winnersService.updateWinner(id, wins, time);

    if (!winner) {
      return undefined;
    }

    return winner;
  }

  async deleteWinner(id: number): Promise<void> {
    await winnersService.deleteWinner(id);
  }

  get currentPage(): number {
    return this.page;
  }

  get totalPages(): number {
    return Math.max(
      FIRST_PAGE,
      Math.ceil(this.totalWinnersCount / WINNERS_PER_PAGE),
    );
  }

  async nextPage(): Promise<void> {
    if (this.page < this.totalPages) {
      this.page += 1;
      await this.loadWinners();
    }
  }

  async prevPage(): Promise<void> {
    if (this.page > FIRST_PAGE) {
      this.page -= 1;
      await this.loadWinners();
    }
  }

  setSort(field: WinnersSortField): void {
    if (this._sortField === field) {
      this._sortOrder = this._sortOrder === "ASC" ? "DESC" : "ASC";
    } else {
      this._sortField = field;
      this._sortOrder = "ASC";
    }

    this.page = FIRST_PAGE;
  }
}

export const winnersController = new WinnersController();
