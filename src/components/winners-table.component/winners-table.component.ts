import { Winner } from "../../interfaces/winner.interface.js";
import ElementCreator from "../../utils/element-creator.js";
import TableCellCreator from "../../utils/table/table-cell-creator.js";
import TableCreator from "../../utils/table/table-creator.js";
import TableRowCreator from "../../utils/table/table-row-creator.js";
import TableSectionCreator from "../../utils/table/table-section-creator.js";
import carSvg from "../../assets/svg/car-winners-table.svg?raw";
import "./winners-table.component.css";
import { garageController } from "../../controllers/garage.controller.js";
import { WinnersSortField } from "../../types/winners-sort-field.type.js";

const WINNERS_PER_PAGE = 10;
const PAGE_START_INDEX_OFFSET = 9;

export default function winnersTableComponent(
  winners: Winner[],
  page: number,
  onSort: (field: WinnersSortField) => Promise<void>,
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

  const tableHead: { title: string; sort?: WinnersSortField }[] = [
    { title: "Number" },
    { title: "Car" },
    { title: "Name" },
    { title: "Wins", sort: "wins" },
    { title: "Best time (seconds)", sort: "time" },
  ];

  for (const head of tableHead) {
    const th = new TableCellCreator({
      text: head.title,
      cellType: "th",
      classes: ["theader"],
      parent: headRow,
    }).getElement();

    if (head.sort) {
      th.classList.add("sortable");
      th.dataset.sort = head.sort;
      const sortField = head.sort;

      th.addEventListener("click", () => {
        void onSort(sortField);
      });
    }
  }

  const tbody = new TableSectionCreator({
    section: "tbody",
    classes: ["tbody"],
    parent: table,
  }).getElement();

  const tableId = `winners-table-${Date.now()}`;
  table.dataset.tableId = tableId;

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

    const loadCarData = async () => {
      const currentTableId = table.dataset.tableId;
      if (currentTableId !== tableId) {
        return;
      }

      const carApi = await garageController.getCar(winner.id);

      if (table.dataset.tableId === tableId && carApi) {
        car.style.color = carApi.color;
        carName.textContent = carApi.name;
      }
    };

    void loadCarData();
  }

  return table;
}
