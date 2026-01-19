import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import InputCreator from "../../utils/input/input-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./update-car.component.css";

const INPUT_MAX_LENGTH = 20;

export default function updateCarComponent(updateCar: () => void): HTMLElement {
  const updateCarComponentContainer = new ElementCreator({
    classes: ["update-car-component-container"],
  }).getElement();

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
    text: "Update",
  }).getElement();

  updateButton.addEventListener("click", updateCar);

  return updateCarComponentContainer;
}
