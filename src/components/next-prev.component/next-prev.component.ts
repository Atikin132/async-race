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

  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".prev-button")) {
      void prevPage();
    } else if (target.closest(".next-button")) {
      void nextPage();
    }
  });

  const prevBtn = new ButtonCreator({
    parent: container,
    classes: ["prev-button", "no-active", "button"],
  }).getElement();
  prevBtn.disabled = true;

  prevBtn.textContent = "Prev";

  const nextBtn = new ButtonCreator({
    parent: container,
    classes: ["next-button", "no-active", "button"],
  }).getElement();
  nextBtn.disabled = true;

  nextBtn.textContent = "Next";

  return container;
}
