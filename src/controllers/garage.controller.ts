import { Car } from "../interfaces/car.interface.js";
import { garageService } from "../services/garage-service.js";

const CARS_PER_PAGE = 7;
const FIRST_PAGE = 1;

class GarageController {
  private page = FIRST_PAGE;
  cars: Car[] = [];
  totalCarCount = 0;

  async loadCars(): Promise<void> {
    const result = await garageService.getCars(this.page, CARS_PER_PAGE);

    if (!result) {
      this.cars = [];
      this.totalCarCount = 0;
      return;
    }

    this.cars = result.cars;
    this.totalCarCount = result.totalCount;
  }

  async createCar(name: string, color: string): Promise<Car | undefined> {
    const car = await garageService.createCar(name, color);

    if (!car) {
      return undefined;
    }

    return car;
  }

  async deleteCar(id: number): Promise<void> {
    await garageService.deleteCar(id);
  }

  get currentPage(): number {
    return this.page;
  }

  get totalPages(): number {
    return Math.max(FIRST_PAGE, Math.ceil(this.totalCarCount / CARS_PER_PAGE));
  }

  async nextPage(): Promise<void> {
    if (this.page < this.totalPages) {
      this.page += 1;
      await this.loadCars();
    }
  }

  async prevPage(): Promise<void> {
    if (this.page > FIRST_PAGE) {
      this.page -= 1;
      await this.loadCars();
    }
  }
}

export const garageController = new GarageController();
