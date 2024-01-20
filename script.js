document.addEventListener("DOMContentLoaded", () => {
  const zero = document.getElementById("zero");
  const um = document.getElementById("um");
  const dois = document.getElementById("dois");
  const tres = document.getElementById("tres");
  const quatro = document.getElementById("quatro");
  const cinco = document.getElementById("cinco");
  const seis = document.getElementById("seis");
  const sete = document.getElementById("sete");
  const oito = document.getElementById("oito");
  const nove = document.getElementById("nove");
  const soma = document.getElementById("soma");
  const subtracao = document.getElementById("subtracao");
  const divisao = document.getElementById("divisao");
  const multiplicacao = document.getElementById("multiplicacao");
  const porcentagem = document.getElementById("porcentagem");
  const igual = document.getElementById("igual");
  const virgula = document.getElementById("virgula");
  const limpar = document.getElementById("limpar");
  const resultado = document.getElementById("resultado");

  resultado.textContent = mostrarDigitado();

  zero.addEventListener("click", () => {
    adicionarNumero(0);
    resultado.textContent = mostrarDigitado();
  });
  um.addEventListener("click", () => {
    adicionarNumero(1);
    resultado.textContent = mostrarDigitado();
  });
  dois.addEventListener("click", () => {
    adicionarNumero(2);
    resultado.textContent = mostrarDigitado();
  });
  tres.addEventListener("click", () => {
    adicionarNumero(3);
    resultado.textContent = mostrarDigitado();
  });
  quatro.addEventListener("click", () => {
    adicionarNumero(4);
    resultado.textContent = mostrarDigitado();
  });
  cinco.addEventListener("click", () => {
    adicionarNumero(5);
    resultado.textContent = mostrarDigitado();
  });
  seis.addEventListener("click", () => {
    adicionarNumero(6);
    resultado.textContent = mostrarDigitado();
  });
  sete.addEventListener("click", () => {
    adicionarNumero(7);
    resultado.textContent = mostrarDigitado();
  });
  oito.addEventListener("click", () => {
    adicionarNumero(8);
    resultado.textContent = mostrarDigitado();
  });
  nove.addEventListener("click", () => {
    adicionarNumero(9);
    resultado.textContent = mostrarDigitado();
  });
  virgula.addEventListener("click", () => {
    adicionarVirgula();
    resultado.textContent = mostrarDigitado();
  });
  soma.addEventListener("click", () => {
    adicionarOperador("+");
    resultado.textContent = mostrarDigitado();
  });
  subtracao.addEventListener("click", () => {
    adicionarOperador("-");
    resultado.textContent = mostrarDigitado();
  });
  divisao.addEventListener("click", () => {
    adicionarOperador("/");
    resultado.textContent = mostrarDigitado();
  });
  multiplicacao.addEventListener("click", () => {
    adicionarOperador("x");
    resultado.textContent = mostrarDigitado();
  });
  porcentagem.addEventListener("click", () => {
    adicionarOperador("%");
    realizarOperacao();
    resultado.textContent = mostrarResultado();
  });
  igual.addEventListener("click", () => {
    try {
      if (verificarOperador() && verificarOperandos()) {
        realizarOperacao();
        resultado.textContent = mostrarResultado();
        proximaOperacao();
        return;
      }
      throw new Error("Erro ao realizar a operação");
    } catch (e) {
      console.log(e.message);
    }
  });
  limpar.addEventListener("click", () => {
    limparOperacao();
    resultado.textContent = mostrarResultado();
  });
});

const operacao = [0, undefined, 0];
let resultado = 0;
let digitado = 0;

function verificarOperador() {
  if (operacao[1] !== undefined) {
    return true;
  }
  return false;
}

function verificarOperandos() {
  if (operacao[0] !== 0 && operacao[2] !== 0) {
    return true;
  }
  return false;
}

function adicionarNumero(numero) {
  if (!verificarOperador()) {
    if (operacao[0] === "-") {
      operacao[0] = Number("-" + numero);
      digitado = operacao[0];
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    if (String(operacao[0]).includes(".")) {
      operacao[0] = `${operacao[0]}${numero}`;
      digitado = operacao[0].replace(".", ",");
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    if (operacao[0] !== 0) {
      operacao[0] = operacao[0] * 10 + numero;
      digitado = operacao[0];
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    operacao[0] = numero;
    digitado = operacao[0];
    console.log(`Primeiro operando: ${operacao[0]}`);
  }
  if (verificarOperador()) {
    if (String(operacao[2]).includes(".")) {
      operacao[2] = `${operacao[2]}${numero}`;
      digitado = operacao[2].replace(".", ",");
      console.log(`Primeiro operando: ${operacao[2]}`);
      return;
    }

    if (operacao[2] !== 0) {
      operacao[2] = operacao[2] * 10 + numero;
      digitado = operacao[2];
      console.log(`Segundo operando: ${operacao[2]}`);
      return;
    }

    operacao[2] = numero;
    digitado = operacao[2];
    console.log(`Segundo operando: ${operacao[2]}`);
  }
}

function adicionarVirgula() {
  if (!verificarOperador()) {
    if (operacao[0] === "-") {
      operacao[0] = "-0.";
      digitado = "-0,";
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    if (String(operacao[0]).includes(".")){
      throw new Error ("Número já possui uma vírgula.")
    }

    digitado = operacao[0] + ",";
    operacao[0] += ".";
    console.log(`Primeiro operando: ${operacao[0]}`);
  }
  if (verificarOperador()) {
    if (String(operacao[2]).includes(".")){
      throw new Error ("Número já possui uma vírgula.")
    }

    digitado = operacao[2] + ",";
    operacao[2] += ".";
    console.log(`Primeiro operando: ${operacao[2]}`);
  }
}

function adicionarOperador(simboloOperador) {
  if (operacao[0] === 0 && simboloOperador === "-") {
    operacao[0] = "-";
    digitado = operacao[0];
    console.log(`Primeiro operando: ${operacao[0]}`);
    return;
  }

  if (operacao[1]){
    realizarOperacao()
    proximaOperacao()
  }

  operacao[1] = simboloOperador;
  digitado = operacao[1];
  console.log(`Operador: ${operacao[1]}`);
}

function realizarOperacao() {
  switch (operacao[1]) {
    case "+":
      resultado = Number(operacao[0]) + Number(operacao[2]);
      break;
    case "-":
      resultado = Number(operacao[0]) - Number(operacao[2]);
      break;
    case "/":
      resultado = Number(operacao[0]) / Number(operacao[2]);
      break;
    case "x":
      resultado = Number(operacao[0]) * Number(operacao[2]);
      break;
    case "%":
      resultado = Number(operacao[0]) / 100;
      operacao[0] = resultado
      break;

    default:
      throw new Error(
        "Não foi possível realizar a operação: operador inválido."
      );
  }
}

function mostrarResultado() {
  console.log(`Resultado: ${resultado}`);
  return resultado;
}

function proximaOperacao() {
  operacao[0] = resultado;
  operacao[1] = undefined;
  operacao[2] = 0;
  resultado = 0;
}

function limparOperacao() {
  operacao[0] = 0;
  operacao[1] = undefined;
  operacao[2] = 0;
  resultado = 0;
  console.log(`Operandos, operador e resultado reiniciados`);
}

function mostrarDigitado() {
  return digitado;
}
