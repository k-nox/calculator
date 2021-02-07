const numberInput = document.querySelector('input');
let currentValue = numberInput.value;
let previousValue = null;
let currentOperator = null;
let previousOperator = null;
const clearButton = document.querySelector('#clear');

// rounds to a certain number of decimal places to avoid common rounding errors
const round = function roundToDecimal(value, decimalPlaces) {
  return Number(`${Math.round(`${value}e${decimalPlaces}`)}e-${decimalPlaces}`);
};

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

const checkForRounding = function checkResultLengthForRounding(result) {
  const resultLength = result.toString().length;
  const splitResult = result.toString().split('.');
  let roundedResult = result;
  // if the result is a floating point & is longer than 9 digits
  if (resultLength > 10 && /\./.test(result)) {
    roundedResult = round(result, 9 - splitResult[0].length);

    // if the result is an integer longer than 9 digits
  } else if (roundedResult.toString().length > 9) {
    roundedResult = roundedResult.toExponential();

    // if the default exponential rounding is still too long, round to specific length
    if (roundedResult.length > 10) {
      const splitExponentialResult = roundedResult.split('e');
      const firstPartLength = splitExponentialResult[0].length; // before the e
      const secondPartLength = splitExponentialResult[1].length; // after the e

      // 9 is used in this calc since the e takes 1 of the 10 available characters
      if (firstPartLength > 9 - secondPartLength) {
        // 7 is used in this calc since e, 1, and the decimal point take up 3 of the 10 characters
        roundedResult = (+roundedResult).toExponential(7 - secondPartLength);
      }
    }
  }
  return roundedResult;
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
  currentValue = checkForRounding(result);
  numberInput.value = currentValue;
  if (currentOperator) {
    previousOperator = currentOperator;
  }
  currentOperator = null;
};

const updateInput = function updateNumberInput(newValue) {
  if (
    currentValue.length < 9 ||
    (currentValue.length < 10 && /\./.test(currentValue)) // limits number length to 9 digits
  ) {
    if (currentValue !== '0') {
      currentValue += newValue;
    } else {
      currentValue = newValue;
    }
    numberInput.value = currentValue;
    clearButton.textContent = 'CE';
  }
};

const storeOperator = function storeOperatorAndValues(operator) {
  if (!currentOperator) {
    previousValue = currentValue;
    currentOperator = operator;
    currentValue = '0';
  } else {
    operate(+previousValue, currentOperator, +currentValue);
    previousValue = currentValue;
    currentOperator = operator;
    currentValue = '0';
  }
};

const buttonsArray = [
  {
    dataValue: '0',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '1',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '2',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '3',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '4',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '5',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '6',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '7',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '8',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '9',
    action() {
      updateInput(this.dataValue);
    },
  },
  {
    dataValue: '.',
    action() {
      if (currentValue.length < 9) {
        currentValue = /\./.test(currentValue)
          ? currentValue
          : `${currentValue}.`;
        numberInput.value = currentValue;
      }
    },
  },
  {
    dataValue: '+',
    action() {
      storeOperator(this.dataValue);
    },
  },
  {
    dataValue: '-',
    action() {
      storeOperator(this.dataValue);
    },
  },
  {
    dataValue: '/',
    action() {
      storeOperator(this.dataValue);
    },
  },
  {
    dataValue: '*',
    action() {
      storeOperator(this.dataValue);
    },
  },
  {
    dataValue: '=',
    action() {
      if (currentValue === '0' && currentOperator === '/') {
        numberInput.value = 'nope';
      } else if (previousValue) {
        if (currentOperator) {
          operate(+previousValue, currentOperator, +currentValue);
        } else {
          operate(+previousValue, previousOperator, currentValue);
        }
      }
    },
  },
  {
    dataValue: '+/-',
    action() {
      if (/^-/.test(currentValue)) {
        currentValue = currentValue.slice(1);
        numberInput.value = currentValue;
      } else {
        currentValue = `-${currentValue}`;
        numberInput.value = currentValue;
      }
    },
  },
  {
    dataValue: 'clear',
    action() {
      if (clearButton.textContent === 'AC') {
        currentValue = '0';
        previousValue = null;
        currentOperator = null;
        numberInput.value = currentValue;
      } else {
        currentValue = '0';
        numberInput.value = currentValue;
        clearButton.textContent = 'AC';
      }
    },
  },
];

document.querySelectorAll('button').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    buttonsArray.forEach((button) => {
      if (button.dataValue === e.target.dataset.value) {
        button.action();
      }
    });
  })
);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    document.querySelector('button[data-value="clear"]').focus();
    buttonsArray[17].action();
  } else {
    buttonsArray.forEach((button) => {
      if (button.dataValue === e.key) {
        document
          .querySelector(`button[data-value='${button.dataValue}']`)
          .focus();
        button.action();
      }
    });
  }
});
