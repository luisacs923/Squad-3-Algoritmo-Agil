document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    let currentInput = "";

    const updateDisplay = () => {
        display.value = currentInput;
    };

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.innerText;
            
            switch (buttonValue) {
                case 'C':
                    currentInput = '';
                    break;
                case '←':
                    currentInput = currentInput.slice(0, -1);
                    break;
                case '=':
                    calcular();
                    break;
                default:
                    currentInput += buttonValue;
                    break;
            }

            updateDisplay();
        });
    });

    window.calcular = function () {
        try {
            let expression = currentInput.replace(/x/g, '*').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/log/g, 'Math.log').replace(/pi/g, 'Math.PI');
            expression = expression.replace(/%/g, '/100');

            currentInput = new Function('return ' + expression)();
        } catch (error) {
            currentInput = 'Error';
        }
        updateDisplay();
    };
    document.addEventListener('keydown', function (event) {
        var key = event.key;

        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '(' || key === ')' || key === ',' || key.toLowerCase() === 's' || key.toLowerCase() === 'c' || key.toLowerCase() === 'l' || key === 'p') {
            if (key.toLowerCase() === 's') {
                currentInput += 'sin(';
            } else if (key.toLowerCase() === 'c') {
                currentInput += 'cos(';
            } else if (key.toLowerCase() === 'l') {
                currentInput += 'log(';
            } else if (key === 'p') {
                currentInput += 'pi';
            } else {
                
                currentInput += key;
            }
            updateDisplay();
        } else if (key === 'Enter') {
            calcular();
        } else if (key === 'Escape') {
            limparDisplay();
        } else if (key === 'Backspace') {
            const currentValue = display.value;
            display.value = currentValue.slice(0, -1);
            currentInput = display.value;
        }
 
    });
});
