import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import InputCreator from "../../utils/input/input-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./create-car.component.css";

const INPUT_MAX_LENGTH = 20;

export default function createCarComponent(
  createCar: () => Promise<void>,
): HTMLElement {
  const createCarComponentContainer = new ElementCreator({
    classes: ["create-car-component-container"],
  }).getElement();

  createCarComponentContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".create-button")) {
      void createCar();
    }
  });

  const createTitle = new ParagraphCreator({
    parent: createCarComponentContainer,
    text: "Create car",
  }).getElement();
  createTitle.className = "create-title";

  const createContainer = new ElementCreator({
    parent: createCarComponentContainer,
    classes: ["create-container"],
  }).getElement();

  const inputText = new InputCreator({
    parent: createContainer,
    classes: ["input-text"],
    placeholder: "Input the name of the car",
  }).getElement();
  inputText.name = "Input Text";
  inputText.maxLength = INPUT_MAX_LENGTH;

  const inputColor = new InputCreator({
    parent: createContainer,
    classes: ["input-color"],
    placeholder: "",
  }).getElement();

  inputColor.type = "color";

  const createButton = new ButtonCreator({
    parent: createContainer,
    classes: ["create-button", "button"],
  }).getElement();
  createButton.textContent = "Create";

  return createCarComponentContainer;
}
