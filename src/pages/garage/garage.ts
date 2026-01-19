import createCarComponent from "../../components/create-car.component/create-car.component.js";
import garageInfoComponent from "../../components/garage-info.component/garage-info.component.js";
import raceContainer from "../../components/race-container/race-container.js";
import updateCarComponent from "../../components/update-car.component/update-car.component.js";
import ElementCreator from "../../utils/element-creator.js";
import { BasePage } from "../base-page.js";
import "./garage.css";

export class Garage extends BasePage {
  private createCar(): void {}
  private updateCar(): void {}

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.className = "garage";
    this.container.append(createCarComponent(() => this.createCar()));
    this.container.append(updateCarComponent(() => this.updateCar()));
    this.container.append(garageInfoComponent(7, 1));

    const carArray = [
      { name: "Tesla", color: "#00FF00", id: 1 },
      { name: "Ford", color: "#0000FF", id: 2 },
      { name: "Ferrari", color: "#FF0000", id: 3 },
      { name: "Audi", color: "#FFFF00", id: 4 },
      { name: "Volkswagen", color: "#FF00FF", id: 5 },
      { name: "Porsche", color: "#00FFFF", id: 6 },
      { name: "Dodge", color: "#ff6a00", id: 7 },
    ];

    const garageCarContainer = new ElementCreator({
      parent: this.container,
      classes: ["garage-car-container"],
    }).getElement();

    for (const car of carArray) {
      garageCarContainer.append(
        raceContainer(car.name, car.color, car.id.toString()),
      );
    }
  }
}
