let display = document.querySelector('.display');
let res = document.querySelector('.display-result');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let show = '';
let isFirstNumber = true;
let dotUsed = false;

// Function to get button by id
function getButtonById(id) {
    return document.querySelector(`button[id='${id}']`);
}

// List of number button ids
const numberIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// List of operator button ids
const operatorIds = ['+', '-', '/', 'x'];

// List of special button ids
const specialIds = ['dot', 'equal', 'clear', 'erase'];

// Function to handle button clicks for numbers
function handleNumberClick(event) {
    const button = event.target || { id: event.key };
    if (isFirstNumber) {
        firstNumber += button.id;
        show = firstNumber;
    } else {
        secondNumber += button.id;
        show = firstNumber + operator + secondNumber;
    }
    display.textContent = show;
    if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
        calculateResult();
    }
}

// Function to handle button clicks for operators
function handleOperatorClick(event) {
    const button = event.target || { id: event.key };
    if (firstNumber !== '') {
        if (secondNumber !== '') {
            calculateResult();
            firstNumber = res.textContent;
            secondNumber = '';
        }
        operator = button.id;
        isFirstNumber = false;
        dotUsed = false;
        show = firstNumber + operator;
        display.textContent = show;
    }
}

// Function to handle special button clicks
function handleSpecialClick(event) {
    const button = event.target || { id: event.key };
    if (button.id === 'clear') {
        firstNumber = '';
        operator = '';
        secondNumber = '';
        show = '';
        isFirstNumber = true;
        dotUsed = false;
        display.textContent = show;
        res.textContent = '';
    } else if (button.id === 'erase') {
        if (secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
        } else if (operator !== '') {
            operator = '';
            isFirstNumber = true;
        } else {
            firstNumber = firstNumber.slice(0, -1);
        }
        show = firstNumber + operator + secondNumber;
        display.textContent = show;
    } else if (button.id === 'dot') {
        if (!dotUsed) {
            if (isFirstNumber) {
                firstNumber += '.';
                show = firstNumber;
            } else {
                secondNumber += '.';
                show = firstNumber + operator + secondNumber;
            }
            dotUsed = true;
            display.textContent = show;
        }
    } else if (button.id === 'equal') {
        calculateResult();
        firstNumber = res.textContent;
        secondNumber = '';
        operator = '';
        isFirstNumber = true;
        dotUsed = firstNumber.includes('.');
        show = firstNumber;
        display.textContent = show;
    }
}

// Function to calculate the result
function calculateResult() {
    let result;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        default:
            result = 'Error';
    }
    res.textContent = result;
}

// Add event listener to number buttons
numberIds.forEach(id => {
    const button = getButtonById(id);
    if (button) {
        button.addEventListener('click', handleNumberClick);
    }
});

// Add event listener to operator buttons
operatorIds.forEach(id => {
    const button = getButtonById(id);
    if (button) {
        button.addEventListener('click', handleOperatorClick);
    }
});

// Add event listener to special buttons
specialIds.forEach(id => {
    const button = getButtonById(id);
    if (button) {
        button.addEventListener('click', handleSpecialClick);
    }
});

// Add event listener for keyboard support
window.addEventListener('keydown', (event) => {
    const key = event.key;

    if (numberIds.includes(key)) {
        handleNumberClick(event);
    } else if (operatorIds.includes(key)) {
        handleOperatorClick(event);
    } else if (specialIds.includes(key)) {
        handleSpecialClick(event);
    } else if (key === 'Enter') {
        event.target = { id: 'equal' };
        handleSpecialClick(event);
    } else if (key === 'Backspace') {
        event.target = { id: 'erase' };
        handleSpecialClick(event);
    }
});
