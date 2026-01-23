import createCarComponent from "../../components/create-car.component/create-car.component.js";
import garageControlButtonsComponent from "../../components/garage-control-buttons.component/garage-control-buttons.component.js";
import garageInfoComponent from "../../components/garage-info.component/garage-info.component.js";
import raceContainerComponent from "../../components/race-container.component/race-container.component.js";
import updateCarComponent from "../../components/update-car.component/update-car.component.js";
import ElementCreator from "../../utils/element-creator.js";
import { BasePage } from "../base-page.js";
import { garageController } from "../../controllers/garage.controller.js";
import nextPrevComponent from "../../components/next-prev.component/next-prev.component.js";

import "./garage.css";
import { Car } from "../../interfaces/car.interface.js";

const FIRST_PAGE = 1;
const GENERATE_CARS_NUMBER = 100;
const COLOR_FFFFFF_IN_DECIMAL = Number.parseInt("ffffff", 16);
export class Garage extends BasePage {
  private _carsContainer?: HTMLElement;
  private _garageInfoCarContainer?: HTMLElement;
  private selectedCar: Car = { name: "", color: "" };

  private async createCar(): Promise<void> {
    const inputText =
      document.querySelector<HTMLInputElement>(".create-container .input-text")
        ?.value ?? "";
    const inputColor =
      document.querySelector<HTMLInputElement>(".create-container .input-color")
        ?.value ?? "";

    await garageController.createCar(inputText, inputColor);
  }

  private async updateCar(): Promise<void> {
    const inputText = document.querySelector<HTMLInputElement>(
      ".update-container .input-text",
    );
    const inputColor = document.querySelector<HTMLInputElement>(
      ".update-container .input-color",
    );

    if (this.selectedCar.id !== undefined && inputText && inputColor) {
      await garageController.updateCar(
        this.selectedCar.id,
        inputText.value,
        inputColor.value,
      );
    }

    if (inputText) {
      inputText.classList.add("no-active");
      inputText.value = "";
      inputText.disabled = true;
    }

    if (inputColor) {
      inputColor.classList.add("no-active");
      inputColor.value = "#000000";
      inputColor.disabled = true;
    }

    const updateButton = document.querySelector<HTMLInputElement>(
      ".update-container .update-button",
    );

    if (updateButton) {
      updateButton.classList.add("no-active");
      updateButton.disabled = true;
    }
  }

  private async deleteCar(id: number): Promise<void> {
    await garageController.deleteCar(id);
  }

  private selectCar(id: number, name: string, color: string) {
    this.selectedCar.id = id;
    this.selectedCar.name = name;
    this.selectedCar.color = color;
    const inputText = document.querySelector<HTMLInputElement>(
      ".update-container .input-text",
    );

    if (inputText) {
      inputText.classList.remove("no-active");
      inputText.value = name;
      inputText.disabled = false;
    }

    const inputColor = document.querySelector<HTMLInputElement>(
      ".update-container .input-color",
    );

    if (inputColor) {
      inputColor.classList.remove("no-active");
      inputColor.value = color;
      inputColor.disabled = false;
    }

    const updateButton = document.querySelector<HTMLInputElement>(
      ".update-container .update-button",
    );

    if (updateButton) {
      updateButton.classList.remove("no-active");
      updateButton.disabled = false;
    }
  }

  private startRace(): void {}
  private resetAllCars(): void {}

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
      const color = `#${Math.floor(Math.random() * COLOR_FFFFFF_IN_DECIMAL)
        .toString(16)
        .padStart(6, "0")}`;
      carsColors.push(color);
    }
    return carsColors;
  }

  private async generateCars(): Promise<void> {
    const carsNames = this.generateCarsName();
    const carsColors = this.generateCarsColors();
    for (let i = 0; i < GENERATE_CARS_NUMBER; i += 1) {
      await garageController.createCar(
        carsNames[i] ?? "CAR_NAME",
        carsColors[i] ?? "#000000",
      );
    }
  }

  private get carsContainer(): HTMLElement {
    if (!this._carsContainer) {
      throw new Error("carsContainer is not initialized");
    }
    return this._carsContainer;
  }

  private get garageInfoCarContainer(): HTMLElement {
    if (!this._garageInfoCarContainer) {
      throw new Error("garageInfoCarContainer is not initialized");
    }
    return this._garageInfoCarContainer;
  }

  private renderCars(): void {
    this.carsContainer.innerHTML = "";
    for (const car of garageController.cars) {
      if (car.id !== undefined) {
        this.carsContainer.append(
          raceContainerComponent(
            car.name,
            car.color,
            car.id.toString(),
            () => {
              if (car.id !== undefined) {
                this.selectCar(car.id, car.name, car.color);
              }
            },
            async () => {
              if (car.id !== undefined) {
                await this.deleteCar(car.id);
              }
              await this.update();
            },
          ),
        );
      }
    }
  }

  private renderInfoContainer(): void {
    this.garageInfoCarContainer
      .querySelector(".garage-info-container")
      ?.remove();

    this.garageInfoCarContainer.prepend(
      garageInfoComponent(
        garageController.totalCarCount,
        garageController.currentPage,
      ),
    );
  }
  private updateNextPrevBtn() {
    const prevBtn = document.querySelector(".prev-button");
    const nextBtn = document.querySelector(".next-button");
    if (prevBtn instanceof HTMLButtonElement) {
      if (garageController.currentPage === FIRST_PAGE) {
        prevBtn.classList.add("no-active");
        prevBtn.disabled = true;
      } else {
        prevBtn.classList.remove("no-active");
        prevBtn.disabled = false;
      }
    }
    if (nextBtn instanceof HTMLButtonElement) {
      if (garageController.currentPage === garageController.totalPages) {
        nextBtn.classList.add("no-active");
        nextBtn.disabled = true;
      } else {
        nextBtn.classList.remove("no-active");
        nextBtn.disabled = false;
      }
    }
  }

  private async update(): Promise<void> {
    await garageController.loadCars();
    this.renderInfoContainer();
    this.renderCars();
    this.updateNextPrevBtn();
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.className = "garage";

    const garageControlContainer = new ElementCreator({
      parent: this.container,
      classes: ["garage-control-container"],
    }).getElement();

    garageControlContainer.append(
      createCarComponent(async () => {
        await this.createCar();
        await this.update();
      }),
    );
    garageControlContainer.append(
      updateCarComponent(async () => {
        if (this.selectedCar.id !== undefined) {
          await this.updateCar();
          await this.update();
        }
      }),
    );
    garageControlContainer.append(
      garageControlButtonsComponent(
        () => this.startRace(),
        () => this.resetAllCars(),
        async () => {
          await this.generateCars();
          await this.update();
        },
      ),
    );

    this._garageInfoCarContainer = new ElementCreator({
      parent: this.container,
      classes: ["garage-info-car-container"],
    }).getElement();

    this._carsContainer = new ElementCreator({
      parent: this._garageInfoCarContainer,
      classes: ["garage-car-container"],
    }).getElement();

    this.container.append(
      nextPrevComponent(
        async () => {
          await garageController.prevPage();
          await this.update();
        },
        async () => {
          await garageController.nextPage();
          await this.update();
        },
      ),
    );

    this.update().catch(() => {
      throw new Error("Error loading garage");
    });
  }
}
