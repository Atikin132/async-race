import { Winner } from "../interfaces/winner.interface.js";
import { SortOrder } from "../types/sort-order.type.js";
import { WinnersSortField } from "../types/winners-sort-field.type.js";
import { hasNumberProp } from "../utils/has-type-prop.js";

const URL = "http://127.0.0.1:3000";

export function isWinner(obj: unknown): obj is Winner {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasNumberProp(obj, "id") &&
    hasNumberProp(obj, "wins") &&
    hasNumberProp(obj, "time")
  );
}

export function isWinnerArray(obj: unknown): obj is Winner[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((x) => isWinner(x))
  );
}

export class WinnersService {
  private abortControllers = new Map<string, AbortController>();

  async getWinners(
    page?: number,
    limit?: number,
    sort?: WinnersSortField,
    order?: SortOrder,
    signal?: AbortSignal,
  ): Promise<{ winners: Winner[]; totalCount: number } | undefined> {
    const params = new URLSearchParams();

    if (page !== undefined) {
      params.append("_page", page.toString());
    }

    if (limit !== undefined) {
      params.append("_limit", limit.toString());
    }

    if (sort !== undefined) {
      params.append("_sort", sort);
    }

    if (order !== undefined) {
      params.append("_order", order);
    }

    const requestId = `getWinners-${page}-${limit}`;

    this.abortControllers.get(requestId)?.abort();

    const controller = new AbortController();
    this.abortControllers.set(requestId, controller);

    const finalSignal = signal || controller.signal;

    try {
      const response = await fetch(`${URL}/winners?${params.toString()}`, {
        signal: finalSignal,
      });
      const data: unknown = await response.json();
      if (!isWinnerArray(data)) {
        return undefined;
      }

      const winners = data;
      const totalCount = Number(response.headers.get("X-Total-Count")) || 0;

      return { winners, totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return undefined;
      }
      throw error;
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  async getWinner(id: number): Promise<Winner | undefined> {
    const response = await fetch(`${URL}/winners/${id}`);

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isWinner(data)) {
      return undefined;
    }

    return data;
  }

  async createWinner(
    id: number,
    wins: number,
    time: number,
  ): Promise<Winner | undefined> {
    const response = await fetch(`${URL}/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, wins, time }),
    });

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isWinner(data)) {
      return undefined;
    }

    return data;
  }

  async updateWinner(
    id: number,
    wins: number,
    time: number,
  ): Promise<Winner | undefined> {
    const response = await fetch(`${URL}/winners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, wins, time }),
    });

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isWinner(data)) {
      return undefined;
    }

    return data;
  }

  async deleteWinner(id: number): Promise<void> {
    const response = await fetch(`${URL}/winners/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }
  }
}

export const winnersService = new WinnersService();
