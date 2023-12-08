function simplifyExp(expresion) {
    //To do
    return 0
}

function solve(expresion) {
    //To do
    return 0;
}

function showBooleanTable(expression) {
    const x = this.changeOperators(expression.toUpperCase());
    const prefix = this.infixToPrefixBoolean(x);
    const operands = this.getOperands(x);
    const matrix = this.getCombinationsBoolean(operands.length);

    for (let i = 0; i < matrix.length; i++) {
        let ex = prefix;
        for (let j = 0; j < operands.length; j++) {
            ex = this.replaceAllString(ex, operands[j], matrix[i][j]);
        }

        matrix[i].push(this.evaluatePrefix(ex) ? 1 : 0);
    }

    return this.getFormatTable(matrix, operands);
}
function getPrecedence(operator) {
    switch (operator) {
        // BOOLEAN
        case '¬': return 3; // not
        case '∧':
        case '∨': return 2;
        case '↑': //nand
        case '↓': //nor
        case '⊕': //xor
        case '⊙': //xnor
        case '→': //implica
            return 1;

        // ARITMETHIC
        case '^': return 3;
        case '*': case '/':
            return 2;
        case '+': case '-':
            return 1;
        default:
            return 0;
    }
}

function evaluate(expression) {
    const ex = changeOperators(expression.toUpperCase(), ' ', '');
    const prefix = infixToPostfix(ex);
    return evaluatePostfix(prefix);
}

function isOperator(char) {
    return '∧∨↑↓⊕⊙→¬()[]+-*/^'.includes(char);
}

function evaluatePrefix(prefix) {
    const stack = new Stack();
    for (let i = prefix.length - 1; i >= 0; i--) {
        const char = prefix[i];

        if ('∧∨↑↓⊕⊙→+-*/'.includes(char)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            const result = operate(char, Number(operand1), Number(operand2));
            stack.insert(result);
        } else if (char === '¬') {
            const n = stack.pop();
            stack.insert(!Number(n));
        }
        else {
            stack.insert(char);
        }
    }
    return stack.pop();
}

function evaluatePostfix(postfix) {
    const stack = new Stack();
    const tokens = postfix.split(" ");

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (/^[a-zA-Z0-9]+$/.test(token)) {

            stack.insert(parseFloat(token));
        } else if ("∧∨↑↓⊕⊙→+¬-*/^".includes(token)) {
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            switch (token) {
                case '+':
                    stack.insert(operand1 + operand2);
                    break;
                case '-':
                    stack.insert(operand1 - operand2);
                    break;
                case '*':
                    stack.insert(operand1 * operand2);
                    break;
                case '/':
                    stack.insert(operand1 / operand2);
                    break;
                case '^':
                    stack.insert(Math.pow(operand1, operand2));
                    break;
            }
        }
    }
    return stack.pop();
}

