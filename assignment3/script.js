// grabs a refernce to the .css root section so it can read its variables
var r = document.querySelector(":root");
var rs = getComputedStyle(r);

// THE RESIZING SECTION

// creates varaibles for use in the resizing section
let isResizing = false;
let columnPosition = 0;
let rowPosition = 0;
let columnLeft = 0;
let rowTop = 0;

// adds an event listener on click to all gridItems divs
function updateMouseDownEvents() {
  // get an object array of all gridItems
  const gridDivList = document.getElementsByClassName("gridItem");
  // adds an event listener for each object in array
  for (var i = 0; i < gridDivList.length; i++) {
    gridDivList[i].addEventListener("mousedown", startResize);
  }
}

// creates mousedown events on page load
updateMouseDownEvents();

// sets isResizing to true when mousedown is called
function startResize(event) {
  isResizing = true;
  // find the columna and row number for the object being resized
  getPosition(this);

  //   create event listeners to find when the resized
  //   object is being moved or has stopped being selected
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

// uses the id of the object grabbed to calculate which grid column and row it is in
function getPosition(gridDiv) {
  let index = gridDiv.id;
  // grabs the grid-column variable from the .css
  // --grid-columns counts from 0 so 1 needs to be added to use in the equations
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;

  columnPosition = index % gridColumns;
  rowPosition = Math.floor(index / gridColumns);

  // sets the distance from the top and side of the page to the object being selected
  columnLeft = gridDiv.offsetLeft;
  rowTop = gridDiv.offsetTop;
}

// called on mousemove. takes the column and row size variables so
// they can be changed and set again
function resize(event) {
  if (isResizing) {
    // grab column and row size variables
    const columnWidths = rs.getPropertyValue("--grid-column-widths");
    const rowHeights = rs.getPropertyValue("--grid-row-heights");

    // splits the space seperated lists into arrays
    let newColumnWidths = columnWidths.split(" ");
    let newRowHeights = rowHeights.split(" ");

    // calculates new column and row size using the mouse position on screen
    // and the previously found distance from top and left of the screen
    const newColumnWidth = event.clientX - columnLeft;
    const newRowHeight = event.clientY - rowTop;

    // sets the correct variable in the array to the new size with the "px" appended
    newColumnWidths[columnPosition] = newColumnWidth + "px";
    newRowHeights[rowPosition] = newRowHeight + "px";

    // sets the column and row variable to the new array that has
    // been converted back to a space seperated list
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

// called on mouseup to set the isResizing varaible to false
// and removing the grabbing event listener
function stopResize() {
  isResizing = false;

  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

// ADD SUBTRACT COLUMN ROW SECTION

// creates new references to the toolbar buttons so event listeners
// can be added
const columnAdd = document.querySelector("#columnAdd");
const columnSubtract = document.querySelector("#columnSubtract");
const rowAdd = document.querySelector("#rowAdd");
const rowSubtract = document.querySelector("#rowSubtract");

// ADD COLUMN

// adds an event listener to the column add button
columnAdd.addEventListener("click", addColumn);

// function to calculate adding a column
function addColumn() {
  // stops the function from running fully if there are more than 16 columns
  if (rs.getPropertyValue("--grid-columns") >= 15) {
    return;
  }
  // grab the column widths variable and turns it into an array
  const columnWidths = rs.getPropertyValue("--grid-column-widths");
  let newColumnWidths = columnWidths.split(" ");

  // appends a new column to the array
  newColumnWidths.push("50px");

  // sets the column variable to the new value after being changed back to a space seperated list
  document.documentElement.style.setProperty(
    "--grid-column-widths",
    newColumnWidths.join(" ")
  );

  // grabs the grid column and row number variables
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  // create a new gridItem div for each row to fill in the new column
  for (var i = 0; i < gridRows; i++) {
    // sets the new gridItem id to the old total number of rows and columns + i
    nextGridItemId = gridColumns * gridRows + i;

    // creates a new gridItem and sets the proper class and new id
    // append gridItem to the grid element
    const newGridItem = document.createElement("div");
    newGridItem.className = "gridItem";
    newGridItem.id = nextGridItemId;
    document.getElementById("grid").appendChild(newGridItem);
  }

  // sets the --grid-columns property to the new value
  document.documentElement.style.setProperty("--grid-columns", gridColumns);
  // sets the p element in the toolbar to the new column number
  document.querySelector("#columnNumber").innerHTML = gridColumns + 1;
  // update the mouse down and dragover events on all gridItems including the newly created ones
  updateMouseDownEvents();
  updateDragoverEvents();
}

//SUBTRACT COLUMN

// adds an event listener to the column subtract button
columnSubtract.addEventListener("click", subtractColumn);

// function to calculate sutracting a column
function subtractColumn() {
  // stops the function from running fully if there is less than 1 column
  if (rs.getPropertyValue("--grid-columns") < 1) {
    return;
  }
  // grab the column widths variable and turns it into an array
  const columnWidths = rs.getPropertyValue("--grid-column-widths");
  let newColumnWidths = columnWidths.split(" ");

  // deletes the last column in the array
  newColumnWidths.pop();

  // sets the column variable to the new value after being changed back to a space seperated list
  document.documentElement.style.setProperty(
    "--grid-column-widths",
    newColumnWidths.join(" ")
  );

  // grabs the grid column and row number variables
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  // deletes gridItem elements equal to the number of rows in the grid
  for (var i = 0; i < gridRows; i++) {
    const oldGridItem = document.getElementById(gridColumns * gridRows - 1 - i);
    oldGridItem.remove();
  }

  // sets the --grid-columns property to the new value
  document.documentElement.style.setProperty("--grid-columns", gridColumns - 2);
  // sets the p element in the toolbar to the new column number
  document.querySelector("#columnNumber").innerHTML = gridColumns - 1;
}

// ADD ROW

// adds an event listener to the row add button
rowAdd.addEventListener("click", addRow);

// function to calculate adding a row
function addRow() {
  // stops the function from running fully if there is more than 6 rows
  if (rs.getPropertyValue("--grid-rows") >= 5) {
    return;
  }
  // grab the row heights variable and turns it into an array
  const rowHeights = rs.getPropertyValue("--grid-row-heights");
  let newRowHeights = rowHeights.split(" ");

  // appends a new row in the array
  newRowHeights.push("50px");

  // sets the row variable to the new value after being changed back to a space seperated list
  document.documentElement.style.setProperty(
    "--grid-row-heights",
    newRowHeights.join(" ")
  );

  // grabs the grid column and row number variables
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  // create a new gridItem div for each column to fill in the new row
  for (var i = 0; i < gridColumns; i++) {
    // sets the new gridItem id to the old total number of rows and columns + i
    nextGridItemId = gridColumns * gridRows + i;

    // creates a new gridItem and sets the proper class and new id
    // append gridItem to the grid element
    const newGridItem = document.createElement("div");
    newGridItem.className = "gridItem";
    newGridItem.id = nextGridItemId;
    document.getElementById("grid").appendChild(newGridItem);
  }

  // sets the --grid-rows property to the new value
  document.documentElement.style.setProperty("--grid-rows", gridRows);
  // sets the p element in the toolbar to the new row number
  document.querySelector("#rowNumber").innerHTML = gridRows + 1;
  // update the mouse down and dragover events on all gridItems including the newly created ones
  updateMouseDownEvents();
  updateDragoverEvents();
}

// SUBTRACT ROW

// adds an event listener to the row subtract button
rowSubtract.addEventListener("click", subtractRow);

// function to calculate subtracting a row
function subtractRow() {
  // stops the function from running fully if there is less than 1 row
  if (rs.getPropertyValue("--grid-rows") < 1) {
    return;
  }
  // grab the row heights variable and turns it into an array
  const rowHeights = rs.getPropertyValue("--grid-row-heights");
  let newRowHeights = rowHeights.split(" ");

  // deletes the last row in the array
  newRowHeights.pop();

  // sets the row variable to the new value after being changed back to a space seperated list
  document.documentElement.style.setProperty(
    "--grid-row-heights",
    newRowHeights.join(" ")
  );

  // grabs the grid column and row number variables
  let gridColumns = parseInt(rs.getPropertyValue("--grid-columns")) + 1;
  let gridRows = parseInt(rs.getPropertyValue("--grid-rows")) + 1;

  // deletes gridItem elements equal to the number of columns in the grid
  for (var i = 0; i < gridColumns; i++) {
    const oldGridItem = document.getElementById(gridColumns * gridRows - 1 - i);
    oldGridItem.remove();
  }

  // sets the --grid-rows property to the new value
  document.documentElement.style.setProperty("--grid-rows", gridRows - 2);
  // sets the p element in the toolbar to the new row number
  document.querySelector("#rowNumber").innerHTML = gridRows - 1;
}

// CHANGE GAP SIZE

// adds a click event listener to the add gap button
gapAdd.addEventListener("click", addGap);

// function to increase gap size
function addGap() {
  // grabs the current grid gap size
  const oldGapSize = parseInt(rs.getPropertyValue("--grid-gap"));
  // ends function if current gap size is 36 or higher
  if (oldGapSize >= 36) {
    return;
  }

  // sets the new gap size
  newGapSize = oldGapSize + 2;

  // sets the p in the toolbar to the new gap size number
  document.querySelector("#gapNumber").innerHTML = newGapSize;
  // sets the variable property to the new gap size
  document.documentElement.style.setProperty("--grid-gap", newGapSize + "px");
}

// adds a click event listener to the subtract gap button
gapSubtract.addEventListener("click", subtractGap);

// function to decrease gap size
function subtractGap() {
  // grabs the current grid gap size
  const oldGapSize = parseInt(rs.getPropertyValue("--grid-gap"));
  // ends function if current gap size is 0 or lower
  if (oldGapSize <= 0) {
    return;
  }

  // sets the new gap size
  newGapSize = oldGapSize - 2;

  // sets the p in the toolbar to the new gap size number
  document.querySelector("#gapNumber").innerHTML = newGapSize;
  // sets the variable property to the new gap size
  document.documentElement.style.setProperty("--grid-gap", newGapSize + "px");
}

// THE COLOURING SECTION

// created a variable to hold the dragged element reference
let draggedElement = null;

// function that creates event listeners to all the colourboxes in the toolbar
function updateDragstartEvents() {
  const colourBoxList = document.getElementsByClassName("colourBox");
  for (var i = 0; i < colourBoxList.length; i++) {
    colourBoxList[i].addEventListener("dragstart", startDrag);
  }
}

// called once in load to create event listeners
updateDragstartEvents();

// set the dragged element when dragstart is called
function startDrag() {
  draggedElement = this;
}

// creates the dragover and drop event listeners to all the griditems
function updateDragoverEvents() {
  const gridItemList = document.getElementsByClassName("gridItem");
  for (var i = 0; i < gridItemList.length; i++) {
    gridItemList[i].addEventListener("dragover", endDrag);
    gridItemList[i].addEventListener("drop", handleDrop);
  }
}

// called once on load to initially create listeners
updateDragoverEvents();

// function to prevent any default actions of hovering over a droppable element
function endDrag(event) {
  event.preventDefault();
}

// function to handle changing the background colour of the target gridItem
function handleDrop(event) {
  if (draggedElement) {
    // grabs the colour of the dragged element
    const colour = window
      .getComputedStyle(draggedElement)
      .getPropertyValue("background-color");
    event.target.style.backgroundColor = colour;
    // sets the dragged element to null to end dragging sequence
    draggedElement = null;
  }
}
