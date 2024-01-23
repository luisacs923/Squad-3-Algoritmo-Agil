document.addEventListener('DOMContentLoaded', function () {
    var display = document.getElementById('display');
    var operacao = [0, undefined, 0];
    var resultado = 0;

    window.printOperacao = function (value) {
        display.value += value;
    };

    window.calcular = function () {
        try {
            let expression = display.value.replace(/x/g, '*').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/log/g, 'Math.log').replace(/pi/g, 'Math.PI');
            expression = expression.replace(/%/g, '/100');

            display.value = new Function('return ' + expression)();
        } catch (error) {
            display.value = 'Error';
        }
    };

    window.limparDisplay = function () {
        display.value = '';
    };

    window.limparUltimoNumero = function () {
        const currentValue = display.value;
        display.value = currentValue.slice(0, -1);
    };

    document.addEventListener('keydown', function (event) {
        var key = event.key;

        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '(' || key === ')' || key === ',' || key.toLowerCase() === 's' || key.toLowerCase() === 'c' || key.toLowerCase() === 'l' || key === 'p') {
            if (key.toLowerCase() === 's') {

                printOperacao('sin(');
            } else if (key.toLowerCase() === 'c') {

                printOperacao('cos(');
            } else if (key.toLowerCase() === 'l') {

                printOperacao('log(');
            } else if (key === 'p') {

                printOperacao('pi');
            } else {
                printOperacao(key);
            }
        } else if (key === 'Enter') {
            calcular();
        } else if (key === 'Escape') {
            limparDisplay();
        } else if (key === 'Backspace') {
            const currentValue = display.value;
            display.value = currentValue.slice(0, -1);
        }
    });
});
