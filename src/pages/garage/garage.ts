import createCarComponent from "../../components/create-car.component/create-car.component.js";
import garageControlButtonsComponent from "../../components/garage-control-buttons.component/garage-control-buttons.component.js";
import raceContainerComponent from "../../components/race-container.component/race-container.component.js";
import updateCarComponent from "../../components/update-car.component/update-car.component.js";
import ElementCreator from "../../utils/element-creator.js";
import { BasePage } from "../base-page.js";
import { garageController } from "../../controllers/garage.controller.js";
import nextPrevComponent from "../../components/next-prev.component/next-prev.component.js";

import "./garage.css";
import infoPageComponent from "../../components/info-page.component/info-page.component.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";

export class Garage extends BasePage {
  private _carsContainer?: HTMLElement;
  private _pageWinnerContainer?: HTMLElement;

  private get carsContainer(): HTMLElement {
    if (!this._carsContainer) {
      throw new Error("carsContainer is not initialized");
    }
    return this._carsContainer;
  }

  private get pageWinnerContainer(): HTMLElement {
    if (!this._pageWinnerContainer) {
      throw new Error("pageWinnerContainer is not initialized");
    }
    return this._pageWinnerContainer;
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
                garageController.selectCar(car.id, car.name, car.color);
              }
            },
            async () => {
              if (car.id !== undefined) {
                await garageController.deleteCar(car.id);
              }
              await this.update();
            },
          ),
        );
      }
    }
  }

  private renderInfoContainer(): void {
    this.pageWinnerContainer.querySelector(".info-page-container")?.remove();

    this.pageWinnerContainer.prepend(
      infoPageComponent(
        "Garage",
        garageController.totalCarCount,
        garageController.currentPage,
      ),
    );
  }

  private async update(): Promise<void> {
    await garageController.loadCars();
    garageController.carControllers.length = 0;
    garageController.updateWinnerText(false);
    this.renderInfoContainer();
    this.renderCars();
    this.updatePaginationButtons(
      ".garage",
      garageController.currentPage,
      garageController.totalPages,
    );
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
        await garageController.createCar();
        await this.update();
      }),
    );
    garageControlContainer.append(
      updateCarComponent(async () => {
        if (garageController.selectedCar.id !== undefined) {
          await garageController.updateCar();
          await this.update();
        }
      }),
    );
    garageControlContainer.append(
      garageControlButtonsComponent(
        async () => {
          await garageController.startRace();
        },
        async () => {
          await garageController.resetAllCars();
        },
        async () => {
          await garageController.generateCars();
          await this.update();
        },
      ),
    );

    const garageInfoCarContainer = new ElementCreator({
      parent: this.container,
      classes: ["garage-info-car-container"],
    }).getElement();

    this._pageWinnerContainer = new ElementCreator({
      parent: garageInfoCarContainer,
      classes: ["page-winner-container"],
    }).getElement();

    const winnerText = new ParagraphCreator({
      parent: this._pageWinnerContainer,
      classes: ["winner-text"],
    }).getElement();
    winnerText.classList.add("no-active");

    const inputTextCreate =
      garageControlContainer.querySelector<HTMLInputElement>(
        ".create-container .input-text",
      );
    const inputColorCreate =
      garageControlContainer.querySelector<HTMLInputElement>(
        ".create-container .input-color",
      );
    const inputTextUpdate =
      garageControlContainer.querySelector<HTMLInputElement>(
        ".update-container .input-text",
      );
    const inputColorUpdate =
      garageControlContainer.querySelector<HTMLInputElement>(
        ".update-container .input-color",
      );

    if (
      inputTextCreate &&
      inputColorCreate &&
      inputTextUpdate &&
      inputColorUpdate
    ) {
      garageController.initFormElements(
        inputTextCreate,
        inputColorCreate,
        inputTextUpdate,
        inputColorUpdate,
        winnerText,
      );
    }

    this._carsContainer = new ElementCreator({
      parent: garageInfoCarContainer,
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
