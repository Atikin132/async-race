import { CreateTableOptions } from "../../interfaces/create-table-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class TableCreator extends ElementCreator {
  constructor(options: CreateTableOptions) {
    super({ ...options, tag: "table" });
  }

  public getElement(): HTMLTableElement {
    if (this.element instanceof HTMLTableElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTableElement");
  }
}
