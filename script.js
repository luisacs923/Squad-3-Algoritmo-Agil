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
  seno.addEventListener("click", () => {
    adicionarOperador("sin");
    realizarOperacao();
    resultado.textContent = mostrarResultado();
    proximaOperacao();
  });
  cosseno.addEventListener("click", () => {
    adicionarOperador("cos");
    realizarOperacao();
    resultado.textContent = mostrarResultado();
    proximaOperacao();
  });
  log.addEventListener("click", () => {
    adicionarOperador("log");
    realizarOperacao();
    resultado.textContent = mostrarResultado();
    proximaOperacao();
  });
  pi.addEventListener("click", () => {
    adicionarNumero(Math.PI);
    resultado.textContent = mostrarDigitado();
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
    if (numero === Math.PI) {
      if (operacao[0] !== 0) {
        // Aqui se já existe algum operando
        if (!isNaN(Number(operacao[0]))) {
          throw new Error("Operação inválida: número de PI após operando existente.");
        }
        operacao[1] = "x";
        operacao[2] = numero;
        realizarOperacao();
        mostrarResultado();
        proximaOperacao();
        return;
      }
    }

    if (operacao[0] === 0 && numero === 0) {
      digitado = [numero];
      console.log(`Zero à esquerda não será exibido`);
      return;
    }

    // Aqui ele vê se já existe alguma virgula
    if (String(numero).includes(".")) {
      throw new Error("Número já possui uma vírgula.");
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

  if (numero === Math.PI && String(operacao[2]).includes(".")) {
    console.log(`Não é possível adicionar o número de PI ao operando`);
    return;
  }

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

  if (isNaN(Number(ultimoDigitado)) && ultimoDigitado !== ",") { //verificando se o ultimo é number
    throw new Error("Operador não pode ser adicionado após a vírgula.");
  }

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
  try {
    switch (operacao[1]) {
      case "+":
        resultado = Number(operacao[0]) + Number(operacao[2]);
        break;
      case "-":
        resultado = Number(operacao[0]) - Number(operacao[2]);
        break;
      case "/": // verificação para evitar a divisão por zero.
        if (operacao[2] === 0) {
          throw new Error("Não é possível dividir por zero.");
        }
          resultado = Number(operacao[0]) / Number(operacao[2]);
          break;
      case "x":
        resultado = Number(operacao[0]) * Number(operacao[2]);
        break;
      case "%":
        resultado = Number(operacao[0]) / 100;
        break;
        case "sin":
          if (isNaN(Number(operacao[0]))) {
              throw new Error("Ângulo inválido para a operação seno.");
          }
          resultado = (Number(operacao[0]) * Math.PI) / 180;
          resultado = Math.sin(resultado);
          break;
      
      case "cos":
          if (isNaN(Number(operacao[0]))) {
              throw new Error("Ângulo inválido para a operação cosseno.");
          }
          resultado = (Number(operacao[0]) * Math.PI) / 180;
          resultado = Math.cos(resultado);
          break;
          case "log":
          if (Number(operacao[0]) <= 0) {
              throw new Error(
                "Não é possível calcular log de números não positivos."
              );
            }
            resultado = Math.log10(Number(operacao[0]));
            break;

        default:
          throw new Error("Não foi possível realizar a operação: operador inválido.");
    }
    console.log(`Operação realizada: ${resultado}`);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}
  resultado = Math.round(resultado * 100000000) / 100000000; // para resolver o problema de ponto flutuante (a calculadora terá 8 casas decimais)

function mostrarResultado() {
  digitado = resultado.toString().replace(".", ",").split("");
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

  if (digitado.length === 0) {
    digitado.push(0);
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
