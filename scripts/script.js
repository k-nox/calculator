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

const numberInput = document.querySelector('input');
let currentValue = numberInput.value;

const updateInput = function updateNumberInput(newValue) {
  currentValue = currentValue !== '0' ? currentValue + newValue : newValue;
  numberInput.value = currentValue;
};

const addDecimalPoint = function addDecimalPointToNumberInput() {
  const containsDecimal = /\./;
  currentValue = containsDecimal.test(currentValue)
    ? currentValue
    : `${currentValue}.`;
  numberInput.value = currentValue;
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
      addDecimalPoint();
    },
  },
  {
    dataValue: '+',
  },
  {
    dataValue: '-',
  },
  {
    dataValue: '÷',
  },
  {
    dataValue: '*',
  },
  {
    dataValue: '/',
  },
  {
    dataValue: '+/-',
  },
  {
    dataValue: 'clear',
  },
  {
    dataValue: '=',
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
