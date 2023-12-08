//import { simplificar } from "funciones.js";

function principal(event) {
    //event.preventDefault();
    event.preventDefault();
    const entrada = document.getElementById('entrada').value;
    const salida = procesar(entrada);
    document.getElementById("resultado").innerHTML = salida;
}

function procesar(entrada) {
    // Set de expresiones
    let comandos = ["evaluate", "solve", "simplify", "boolean table", "prefix", "postfix", "factorial",
        "combinatorics repetition", "variation repetition", "combinatorics", "variation", "sort", "shortest path from"];

    for (let i = 0; i < comandos.length; ++i) {
        let comando = comandos[i];
        let posicion = entrada.search(comando);

        if (posicion != -1) {
            let expresion = entrada.substring(comando.length + 1, entrada.length);
            if (comando == comandos[0]) return "Resultado: " + evaluate(expresion);
            else if (comando == comandos[1]) return "Resultado: " + solve(expresion);
            else if (comando == comandos[2]) return "Resultado: " + simplifyExp(expresion);
            else if (comando == comandos[3]) return "Resultado: " + showBooleanTable(expresion);
            else if (comando == comandos[4]) return "Resultado: " + infixToPrefix(expresion);
            else if (comando == comandos[5]) return "Resultado: " + infixToPostfix(expresion);
            else if (comando == comandos[6]) return "Resltado: " + factorial(expresion);
            else if (comando == comandos[7]) return "Resultado: " + combinatoricsRepetition(expresion);
            else if (comando == comandos[8]) return "Resultado: " + variationRepetition(expresion);
            else if (comando == comandos[9]) return "Resultado: " + combinatorics(expresion);
            else if (comando == comandos[10]) return "Resultado: " + variation(expresion);
            else if (comando == comandos[11]) return "Resultado: " + heapsortSorter(expresion);
            else if (comando == comandos[12]) return "Resultado: " + shortestPath(expresion);
            else return "¡Error! No se puede procesar la expresión!"
        }

        //return "No se puede procesar";
    }

    //let position = text.search(/blue/);
    //let comando = str.substring(0, 3);

    //const arreglo = entrada.split(" ");
    //return "entrada: "+entrada+", expresion: "+expresion;
    //return "hola a todos".search(/xola/);
}

const form = document.getElementById("formulario");
const log = document.getElementById("resultado");
form.addEventListener("submit", principal);

let buttonSendExpression = document.querySelector(".buttonSendExpression");
buttonSendExpression.addEventListener('click', principal);
/*
function procesar(p1, p2) {
    return p1 * p2;
}

let entrada = document.getElementById('entrada').value;
let result = analizar(4, 3);
document.getElementById("resultado").innerHTML = result;
document.getElementById("otro-resultado").innerHTML = entrada;
*/