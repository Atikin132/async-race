import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import "./garage-info.component.css";

const HEADINGS_TWO = 2;
const HEADINGS_THREE = 3;

export default function garageInfoComponent(
  carsNumber: number,
  pageNumber: number,
): HTMLElement {
  const container = new ElementCreator({
    classes: ["garage-info-container"],
  }).getElement();
  const garageTitle = new HeadingsCreator(HEADINGS_TWO, {
    parent: container,
  }).getElement();
  garageTitle.textContent = `Garage (${carsNumber})`;

  const pageTitle = new HeadingsCreator(HEADINGS_THREE, {
    parent: container,
  }).getElement();
  pageTitle.textContent = `Page #${pageNumber}`;

  return container;
}