function replaceAllString(inputString, search, replacement) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'g');
    return inputString.replace(regex, replacement);
}
function isLetterOrDigit(char) {
    return /\w/.test(char);
}
function infixToPrefix(x) { //Only one digit
    const infix = changeOperators(x.toUpperCase());
    const stack = new Stack();
    let prefix = "";
    const infixR = reverseString(infix);
    for (let i = 0; i < infixR.length; i++) {
        const char = infixR.charAt(i);
        if (isLetterOrDigit(char)) {
            prefix += char;
        } else if (char === ')') {
            stack.insert(char);
        } else if (char === '(') {
            while (!stack.isEmpty() && stack.peek() != ')') {
                prefix += stack.pop();
                prefix += " ";
            }
            stack.pop();
        } else {
            if (!stack.isEmpty()) {
                if (getPrecedence(char) >= getPrecedence(stack.peek())) {
                    stack.insert(char);
                } else {
                    prefix += stack.pop();
                    prefix += " ";
                    stack.insert(char);
                }

            } else {
                stack.insert(char);
            }
        }
    }
    while (!stack.isEmpty()) {
        prefix += stack.pop();
        prefix += " ";
    }
    return reverseString(prefix);
}
function infixToPrefixBoolean(x) { //Only one digit
    const infix = changeOperators(x.toUpperCase());
    const stack = new Stack();
    let prefix = "";
    const infixR = reverseString(infix);
    for (let i = 0; i < infixR.length; i++) {
        const char = infixR.charAt(i);
        if (isLetterOrDigit(char)) {
            prefix += char;
        } else if (char === ')') {
            stack.insert(char);
        } else if (char === '(') {
            while (!stack.isEmpty() && stack.peek() != ')') {
                prefix += stack.pop();
            }
            stack.pop();
        } else {
            if (!stack.isEmpty()) {
                if (getPrecedence(char) >= getPrecedence(stack.peek())) {
                    stack.insert(char);
                } else {
                    prefix += stack.pop();
                    stack.insert(char);
                }

            } else {
                stack.insert(char);
            }
        }
    }
    while (!stack.isEmpty()) {
        prefix += stack.pop();
    }
    return reverseString(prefix);
}
function infixToPostfix(expression) { //One or more digits
    const stack = new Stack();
    let postfix = "";

    for (let i = 0; i < expression.length; i++) {
        const char = expression.charAt(i);

        if (this.isLetterOrDigit(char)) {
            postfix += char;

            let j = i + 1;
            while (j < expression.length && this.isLetterOrDigit(expression.charAt(j))) {
                postfix += expression.charAt(j);
                j++;
            }
            i = j - 1;
            postfix += " ";
        } else if (char === '(') {
            stack.insert(char);
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                postfix += stack.pop() + " ";
            }
            stack.pop();
        } else if (this.isOperator(char)) {
            while (!stack.isEmpty() && this.getPrecedence(char) <= this.getPrecedence(stack.peek())) {
                postfix += stack.pop() + " ";
            }
            stack.insert(char);
        }
    }

    while (!stack.isEmpty()) {
        postfix += stack.pop() + " ";
    }

    return postfix.trim();
}

function getOperands(expression) {
    const operands = [];
    for (let i = 0; i < expression.length; i++) {
        if (!operands.includes(expression.charAt(i)) && !isOperator(expression.charAt(i))) {
            operands.push(expression.charAt(i));
        }
    }
    return operands;
}

function reverseString(str) {
    let x = "";
    for (let i = str.length - 1; i >= 0; i--) {
        x += str.charAt(i);
    }
    return x;
}

function changeOperators(expression) {
    let x = replaceAllString(expression, 'NAND', '↑');
    x = replaceAllString(x, 'XOR', '⊕');
    x = replaceAllString(x, 'XNOR', '⊙');
    x = replaceAllString(x, 'NOR', '↓');
    x = replaceAllString(x, 'OR', '∨');
    x = replaceAllString(x, 'AND', '∧');
    x = replaceAllString(x, 'NOT', '¬');
    x = replaceAllString(x, 'IMPLIES', '→');
    x = replaceAllString(x, ' ', '');
    return x;
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '∧': return operand1 && operand2;
        case '∨': return operand1 || operand2;
        case '↑': return !(operand1 && operand2);
        case '↓': return !(operand1 || operand2);
        case '⊕': return (operand1 && !operand2) || (operand2 && !operand1);
        case '⊙': return !((operand1 && !operand2) || (operand2 && !operand1));
        case '→': return (!operand1 || operand2);
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': return operand1 / operand2;
        default: false;
    }
}

function getCombinationsBoolean(n) {
    const matrix = new Array(Math.pow(2, n));
    let num = parseInt(Math.pow(2, n) / 2);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(n);
    }
    for (let i = 0; i < n; i++) {
        let cont = 0;
        let x = 0
        for (let j = 0; j < Math.pow(2, n); j++) {
            if (cont < num) {
                matrix[j][i] = x;
                cont++;
            }
            if (cont === num) {
                cont = 0;
                x = x == 0 ? 1 : 0;
            }
        }
        num = parseInt(num / 2);
    }
    return matrix;
}

function getFormatTable(matrix, operands) {
    let x = "<table class='table-boolean'><thead><tr>";
    for (let i = 0; i < operands.length; i++) {
        x += `<td>${operands[i].toLowerCase()}</td>`;
    }
    x += `<td>R</td>`
    x += '</tr></thead><tbody>';
    for (let i = 0; i < matrix.length; i++) {
        x += "<tr>";
        for (let j = 0; j < matrix[i].length; j++) {
            x += `<td>${matrix[i][j]}</td>`;
        }
        x += '</tr>'
    }
    x += '</tbody></table>';
    return x;
}

