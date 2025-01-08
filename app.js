let display = document.querySelector('.display');
let res = document.querySelector('.display-result');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let show = '';
let isFirstNumber = true;
let dotUsed = false;

// Function to get button by id
const getButtonById = id => document.querySelector(`button[id='${id}']`);

// List of button ids
const numberIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operatorIds = ['+', '-', '/', 'x'];
const specialIds = ['dot', 'equal', 'clear', 'erase'];

// Function to handle button clicks
const handleButtonClick = (event, type) => {
    const button = event.target || { id: event.key };
    switch (type) {
        case 'number':
            if (isFirstNumber) {
                firstNumber += button.id;
                show = firstNumber;
            } else {
                secondNumber += button.id;
                show = firstNumber + operator + secondNumber;
            }
            display.textContent = show;
            if (firstNumber && operator && secondNumber) calculateResult();
            break;
        case 'operator':
            if (firstNumber) {
                if (secondNumber) {
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
            break;
        case 'special':
            handleSpecialClick(button.id);
            break;
    }
};

// Function to handle special button clicks
const handleSpecialClick = id => {
    switch (id) {
        case 'clear':
            firstNumber = operator = secondNumber = show = '';
            isFirstNumber = true;
            dotUsed = false;
            display.textContent = res.textContent = '';
            break;
        case 'erase':
            if (secondNumber) {
                secondNumber = secondNumber.slice(0, -1);
            } else if (operator) {
                operator = '';
                isFirstNumber = true;
            } else {
                firstNumber = firstNumber.slice(0, -1);
            }
            show = firstNumber + operator + secondNumber;
            display.textContent = show;
            break;
        case 'dot':
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
            break;
        case 'equal':
            calculateResult();
            firstNumber = res.textContent;
            secondNumber = operator = '';
            isFirstNumber = true;
            dotUsed = firstNumber.includes('.');
            show = firstNumber;
            display.textContent = show;
            break;
    }
};

// Function to calculate the result
const calculateResult = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;
    switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '/': result = num1 / num2; break;
        case 'x': result = num1 * num2; break;
        default: result = 'Error';
    }
    res.textContent = result;
};

// Add event listeners to buttons
[...numberIds, ...operatorIds, ...specialIds].forEach(id => {
    const button = getButtonById(id);
    if (button) {
        const type = numberIds.includes(id) ? 'number' : operatorIds.includes(id) ? 'operator' : 'special';
        button.addEventListener('click', event => handleButtonClick(event, type));
    }
});

// Add event listener for keyboard support
window.addEventListener('keydown', event => {
    const key = event.key;
    if (numberIds.includes(key)) {
        handleButtonClick(event, 'number');
    } else if (operatorIds.includes(key)) {
        handleButtonClick(event, 'operator');
    } else if (specialIds.includes(key) || key === 'Enter' || key === 'Backspace') {
        const id = key === 'Enter' ? 'equal' : key === 'Backspace' ? 'erase' : key;
        handleSpecialClick(id);
    }
});
