document.addEventListener('DOMContentLoaded', reset)
document.addEventListener("click", clicked);

var display;
var displayContent;
var listNumbers;
var listOperators;
var calculatedNumber;

function reset ()
{
  display = document.getElementById("display")
  displayContent = "";
  listNumbers = [];
  listOperators = [];
  updateDisplay();
}

function clicked(e)
{
  var buttonClicked = e.target;
  if (buttonClicked.classList.contains("number"))
  {
      displayContent += buttonClicked.innerHTML;
  }
  else if (buttonClicked.classList.contains("operator"))
  {
    addCalculation(buttonClicked.id);
  }
  else
  {
    switch(buttonClicked.id) {
      case "decimal":
          if (!displayContent.includes(".")) displayContent += ".";
          break;
      case "clear":
          reset();
          break;
      case "clearentry":
          displayContent = "";
      case "equals":
          listNumbers.push(convertToNumber(display.value));
          doCalculations();
          break;
  }
  }
  updateDisplay();
}

function addCalculation (operator) {
  listNumbers.push(convertToNumber(display.value));
  listOperators.push(operator);
  displayContent = "";
  updateDisplay();
}

function doCalculations () {
  displayContent = "";
  console.log("do math");
  console.log(listNumbers);
  console.log(listOperators);
}

function convertToNumber(n) {
  let int = parseInt(n)
  if (isNaN(int)) {
    return 0;
  }
  return int;
}

function updateDisplay () {
  display.value = displayContent;
}
