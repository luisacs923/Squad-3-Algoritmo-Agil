document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");

  let currentInput = "";

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.innerText;

      switch (button.id) {
        case "limpar":
          limparDisplay();
          break;
        case "apagar":
          apagar();
          break;
        case "igual":
          calcular();
          break;
        case "sin":
          currentInput += "sin(";
          break;
        case "cos":
          currentInput += "cos(";
          break;
        case "log":
          currentInput += "log(";
          break;
        case "pi":
          currentInput += "pi";
          break;
        case "quadrado":
          currentInput = `(${currentInput})²`;
          break;
        case "raiz":
          currentInput += "√(";
          break;
        default:
          currentInput += buttonValue;
          break;
      }

      updateDisplay();
    });
  });

  document.addEventListener("keydown", function (event) {
    let key = event.key;

    if (key === "Enter") calcular();
    if (key === "Escape" || key === "Delete") limparDisplay();
    if (key === "Backspace") apagar();

    if (
      !isNaN(key) ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/" ||
      key === "%" ||
      key === "(" ||
      key === ")" ||
      key === ","
    )
      currentInput += key;

    if (key.toLowerCase() === "s") currentInput += "sin(";
    if (key.toLowerCase() === "c") currentInput += "cos(";
    if (key.toLowerCase() === "l") currentInput += "log(";
    if (key.toLowerCase() === "p") currentInput += "pi";
    if (key.toLowerCase() === "q") currentInput = `(${currentInput})²`;
    if (key.toLowerCase() === "r") currentInput += "√(";

    updateDisplay();
  });

  window.calcular = function () {
    try {
      let expression = currentInput
        .replace(/x/g, "*")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/log/g, "Math.log")
        .replace(/PI/g, "Math.PI")
        .replace(/√/g, "Math.sqrt")
        .replace(/²/g, "**2")
        .replace(/,/g, ".")
        .replace(/%/g, "/100");

      result = eval(expression);
      currentInput = result.toString().replace(".", ",");
    } catch (e) {
      currentInput = "Error";
      console.error(e.message);
    }
    updateDisplay();
  };

  function updateDisplay() {
    display.value = currentInput;
  }

  function limparDisplay() {
    currentInput = "";
    display.value = "";
  }

  function apagar() {
    currentInput = currentInput.slice(0, -1);
  }
});
