import { Page } from "../../types/page.type.js";

import HeaderCreator from "../../utils/header/header-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import NavigationCreator from "../../utils/navigation/navigation-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import "./header.css";

const HEADINGS_ONE = 1;

export default function header(page: Page): HTMLElement {
  const headerCreator = new HeaderCreator({
    classes: ["header"],
  });

  const title = new ParagraphCreator({
    parent: headerCreator.getElement(),
    classes: ["page-title"],
  }).getElement();

  title.textContent = page === "garage" ? "Garage" : "Winners";

  const appTitle = new HeadingsCreator(HEADINGS_ONE, {
    parent: headerCreator.getElement(),
    classes: ["app-title"],
  }).getElement();

  appTitle.textContent = "Async Race";

  const nav = new NavigationCreator({
    parent: headerCreator.getElement(),
    classes: ["nav"],
  }).getElement();

  const ul = new UnorderedListCreator({
    parent: nav,
    classes: ["header-menu"],
  }).getElement();

  const garageLi = new ListItemCreator({
    parent: ul,
  }).getElement();

  const winnersLi = new ListItemCreator({
    parent: ul,
  }).getElement();

  const garageButton = new ButtonCreator({
    parent: garageLi,
    classes: ["garage-button", "button"],
  }).getElement();

  garageButton.dataset.route = "garage";

  const winnersButton = new ButtonCreator({
    parent: winnersLi,
    classes: ["winners-button", "button"],
  }).getElement();

  winnersButton.dataset.route = "winners";

  return headerCreator.getElement();
}
