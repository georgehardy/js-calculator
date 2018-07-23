document.addEventListener('DOMContentLoaded', reset)
document.addEventListener("click", clicked);

var display;
var displayContent;
var listNumbers;
var listOperators;
var finalNumber;
var commitOperator;

var currentOperator;
var commitedOperator;

var currentNumber;
var commitedNumber;

function reset ()
{
  display = document.getElementById("display")
  displayContent = "0";
  listNumbers = [];
  listOperators = [];
  finalNumber = false;
  currentOperator = ''
  commitedOperator = true;
  currentNumber = 0;
  commitedNumber = false;
  updateDisplay();
  displayContent = "";
}

function clicked(e)
{
  var buttonClicked = e.target;

  if (!buttonClicked.classList.contains('button')) return;

  if (buttonClicked.classList.contains("number"))
  {
      if (finalNumber) {
        finalNumber = false;
        displayContent = "";
      }
      commitedNumber = false;
      commitedOperator = false;
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
        break;
      case "equals":
        listNumbers.push(checkIfNumber(display.value));
        console.log(listNumbers)
        displayContent = doCalculations();
        finalNumber = true;
        break;
  }
  }
  updateDisplay();
  
}

function addCalculation (operator) {

  if (!commitedNumber) {
    listNumbers.push(checkIfNumber(display.value));
    commitedNumber = true;
  }
  if (!commitedOperator) {
    listOperators.push(operator);
    displayContent = "";
    commitedOperator = true;
  }
  else{
    listOperators.splice(listOperators.length-1, 1, operator);
  }

  updateDisplay();
}

function doCalculations () {
  if (listOperators.length == 0 && listNumbers.length > 0) return listNumbers.splice(0);
  else if (listOperators.length == 0) return 0;
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
}

function checkIfNumber(n) {
  if (isNaN(parseInt(n))) return 0;
  return n;
}

function updateDisplay () {
  let output = displayContent;
  if (!isFinite(output) || isNaN(output)) display.value = "ERROR";
  display.value = output;
  }
