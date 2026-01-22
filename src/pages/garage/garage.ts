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

const FIRST_PAGE = 1;

export class Garage extends BasePage {
  private _carsContainer?: HTMLElement;
  private _garageInfoCarContainer?: HTMLElement;

  private async createCar(): Promise<void> {
    const inputText =
      document.querySelector<HTMLInputElement>(".create-container .input-text")
        ?.value ?? "";
    const inputColor =
      document.querySelector<HTMLInputElement>(".create-container .input-color")
        ?.value ?? "";

    await garageController.createCar(inputText, inputColor);
  }

  private updateCar(): void {}
  private startRace(): void {}
  private resetAllCars(): void {}
  private generateCars(): void {}

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
          raceContainerComponent(car.name, car.color, car.id.toString()),
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
    garageControlContainer.append(updateCarComponent(() => this.updateCar()));
    garageControlContainer.append(
      garageControlButtonsComponent(
        () => this.startRace(),
        () => this.resetAllCars(),
        () => this.generateCars(),
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
