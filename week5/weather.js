// declare the function to check the weather value
function checkWeather() {
  // uses document.querySelector to grab the whole input tag and then makes input equal the .value that the user typed in
  let input = document.querySelector("#weatherInput").value;

  //   comparing the values with the potential outputs
  // using document.querySelector again to grab the whole p tag and change the html text between to what the result is
  if (input <= 16) {
    document.querySelector("#weatherOutput").innerHTML = "cold";
  } else if (input <= 24) {
    document.querySelector("#weatherOutput").innerHTML =
      "i dont know its fine i guess";
  } else if (input <= 37) {
    document.querySelector("#weatherOutput").innerHTML =
      "my friends start to complain that it's hot";
  } else {
    document.querySelector("#weatherOutput").innerHTML = "hot";
  }
}
