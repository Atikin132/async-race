import createCarComponent from "../../components/create-car.component/create-car.component.js";
import raceContainer from "../../components/race-container/race-container.js";
import updateCarComponent from "../../components/update-car.component/update-car.component.js";
import { BasePage } from "../base-page.js";
import "./garage.css";

export class Garage extends BasePage {
  private createCar(): void {}
  private updateCar(): void {}

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.className = "garage";
    this.container.innerHTML = `<h2>Garage</h2>`;
    this.container.append(createCarComponent(() => this.createCar()));
    this.container.append(updateCarComponent(() => this.updateCar()));
    const carArray = [
      { name: "Tesla", color: "#00FF00", id: 1 },
      { name: "Ford", color: "#0000FF", id: 2 },
      { name: "Ferrari", color: "#FF0000", id: 3 },
      { name: "Audi", color: "#FFFF00", id: 4 },
      { name: "Volkswagen", color: "#FF00FF", id: 5 },
      { name: "Porsche", color: "#00FFFF", id: 6 },
      { name: "Dodge", color: "#ff6a00", id: 7 },
    ];
    for (const car of carArray) {
      this.container.append(
        raceContainer(car.name, car.color, car.id.toString()),
      );
    }
  }
}
