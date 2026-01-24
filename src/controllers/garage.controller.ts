import { Car } from "../interfaces/car.interface.js";
import { winnersUI } from "../pages/winners/winners.js";
import { garageService } from "../services/garage-service.js";
import { CarController } from "./car.controller.js";
import { winnersController } from "./winners.controller.js";

const CARS_PER_PAGE = 7;
const FIRST_PAGE = 1;
const GENERATE_CARS_NUMBER = 100;
const COLOR_WHITE_IN_DECIMAL = Number.parseInt("ffffff", 16);
const COLOR_BLACK = "#000000";

class GarageController {
  private page = FIRST_PAGE;
  cars: Car[] = [];
  totalCarCount = 0;
  selectedCar: Car = { name: "", color: "" };
  carControllers: CarController[] = [];

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

  async getCar(id: number): Promise<Car | undefined> {
    const result = await garageService.getCar(id);
    return result;
  }

  async createCar(): Promise<void> {
    const inputText =
      document.querySelector<HTMLInputElement>(".create-container .input-text")
        ?.value ?? "";
    const inputColor =
      document.querySelector<HTMLInputElement>(".create-container .input-color")
        ?.value ?? "";

    await garageService.createCar(inputText, inputColor);
  }

  async updateCar(): Promise<void> {
    const inputText = document.querySelector<HTMLInputElement>(
      ".update-container .input-text",
    );
    const inputColor = document.querySelector<HTMLInputElement>(
      ".update-container .input-color",
    );

    if (this.selectedCar.id !== undefined && inputText && inputColor) {
      await garageService.updateCar(
        this.selectedCar.id,
        inputText.value,
        inputColor.value,
      );
      await winnersUI.update();
    }

    this.toggleUpdateElement(".update-container .input-text", "", false);
    this.toggleUpdateElement(
      ".update-container .input-color",
      COLOR_BLACK,
      false,
    );
    this.toggleUpdateElement(".update-container .update-button", "", false);
  }

  async deleteCar(id: number): Promise<void> {
    await garageService.deleteCar(id);
    await winnersController.deleteWinner(id);
    await winnersUI.update();
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

  selectCar(id: number, name: string, color: string) {
    this.selectedCar.id = id;
    this.selectedCar.name = name;
    this.selectedCar.color = color;

    this.toggleUpdateElement(".update-container .input-text", name, true);
    this.toggleUpdateElement(".update-container .input-color", color, true);
    this.toggleUpdateElement(".update-container .update-button", "", true);
  }

  private toggleUpdateElement(
    selector: string,
    value: string,
    enable: boolean,
  ) {
    const element = document.querySelector<HTMLInputElement>(selector);
    if (!element) {
      return;
    }

    element.classList.toggle("no-active", !enable);
    element.disabled = !enable;
    element.value = enable ? value : "";
  }

  private generateCarsName(): string[] {
    const carsNames: string[] = [];
    const carsBrands: string[] = [
      "Toyota",
      "Lexus",
      "Volkswagen",
      "Audi",
      "Porsche",
      "Bentley",
      "Lamborghini",
      "Dodge",
      "Tesla",
      "Maserati",
      "Renault",
      "Mitsubishi",
      "Chevrolet",
      "Ford",
      "Volvo",
    ];
    const carsModels: string[] = [
      "Camry",
      "RX",
      "Jetta",
      "A5",
      "911",
      "Bentayga",
      "Huracan",
      "Challenger",
      "Model S",
      "MCPura",
      "Scenic",
      "Pajero",
      "Silverado",
      "Mustang",
      "XC90",
    ];

    for (let i = 0; i < GENERATE_CARS_NUMBER; i += 1) {
      const brand = carsBrands[Math.floor(Math.random() * carsBrands.length)];
      const model = carsModels[Math.floor(Math.random() * carsModels.length)];
      carsNames.push(`${brand} ${model}`);
    }

    return carsNames;
  }

  private generateCarsColors(): string[] {
    const carsColors: string[] = [];

    for (let i = 0; i < GENERATE_CARS_NUMBER; i += 1) {
      const color = `#${Math.floor(Math.random() * COLOR_WHITE_IN_DECIMAL)
        .toString(16)
        .padStart(6, "0")}`;
      carsColors.push(color);
    }
    return carsColors;
  }

  async generateCars(): Promise<void> {
    const carsNames = this.generateCarsName();
    const carsColors = this.generateCarsColors();
    for (let i = 0; i < GENERATE_CARS_NUMBER; i += 1) {
      await garageService.createCar(
        carsNames[i] ?? "CAR_NAME",
        carsColors[i] ?? "#000000",
      );
    }
  }

  startRace(): void {}

  async resetAllCars(): Promise<void> {
    await Promise.all(
      this.carControllers.map((controller) => controller.reset()),
    );
  }
}

export const garageController = new GarageController();
