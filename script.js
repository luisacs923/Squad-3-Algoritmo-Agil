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
  const apagar = document.getElementById("apagar");

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
      throw new Error("Erro ao realizar a operação: operador indefinido");
    } catch (e) {
      console.error(e.message);
    }
  });
  limpar.addEventListener("click", () => {
    limparOperacao();
    resultado.textContent = mostrarResultado();
  });
  apagar.addEventListener("click", () => {
    apagarUltimoCaractere();
    resultado.textContent = mostrarDigitado();
  });
});

const operacao = [0, undefined, 0];
let resultado = 0;
let digitado = [0];
let ultimoDigitado = 0;

function verificarOperador() {
  if (operacao[1] !== undefined) {
    return true;
  }
  return false;
}

function adicionarNumero(numero) {
  // PRIMEIRO OPERANDO
  if (!verificarOperador()) {
    if (operacao[0] === 0 && numero === 0) {
      digitado = [numero];
      console.log(`Zero à esquerda não será exibido`);
      return;
    }
    if (operacao[0] === 0) {
      digitado = [numero];
      operacao[0] = numero;
      console.log(`Primeiro operando: ${operacao[0]}`);
      return;
    }

    digitado.push(numero);
    operacao[0] = `${operacao[0]}${numero}`;
    console.log(`Primeiro operando: ${operacao[0]}`);

    return;
  }
  // SEGUNDO OPERANDO
  ultimoDigitado = digitado[digitado.length - 1];

  if (operacao[2] === 0 && numero === 0) {
    console.log(`Zero à esquerda não será exibido`);
    return;
  }
  if (operacao[2] === 0) {
    if (ultimoDigitado == 0) digitado.pop();
    digitado.push(numero);
    operacao[2] = numero;
    console.log(`Segundo operando: ${operacao[2]}`);
    return;
  }

  digitado.push(numero);
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
  ultimoDigitado = digitado[digitado.length - 1];

  if (String(operacao[2]).includes(".")) {
    throw new Error("Número já possui uma vírgula.");
  }

  if (operacao[2] == 0 && ultimoDigitado !== 0) {
    digitado.push(0);
  }

  digitado.push(",");
  operacao[2] += ".";
  console.log(`Segundo operando: ${operacao[2]}`);
}

function adicionarOperador(simboloOperador) {
  ultimoDigitado = digitado[digitado.length - 1];

  if (operacao[1] && typeof ultimoDigitado === "number") {
    realizarOperacao();
    mostrarResultado();
    proximaOperacao();
  }

  if (operacao[1] === simboloOperador) {
    return;
  }

  if (operacao[1] && operacao[1] !== simboloOperador) {
    digitado[digitado.length - 1] = simboloOperador;
    operacao[1] = simboloOperador;
    console.log(`Operador: ${operacao[1]}`);
    return;
  }

  digitado.push(simboloOperador);
  operacao[1] = simboloOperador;
  console.log(`Operador: ${operacao[1]}`);
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

    default:
      throw new Error(
        "Não foi possível realizar a operação: operador inválido."
      );
  }
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

function apagarUltimoCaractere() {
  digitado = digitado.join("").split("");

  let ultimoCaractere = digitado.pop();

  if (digitado.length === 0){
    digitado.push(0)
  }

  // REMOVER DO SEGUNDO OPERANDO
  if (operacao[2] !== 0) {
    operacao[2] = operacao[2].toString();
    operacao[2] = operacao[2].slice(0, -1);
    console.log(`Removido: ${ultimoCaractere}`);

    if (!operacao[2] || operacao[2] === "0") {
      operacao[2] = 0;
    }
    console.log(`Segundo operando: ${operacao[2]}`);
    return;
  }

  //REMOVER OPERADOR
  if (isNaN(Number(ultimoCaractere)) && ultimoCaractere !== ",") {
    operacao[1] = undefined;
    console.log(`Operador: ${operacao[1]}`);
    return;
  }

  // REMOVER DO PRIMEIRO OPERANDO
  if (operacao[0] !== 0 && operacao[1] === undefined) {
    operacao[0] = operacao[0].toString();
    operacao[0] = operacao[0].slice(0, -1);
    console.log(`Removido: ${ultimoCaractere}`);
  }

  if (!operacao[0] || operacao[0] === "0") {
    operacao[0] = 0;
  }
  console.log(`Primeiro operando: ${operacao[0]}`);
}
