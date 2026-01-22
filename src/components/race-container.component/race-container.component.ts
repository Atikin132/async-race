import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import carSvg from "../../assets/svg/car.svg?raw";
import "./race-container.component.css";

export default function raceContainerComponent(
  carNameAPI: string = "Car Name",
  carColorAPI: string = "#000000",
  carIdAPI: string,
  deleteCar: (id: string) => Promise<void>,
): HTMLElement {
  const raceContainerElement = new ElementCreator({
    classes: ["race-container"],
  }).getElement();

  raceContainerElement.dataset.id = carIdAPI;

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
    text: "Select",
  }).getElement();

  select.addEventListener("click", () => {});

  const remove = new ButtonCreator({
    parent: editBtns,
    classes: ["edit-btns__remove", "button"],
    text: "Remove",
  }).getElement();

  remove.addEventListener("click", () => {
    void deleteCar(carIdAPI);
  });

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

  start.addEventListener("click", () => {});

  const reset = new ButtonCreator({
    parent: controlBtns,
    classes: ["control-btns__reset", "no-active", "button"],
  }).getElement();

  reset.addEventListener("click", () => {});

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

  return raceContainerElement;
}
