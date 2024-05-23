const myButton = document.querySelector("#myButton");
console.log(myButton);

const sideDrawer = document.querySelector("#side-drawer");
console.log(sideDrawer);

myButton.addEventListener("click", toggleDrawer);

let isOpened = false;

function toggleDrawer() {
  if (!isOpened) {
    sideDrawer.style.translate = "200px";
    isOpened = true;
  } else {
    sideDrawer.style.translate = "0px";
    isOpened = false;
  }
}
