let display = document.getElementById("display");

// Function to append values (numbers, constants)
function appendValue(value) {
    display.value += value;
}

// Function to append operators (+, -, *, /)
function appendOperator(operator) {
    let lastChar = display.value.slice(-1);
    // Avoid adding multiple consecutive operators
    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }
    display.value += operator;
}

// Function to append mathematical functions (Math.sin, Math.cos, etc.)
// This version will not add parentheses for the function
function appendFunction(func) {
    display.value += func; // Just append the function name without parentheses
}

// Function to append power operator (x^n or xⁿ)
function appendPower() {
    display.value += "**";
}

// Function to append decimal point
function appendDecimal() {
    let parts = display.value.split(/[\+\-\*\/\(\)]/); // Split by operators or parentheses
    let lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
        display.value += ".";
    }
}

// Function to clear the display
function clearDisplay() {
    display.value = "";
}

// Function to calculate the result
function calculateResult() {
    try {
        let expression = display.value
            .replace(/Math\.log10/g, "Math.log") // Fix incorrect log10 handling
            .replace(/\^/g, "**")               // Convert "^" to "**" for power
            .replace(/Math\.(sin|cos|tan|sqrt|log|exp|pow)/g, "Math.$1") // Handle specific functions

        // Evaluate the expression using JavaScript's Function constructor
        display.value = new Function("return " + expression)();
    } catch {
        display.value = "Error";
    }
}

// Enable keyboard support
document.addEventListener("keydown", function (event) {
    if (/[0-9+\-*/().]/.test(event.key)) {
        appendValue(event.key); // Append number, operator, or decimal
    } else if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        calculateResult(); // Calculate the result when Enter is pressed
    } else if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1); // Delete last character
    } else if (event.key === "Escape") {
        clearDisplay(); // Clear the display on Escape key press
    }
});

// Allow users to click on a function button (e.g., Math.sin(), Math.cos())
// Now the function name is appended without parentheses
function handleFunctionButton(func) {
    appendFunction(func);
}

// Handle when an operator button is clicked
function handleOperatorButton(operator) {
    appendOperator(operator);
}

// Handle when a number button is clicked
function handleNumberButton(number) {
    appendValue(number);
}

// Handle when the clear button is clicked
function handleClearButton() {
    clearDisplay();
}

// Handle when the equals button is clicked
function handleEqualsButton() {
    calculateResult();
}
