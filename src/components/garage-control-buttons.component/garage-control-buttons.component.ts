import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import "./garage-control-buttons.component.css";

export default function garageControlButtonsComponent(
  startRace: () => Promise<void>,
  resetAllCars: () => Promise<void>,
  generateCars: () => Promise<void>,
): HTMLElement {
  const container = new ElementCreator({
    classes: ["garage-control-buttons-container"],
  }).getElement();

  const startRaceBtn = new ButtonCreator({
    parent: container,
    text: "Race",
    classes: ["start-race-btn", "button"],
  }).getElement();

  startRaceBtn.addEventListener("click", () => {
    void startRace();
  });

  const resetAllCarsBtn = new ButtonCreator({
    parent: container,
    text: "Reset",
    classes: ["reset-all-cars-btn", "button"],
  }).getElement();

  resetAllCarsBtn.addEventListener("click", () => {
    void resetAllCars();
  });

  const generateCarsBtn = new ButtonCreator({
    parent: container,
    text: "Generate Cars",
    classes: ["generate-cars-btn", "button"],
  }).getElement();

  generateCarsBtn.addEventListener("click", () => {
    void generateCars();
  });

  return container;
}
