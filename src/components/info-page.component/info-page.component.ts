import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import "./info-page.component.css";

const HEADINGS_TWO = 2;
const HEADINGS_THREE = 3;

export default function infoPageComponent(
  screen: string,
  itemsNumber: number,
  pageNumber: number,
): HTMLElement {
  const container = new ElementCreator({
    classes: ["info-page-container"],
  }).getElement();
  const screenTitle = new HeadingsCreator(HEADINGS_TWO, {
    parent: container,
  }).getElement();
  screenTitle.textContent = `${screen} (${itemsNumber})`;

  const pageTitle = new HeadingsCreator(HEADINGS_THREE, {
    parent: container,
  }).getElement();
  pageTitle.textContent = `Page #${pageNumber}`;

  return container;
}
