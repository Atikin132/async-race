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

  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".start-race-btn")) {
      void startRace();
    } else if (target.closest(".reset-all-cars-btn")) {
      void resetAllCars();
    } else if (target.closest(".generate-cars-btn")) {
      void generateCars();
    }
  });

  const startRaceBtn = new ButtonCreator({
    parent: container,
    classes: ["start-race-btn", "button"],
  }).getElement();

  startRaceBtn.textContent = "Race";

  const resetAllCarsBtn = new ButtonCreator({
    parent: container,
    classes: ["reset-all-cars-btn", "button"],
  }).getElement();

  resetAllCarsBtn.textContent = "Reset";

  const generateCarsBtn = new ButtonCreator({
    parent: container,
    classes: ["generate-cars-btn", "button"],
  }).getElement();

  generateCarsBtn.textContent = "Generate Cars";

  return container;
}
