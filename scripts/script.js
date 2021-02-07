const numberInput = document.querySelector('input');
let currentValue = numberInput.value;
let previousValue = null;
let currentOperator = null;
let previousOperator = null;
const clearButton = document.querySelector('#clear');

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
    case '÷':
      result = divide(num1, num2);
      break;
    default: // nothing happens
  }
  currentValue = result;
  numberInput.value = currentValue;
  if (currentOperator) {
    previousOperator = currentOperator;
  }
  currentOperator = null;
};

const updateInput = function updateNumberInput(newValue) {
  if (currentValue !== '0') {
    currentValue += newValue;
  } else {
    currentValue = newValue;
  }
  numberInput.value = currentValue;
  clearButton.textContent = 'CE';
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
      currentValue = /\./.test(currentValue)
        ? currentValue
        : `${currentValue}.`;
      numberInput.value = currentValue;
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
    dataValue: '÷',
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
      if (currentValue === '0' && currentOperator === '÷') {
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
