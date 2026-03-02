import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import carSvg from "../../assets/svg/car.svg?raw";
import "./race-container.component.css";
import { CarController } from "../../controllers/car.controller.js";
import { garageController } from "../../controllers/garage.controller.js";

const CAR_NAME = "Car name";
const COLOR_BLACK = "#000000";

export default function raceContainerComponent(
  carNameAPI: string = CAR_NAME,
  carColorAPI: string = COLOR_BLACK,
  carIdAPI: string,
  selectCar: () => void,
  deleteCar: (id: string) => Promise<void>,
): HTMLElement {
  const raceContainerElement = new ElementCreator({
    classes: ["race-container"],
  }).getElement();

  raceContainerElement.dataset.id = carIdAPI;

  raceContainerElement.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".edit-btns__select")) {
      selectCar();
    } else if (target.closest(".edit-btns__remove")) {
      void deleteCar(carIdAPI);
    } else if (target.closest(".control-btns__start")) {
      void carController.start();
    } else if (target.closest(".control-btns__reset")) {
      void carController.reset();
    }
  });

  const editNameContainer = new ElementCreator({
    parent: raceContainerElement,
    classes: ["edit-name-container"],
  }).getElement();

  const editBtns = new ElementCreator({
    parent: editNameContainer,
    classes: ["edit-btns"],
  }).getElement();

  const select = new ButtonCreator({
    parent: editBtns,
    classes: ["edit-btns__select", "button"],
  }).getElement();
  select.textContent = "Select";

  const remove = new ButtonCreator({
    parent: editBtns,
    classes: ["edit-btns__remove", "button"],
  }).getElement();
  remove.textContent = "Remove";

  const carName = new ParagraphCreator({
    parent: editNameContainer,
    classes: ["car-name"],
  }).getElement();

  carName.textContent = carNameAPI;

  const trackContainer = new ElementCreator({
    parent: raceContainerElement,
    classes: ["track-container"],
  }).getElement();

  const controlBtns = new ElementCreator({
    parent: trackContainer,
    classes: ["control-btns"],
  }).getElement();

  const start = new ButtonCreator({
    parent: controlBtns,
    classes: ["control-btns__start", "button"],
  }).getElement();

  const reset = new ButtonCreator({
    parent: controlBtns,
    classes: ["control-btns__reset", "no-active", "button"],
  }).getElement();

  const raceRoadContainer = new ElementCreator({
    parent: trackContainer,
    classes: ["race-road-container"],
  }).getElement();

  const car = new ElementCreator({
    parent: raceRoadContainer,
    classes: ["race-road-container__car"],
  }).getElement();

  car.style.color = carColorAPI;

  car.innerHTML = carSvg;

  const finish = new ElementCreator({
    parent: raceRoadContainer,
    classes: ["race-road-container__finish"],
  }).getElement();

  finish.textContent = "";

  const carController = new CarController(
    Number(carIdAPI),
    car,
    raceRoadContainer,
    start,
    reset,
    async (time) => {
      await garageController.onCarFinish(carIdAPI, time);
    },
  );

  garageController.carControllers.push(carController);

  return raceContainerElement;
}
