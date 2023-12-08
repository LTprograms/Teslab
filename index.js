function main(event) {
    //event.preventDefault();
    event.preventDefault();
    const input = document.getElementById('input-expression').value;

    const output = process(input);
    document.getElementById("input").innerHTML = input;
    document.getElementById("result").innerHTML = output;
}

function process(input) {
    // Set de expresiones
    let commands = ["evaluate", "solve", "simplify", "boolean table", "prefix", "postfix", "factorial",
        "combinatorics repetition", "variation repetition", "combinatorics", "variation", "sort"];

    for (let i = 0; i < commands.length; ++i) {
        let command = commands[i];
        let posicion = input.search(command);

        if (posicion != -1) {
            let expression = input.substring(command.length + 1, input.length);
            if (command == commands[0]) return evaluate(expression);
            else if (command == commands[1]) return solve(expression);
            else if (command == commands[2]) return simplifyExp(expression);
            else if (command == commands[3]) return showBooleanTable(expression);
            else if (command == commands[4]) return infixToPrefix(expression);
            else if (command == commands[5]) return infixToPostfix(expression);
            else if (command == commands[6]) return factorial(expression);
            else if (command == commands[7]) return combinatoricsRepetition(expression);
            else if (command == commands[8]) return variationRepetition(expression);
            else if (command == commands[9]) return combinatorics(expression);
            else if (command == commands[10]) return variation(expression);
            else if (command == commands[11]) return heapsortSorter(expression);

            else return "¡Error! No se puede procesar la expresión!"
        }

        //return "No se puede procesar";
    }

    //let position = text.search(/blue/);
    //let command = str.substring(0, 3);

    //const arreglo = input.split(" ");
    //return "input: "+input+", expression: "+expression;
    //return "hola a todos".search(/xola/);
}

const input = document.getElementById("input-expression");
input.addEventListener("submit", main);

let buttonSendExpression = document.getElementById("button-send-expression");
buttonSendExpression.addEventListener('click', main);