const add = function addNumbers(num1, num2) {
  return num1 + num2;
};

const subtract = function subtractNumbers(num1, num2) {
  return num1 - num2;
};

const multiply = function multiplyNumbers(num1, num2) {
  return num1 * num2;
};

const divide = function divideNumbers(num1, num2) {
  return num1 / num2;
};

const operate = function performOperation(num1, operator, num2) {
  let result;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default: // nothing happens
  }
  return result;
};
