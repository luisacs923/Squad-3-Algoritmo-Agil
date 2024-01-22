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
  const seno = document.getElementById("seno");
  const cosseno = document.getElementById("cosseno");
  const log = document.getElementById("log");
  const pi = document.getElementById("pi");

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
    proximaOperacao();
  });
  igual.addEventListener("click", () => {
    try {
      if (verificarOperador()) {
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
  seno.addEventListener("click", () => {
    adicionarOperador("sin");
    realizarOperacao();
    resultado.textContent = mostrarResultado();
    proximaOperacao();
  });
});

const operacao = [0, undefined, 0];
let resultado = 0;
let digitado = [0];

function verificarOperador() {
  if (operacao[1] !== undefined) {
    return true;
  }
  return false;
}

function adicionarNumero(numero) {
  digitado.push(numero);

  // PRIMEIRO OPERANDO
  if (!verificarOperador()) {
    if (operacao[0] === 0) {
      operacao[0] = numero;
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    operacao[0] = `${operacao[0]}${numero}`;
    console.log(`Primeiro operando: ${operacao[0]}`);

    return;
  }
  // SEGUNDO OPERANDO
  if (operacao[2] === 0) {
    operacao[2] = numero;
    console.log(`Segundo operando: ${operacao[2]}`);
    return;
  }

  operacao[2] = `${operacao[2]}${numero}`;
  console.log(`Segundo operando: ${operacao[2]}`);
}

function adicionarVirgula() {
  // PRIMEIRO OPERANDO
  if (!verificarOperador()) {
    if (String(operacao[0]).includes(".")) {
      throw new Error("Número já possui uma vírgula.");
    }

    digitado.push(",");
    operacao[0] += ".";
    console.log(`Primeiro operando: ${operacao[0]}`);
    return;
  }
  // SEGUNDO OPERANDO
  if (String(operacao[2]).includes(".")) {
    throw new Error("Número já possui uma vírgula.");
  }

  if (operacao[2] === 0) {
    digitado.push(0);
  }

  digitado.push(",");
  operacao[2] += ".";
  console.log(`Segundo operando: ${operacao[2]}`);
}

function adicionarOperador(simboloOperador) {
  let ultimoDigitado = digitado[digitado.length - 1];

  if (operacao[1] && typeof ultimoDigitado === "number") {
    realizarOperacao();
    proximaOperacao();
  }

  if (ultimoDigitado !== simboloOperador) {
    digitado.push(simboloOperador);
    operacao[1] = simboloOperador;
    console.log(`Operador: ${operacao[1]}`);
  }
}

function realizarOperacao() {
  switch (operacao[1]) {
    case "+":
      resultado = Number(operacao[0]) + Number(operacao[2]);
      console.log(`Operação realizada`);
      break;
    case "-":
      resultado = Number(operacao[0]) - Number(operacao[2]);
      console.log(`Operação realizada`);
      break;
    case "/":
      if (operacao[2] === 0) {
        throw new Error("Não é possível dividir por zero.");
      }
      resultado = Number(operacao[0]) / Number(operacao[2]);
      console.log(`Operação realizada`);
      break;
    case "x":
      resultado = Number(operacao[0]) * Number(operacao[2]);
      console.log(`Operação realizada`);
      break;
    case "%":
      resultado = Number(operacao[0]) / 100;
      console.log(`Operação realizada`);
      break;
    case "sin":
      resultado = (Number(operacao[0])*Math.PI)/180;
      resultado = Math.sin(resultado);
      console.log(`Operação realizada`);
      break;
    default:
      throw new Error(
        "Não foi possível realizar a operação: operador inválido."
      );
  }
  resultado = Math.round(resultado*100000000)/100000000; // para resolver o problema de ponto flutuante (a calculadora terá 8 casas decimais)
}

function mostrarResultado() {
  digitado = [resultado];
  console.log(`Resultado: ${resultado}`);
  return digitado.join("").replace(".", ",");
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
  digitado = [];
  console.log(`Operandos, operador e resultado reiniciados`);
}

function mostrarDigitado() {
  return digitado.length === 0 ? 0 : digitado.join("").replace(".", ",");
}