function factorial(n) {
    let num = parseInt(n);
    if(num === 0){
        return 1;
    
    }else{
        return num*factorial(num-1);
    }
}

//combinations, permutations and variations:
function combinatorics(expresion) {
    const terms = expresion.split(',');

    if (terms.length === 2) {
        const num1 = terms[0].trim();
        const num2 = terms[1].trim();
        let n = parseInt(num1);
        let k = parseInt(num2);

        if (k >= n) {
            return 0;
        }

        return parseInt(factorial(n) / (factorial(k) * (factorial(n - k))));
    } else {
        return "Syntax Error";
    }

}

function combinatoricsRepetition(expresion) {
    const terms = expresion.split(',');
    console.log("dfsdf")

    if (terms.length === 2) {
        const num1 = terms[0].trim();
        const num2 = terms[1].trim();
        let n = parseInt(num1);
        let r = parseInt(num2);
        console.log(n)
        if (n < 1) {
            console.log(r)
            return 0;
        }

        return Number(factorial(n + r - 1) / (factorial(r) * (factorial(n - 1))));
    } else {
        return "Syntax Error";
    }
}

function variation(expresion) {
    const terms = expresion.split(',');

    if (terms.length === 2) {
        const num1 = terms[0].trim();
        const num2 = terms[1].trim();
        let n = parseInt(num1);
        let r = parseInt(num2);

        if (r >= n) {
            return 0;
        }

        return parseInt(factorial(n) / (factorial(n - r)));
    } else {
        return "Syntax Error";
    }
}

function variationRepetition(expresion) {
    const terms = expresion.split(',');

    if (terms.length === 2) {
        const num1 = terms[0].trim();
        const num2 = terms[1].trim();
        let n = parseInt(num1);
        let r = parseInt(num2);
        return (Math.pow(n, r));
    } else {
        return "Syntax Error";
    }
}


//sort (Por corregir)
function heapify(arr, num, inum) {
    let n = parseInt(num);
    let i = parseInt(inum);
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0);
    }
}

function heapsortSorter(expression) {
    const numbers = expression.split(',').map(Number);
    heapSort(numbers);
    const sortedString = numbers.join(',');

    return sortedString;    
}


//Divisors:

function primeNumber(numero) {
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

function getDivisors(numero) {
    const divisores = [];
    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            divisores.push(i);
        }
    }
    return divisores.join(', ');
}

function divisorsFunction(expression) {
    let numero = parseInt(expression);

    if (typeof (numero) !== 'number' || !Number.isInteger(numero)) {
        return 'Syntax Error';
    }

    if (primeNumber(numero)) {
        const divisores = getDivisors(numero);
        return `${numero} es un número primo. \nDivisores: ${divisores}`;
    } else {
        const divisores = getDivisors(numero);
        return `${numero} no es un número primo. \nDivisores: ${divisores}`;
    }
}

function shortestPath(expresion){
    const start = expresion.split(' to ')[0];
    const end = expresion.split(' to ')[1].split(' when')[0];

    const nodes = [];

    const nodes_list = Array.from(expresion.split('nodes={')[1].split('}')[0].split(','));
    const edges_list = Array.from(expresion.split('edges={(')[1].split(')}')[0].split('),('));
    
    var graph = new WeightedGraph();

    for (let i = 0; i < nodes_list.length; i++) {
        let node = nodes_list[i];
        graph.addVertex(node);
    }
    
    for (let i = 0; i < edges_list.length; i++) {
        let edge = edges_list[i];
        graph.addEdge(edge.split(',')[0], edge.split(',')[1], parseInt(edge.split(',')[2]));
    }
    

    /*
    let aux = "";
    for (let i = 0; i < nodes_list.length; i++) {
        aux = aux+nodes_list[i]+"-";
    }

    

    let aux2 = "";
    for (let i = 0; i < edges_list.length; i++) {
        let edge = edges_list[i].split('(')[1];
        aux2 = aux2+"/"+edge+"/";
        
    }
    */


    
    

    return graph.Dijkstra(start, end);
}