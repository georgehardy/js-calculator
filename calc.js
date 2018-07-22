document.addEventListener('DOMContentLoaded', reset)
document.addEventListener("click", clicked);

var display;
var displayContent;
var listNumbers;
var listOperators;

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
    console.log("op " + buttonClicked.id)
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
        displayContent = doCalculations();
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
  let num1 = listNumbers.splice(0,1);
  let num2 = listNumbers.splice(0,1);
  let op = listOperators.splice(0,1);
  console.log(num1 + " " + op + " " + num2 )
  let result = doOperation(num1,num2,op);
  
  if (listOperators.length == 0)
  {
    return result;
  }
  else
  {
    listNumbers.unshift(result);
    return doCalculations();
  }
}

function doOperation (num1,num2,operator) {
  if (operator == "add") {
    return Number(num1) + Number(num2);
  }
  else if (operator == "subtract") {
    return num1 - num2;
  }
  else if (operator == "multiply") {
    return num1 * num2;
  }
  else if (operator == "divide") {
    return num1 / num2;
  }
  /* Need to figure why this doesn't match.
  switch (operator) {
    case "add":
      return num1 + num2;
      break;
    case "subtract":
      return num1 - num2;
      break;
    case "multiply":
    console.log("peng");
      return num1 * num2;
      break;
    case "divide":
      return num1 / num2;
      break;
    default:
      console.log("???");
  }
  */
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
