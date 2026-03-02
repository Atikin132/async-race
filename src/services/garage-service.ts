import { Car } from "../interfaces/car.interface.js";
import { EngineDriveResponse } from "../interfaces/engine-drive-response.interface.js";
import { EngineStartEndResponse } from "../interfaces/engine-start-end-response.interface.js";
import { EngineStatus } from "../types/engine-status.enum.js";
import {
  hasBooleanProp,
  hasNumberProp,
  hasStringProp,
} from "../utils/has-type-prop.js";

const URL = "http://127.0.0.1:3000";

function isCar(obj: unknown): obj is Car {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "name") &&
    hasStringProp(obj, "color")
  );
}

function isCarArray(obj: unknown): obj is Car[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((x) => isCar(x))
  );
}

function isEngineStartEndResponse(obj: unknown): obj is EngineStartEndResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasNumberProp(obj, "velocity") &&
    hasNumberProp(obj, "distance")
  );
}

function isEngineDriveResponse(obj: unknown): obj is EngineDriveResponse {
  return (
    typeof obj === "object" && obj !== null && hasBooleanProp(obj, "success")
  );
}

class GarageService {
  private abortControllers = new Map<string, AbortController>();

  async getCars(
    page?: number,
    limit?: number,
    signal?: AbortSignal,
  ): Promise<{ cars: Car[]; totalCount: number } | undefined> {
    const params = new URLSearchParams();

    if (page !== undefined) {
      params.append("_page", page.toString());
    }
    if (limit !== undefined) {
      params.append("_limit", limit.toString());
    }

    const requestId = `getCars-${page}-${limit}`;

    this.abortControllers.get(requestId)?.abort();

    const controller = new AbortController();
    this.abortControllers.set(requestId, controller);

    const finalSignal = signal || controller.signal;

    try {
      const response = await fetch(`${URL}/garage?${params.toString()}`, {
        signal: finalSignal,
      });
      const data: unknown = await response.json();
      if (!isCarArray(data)) {
        return undefined;
      }

      const cars = data;

      const totalCount = Number(response.headers.get("X-Total-Count")) || 0;

      return { cars, totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return undefined;
      }
      throw error;
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  async getCar(id: number): Promise<Car | undefined> {
    const response = await fetch(`${URL}/garage/${id}`);

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isCar(data)) {
      return undefined;
    }

    return data;
  }

  async createCar(name: string, color: string): Promise<Car | undefined> {
    const response = await fetch(`${URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });

    const data: unknown = await response.json();

    if (!isCar(data)) {
      return undefined;
    }

    return data;
  }

  async updateCar(
    id: number,
    name: string,
    color: string,
  ): Promise<Car | undefined> {
    const response = await fetch(`${URL}/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isCar(data)) {
      return undefined;
    }

    return data;
  }

  async deleteCar(id: number): Promise<void> {
    const response = await fetch(`${URL}/garage/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }
  }

  async setEngineStatus(
    id: number,
    status: EngineStatus,
  ): Promise<EngineStartEndResponse | EngineDriveResponse | undefined> {
    const response = await fetch(`${URL}/engine?id=${id}&status=${status}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return undefined;
    }

    const data: unknown = await response.json();

    if (!isEngineStartEndResponse(data) && !isEngineDriveResponse(data)) {
      return undefined;
    }

    return data;
  }
}

export const garageService = new GarageService();
