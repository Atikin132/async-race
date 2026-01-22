import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import "./next-prev.component.css";

export default function nextPrevComponent(
  prevPage: () => Promise<void>,
  nextPage: () => Promise<void>,
): HTMLElement {
  const container = new ElementCreator({
    classes: ["next-prev-container"],
  }).getElement();

  const prevBtn = new ButtonCreator({
    parent: container,
    classes: ["prev-button", "no-active", "button"],
    text: "Prev",
  }).getElement();
  prevBtn.disabled = true;

  prevBtn.addEventListener("click", () => {
    void prevPage();
  });

  const nextBtn = new ButtonCreator({
    parent: container,
    classes: ["next-button", "no-active", "button"],
    text: "Next",
  }).getElement();
  nextBtn.disabled = true;

  nextBtn.addEventListener("click", () => {
    void nextPage();
  });

  return container;
}
