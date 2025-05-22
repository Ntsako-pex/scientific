const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
}

function handleNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

function handleOperator(op) {
    if (op === 'AC') {
        clearAll();
    } else if (op === '←') {
        currentInput = currentInput.slice(0, -1) || '0';
    } else if (op === '=') {
        if (operation && previousInput) {
            currentInput = calculate(previousInput, currentInput, operation);
            operation = null;
            previousInput = '';
            resetScreen = true;
        }
    } else if (op === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else {
        if (operation && previousInput) {
            currentInput = calculate(previousInput, currentInput, operation);
        }
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }
}

function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '*': return (num1 * num2).toString();
        case '/': return (num1 / num2).toString();
        default: return num2.toString();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
        
        updateDisplay();
    });
});

// Initialize
updateDisplay();