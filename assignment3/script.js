var r = document.querySelector(":root");
var rs = getComputedStyle(r);

// THE RESIZING SECTION

let isResizing = false;
let columnPosition = 0;
let rowPosition = 0;
let columnLeft = 0;
let rowTop = 0;

function updateMouseDownEvents() {
  const gridDivList = document.getElementsByClassName("gridItem");
  for (var i = 0; i < gridDivList.length; i++) {
    gridDivList[i].addEventListener("mousedown", startResize);
  }
}

updateMouseDownEvents();

function startResize(event) {
  isResizing = true;
  getPosition(this);

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

function getPosition(gridDiv) {
  let index = gridDiv.id;
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;

  columnPosition = index % gridColumns;
  rowPosition = Math.floor(index / gridColumns);

  columnLeft = gridDiv.offsetLeft;
  rowTop = gridDiv.offsetTop;
}

function resize(event) {
  if (isResizing) {
    const columnWidths = rs.getPropertyValue("--grid-column-widths");
    const rowHeights = rs.getPropertyValue("--grid-row-heights");

    let newColumnWidths = columnWidths.split(" ");
    let newRowHeights = rowHeights.split(" ");

    const selectedColumnWidth = parseInt(newColumnWidths[columnPosition]);
    const selectedRowHeights = parseInt(newRowHeights[rowPosition]);

    const newColumnWidth = event.clientX - columnLeft; //selectedColumnWidth
    const newRowHeight = event.clientY - rowTop; //selectedRowHeights

    newColumnWidths[columnPosition] = newColumnWidth + "px";
    newRowHeights[rowPosition] = newRowHeight + "px";

    document.documentElement.style.setProperty(
      "--grid-column-widths",
      newColumnWidths.join(" ")
    );
    document.documentElement.style.setProperty(
      "--grid-row-heights",
      newRowHeights.join(" ")
    );
  }
}

function stopResize() {
  isResizing = false;

  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

const columnAdd = document.querySelector("#columnAdd");
const columnSubtract = document.querySelector("#columnSubtract");
const rowAdd = document.querySelector("#rowAdd");
const rowSubtract = document.querySelector("#rowSubtract");

// ADD COLUMN

columnAdd.addEventListener("click", addColumn);

function addColumn() {
  if (rs.getPropertyValue("--grid-columns") > 10) {
    return;
  }
  const columnWidths = rs.getPropertyValue("--grid-column-widths");
  let newColumnWidths = columnWidths.split(" ");

  newColumnWidths.push("50px");

  document.documentElement.style.setProperty(
    "--grid-column-widths",
    newColumnWidths.join(" ")
  );

  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  for (var i = 0; i < gridRows; i++) {
    nextGridItemId = gridColumns * gridRows + i;

    const newGridItem = document.createElement("div");
    newGridItem.className = "gridItem";
    newGridItem.id = nextGridItemId;
    document.getElementById("grid").appendChild(newGridItem);
  }

  document.documentElement.style.setProperty("--grid-columns", gridColumns);
  document.querySelector("#columnNumber").innerHTML = gridColumns + 1;
  updateMouseDownEvents();
}

//SUBTRACT COLUMN

columnSubtract.addEventListener("click", subtractColumn);

function subtractColumn() {
  if (rs.getPropertyValue("--grid-columns") < 1) {
    return;
  }
  const columnWidths = rs.getPropertyValue("--grid-column-widths");
  let newColumnWidths = columnWidths.split(" ");

  newColumnWidths.pop();

  document.documentElement.style.setProperty(
    "--grid-column-widths",
    newColumnWidths.join(" ")
  );

  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  for (var i = 0; i < gridRows; i++) {
    const oldGridItem = document.getElementById(gridColumns * gridRows - 1 - i);
    oldGridItem.remove();
  }

  document.documentElement.style.setProperty("--grid-columns", gridColumns - 2);
  document.querySelector("#columnNumber").innerHTML = gridColumns - 1;
  updateMouseDownEvents();
}

// ADD ROW

rowAdd.addEventListener("click", addRow);

function addRow() {
  if (rs.getPropertyValue("--grid-rows") > 4) {
    return;
  }
  const rowHeights = rs.getPropertyValue("--grid-row-heights");
  let newRowHeights = rowHeights.split(" ");

  newRowHeights.push("50px");

  document.documentElement.style.setProperty(
    "--grid-row-heights",
    newRowHeights.join(" ")
  );

  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  for (var i = 0; i < gridColumns; i++) {
    nextGridItemId = gridColumns * gridRows + i;

    const newGridItem = document.createElement("div");
    newGridItem.className = "gridItem";
    newGridItem.id = nextGridItemId;
    document.getElementById("grid").appendChild(newGridItem);
  }

  document.documentElement.style.setProperty("--grid-rows", gridRows);
  document.querySelector("#rowNumber").innerHTML = gridRows + 1;
  updateMouseDownEvents();
}

// SUBTRACT ROW

rowSubtract.addEventListener("click", subtractRow);

function subtractRow() {
  if (rs.getPropertyValue("--grid-rows") < 1) {
    return;
  }

  const rowHeights = rs.getPropertyValue("--grid-row-heights");
  let newRowHeights = rowHeights.split(" ");

  newRowHeights.pop();

  document.documentElement.style.setProperty(
    "--grid-row-heights",
    newRowHeights.join(" ")
  );

  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  for (var i = 0; i < gridColumns; i++) {
    const oldGridItem = document.getElementById(gridColumns * gridRows - 1 - i);
    oldGridItem.remove();
  }

  document.documentElement.style.setProperty("--grid-rows", gridRows - 2);
  document.querySelector("#rowNumber").innerHTML = gridRows - 1;
  updateMouseDownEvents();
}

// CHANGE GAP SIZE

gapAdd.addEventListener("click", addGap);

function addGap() {
  const oldGapSize = parseInt(rs.getPropertyValue("--grid-gap"));
  if (oldGapSize >= 36) {
    return;
  }

  newGapSize = oldGapSize + 2;

  document.querySelector("#gapNumber").innerHTML = newGapSize;
  document.documentElement.style.setProperty("--grid-gap", newGapSize + "px");
}

gapSubtract.addEventListener("click", subtractGap);

function subtractGap() {
  const oldGapSize = parseInt(rs.getPropertyValue("--grid-gap"));
  if (oldGapSize <= 0) {
    return;
  }

  newGapSize = oldGapSize - 2;

  document.querySelector("#gapNumber").innerHTML = newGapSize;
  document.documentElement.style.setProperty("--grid-gap", newGapSize + "px");
}

// THE COLOURING SECTION

let draggedElement = null;

function updateDragstartEvents() {
  const colourBoxList = document.getElementsByClassName("colourBox");
  for (var i = 0; i < colourBoxList.length; i++) {
    colourBoxList[i].addEventListener("dragstart", startDrag);
  }
}

updateDragstartEvents();

function startDrag() {
  draggedElement = this;
}

function updateDragoverEvents() {
  const gridItemList = document.getElementsByClassName("gridItem");
  for (var i = 0; i < gridItemList.length; i++) {
    gridItemList[i].addEventListener("dragover", endDrag);
    gridItemList[i].addEventListener("drop", handleDrop);
  }
}

updateDragoverEvents();

function endDrag(event) {
  event.preventDefault();
}

function handleDrop(event) {
  if (draggedElement) {
    const colour = window
      .getComputedStyle(draggedElement)
      .getPropertyValue("background-color");
    event.target.style.backgroundColor = colour;
    draggedElement = null;
  }
}
