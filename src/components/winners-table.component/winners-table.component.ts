import { Winner } from "../../interfaces/winner.interface.js";
import ElementCreator from "../../utils/element-creator.js";
import TableCellCreator from "../../utils/table/table-cell-creator.js";
import TableCreator from "../../utils/table/table-creator.js";
import TableRowCreator from "../../utils/table/table-row-creator.js";
import TableSectionCreator from "../../utils/table/table-section-creator.js";
import carSvg from "../../assets/svg/car-winners-table.svg?raw";
import "./winners-table.component.css";
import { garageController } from "../../controllers/garage.controller.js";

const WINNERS_PER_PAGE = 10;
const PAGE_START_INDEX_OFFSET = 9;

export default function winnersTableComponent(
  winners: Winner[],
  page: number,
): HTMLElement {
  const table = new TableCreator({
    classes: ["winners-table"],
  }).getElement();

  const thead = new TableSectionCreator({
    section: "thead",
    parent: table,
  }).getElement();

  const headRow = new TableRowCreator({
    parent: thead,
  }).getElement();

  const tableHead = ["Number", "Car", "Name", "Wins", "Best time (seconds)"];

  for (const title of tableHead) {
    new TableCellCreator({
      text: title,
      cellType: "th",
      classes: ["theader"],
      parent: headRow,
    });
  }

  const tbody = new TableSectionCreator({
    section: "tbody",
    classes: ["tbody"],
    parent: table,
  }).getElement();

  let index = page * WINNERS_PER_PAGE - PAGE_START_INDEX_OFFSET;
  for (const winner of winners) {
    const row = new TableRowCreator({
      parent: tbody,
      classes: ["trow"],
    }).getElement();

    const number = new TableCellCreator({
      parent: row,
      classes: ["tcell"],
    }).getElement();
    number.textContent = index.toString();

    const carImgCell = new TableCellCreator({
      parent: row,
      classes: ["tcell"],
    }).getElement();

    const car = new ElementCreator({
      parent: carImgCell,
    }).getElement();
    car.innerHTML = carSvg;

    const carName = new TableCellCreator({
      parent: row,
      classes: ["tcell"],
    }).getElement();

    garageController
      .getCar(winner.id)
      .then((carApi) => {
        car.style.color = carApi?.color ?? "#000000";
        carName.textContent = carApi?.name ?? "CAR_NAME";
      })
      .catch(() => {
        throw new Error("Error loading car");
      });

    const wins = new TableCellCreator({
      parent: row,
      classes: ["tcell"],
    }).getElement();
    wins.textContent = winner.wins.toString();

    const time = new TableCellCreator({
      parent: row,
      classes: ["tcell"],
    }).getElement();
    time.textContent = winner.time.toFixed(2);

    index += 1;
  }

  return table;
}
