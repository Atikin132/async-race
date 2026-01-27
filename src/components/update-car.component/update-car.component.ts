import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import InputCreator from "../../utils/input/input-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./update-car.component.css";

const INPUT_MAX_LENGTH = 20;

export default function updateCarComponent(
  updateCar: () => Promise<void>,
): HTMLElement {
  const updateCarComponentContainer = new ElementCreator({
    classes: ["update-car-component-container"],
  }).getElement();

  updateCarComponentContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".update-button")) {
      void updateCar();
    }
  });

  const updateTitle = new ParagraphCreator({
    parent: updateCarComponentContainer,
    text: "Update car",
  }).getElement();
  updateTitle.className = "update-title";

  const updateContainer = new ElementCreator({
    parent: updateCarComponentContainer,
    classes: ["update-container"],
  }).getElement();

  const inputText = new InputCreator({
    parent: updateContainer,
    classes: ["input-text", "no-active"],
    placeholder: "",
  }).getElement();
  inputText.name = "Input Text";
  inputText.maxLength = INPUT_MAX_LENGTH;
  inputText.disabled = true;

  const inputColor = new InputCreator({
    parent: updateContainer,
    classes: ["input-color", "no-active"],
    placeholder: "",
  }).getElement();

  inputColor.type = "color";
  inputColor.disabled = true;

  const updateButton = new ButtonCreator({
    parent: updateContainer,
    classes: ["update-button", "no-active", "button"],
  }).getElement();

  updateButton.textContent = "Update";

  return updateCarComponentContainer;
}
