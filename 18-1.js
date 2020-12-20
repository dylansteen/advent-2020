const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n'));
}

async function main() {
  const expressions = await getData();

  const result = expressions.map(expression => {
    return getResult(expression.split('').filter(x => x !== ' '));
  }).reduce((acc, curr) => acc + curr);
  console.log(result);
}

main();


const getResult = (expression) => {
  const stack = [];
  expression.forEach((character) => {
    if (character !== ')') {
      stack.push(character);
    } else {
      let nextChar = stack.pop();
      const innerExpression = [];
      while (nextChar !== '(') {
        innerExpression.unshift(nextChar);
        nextChar = stack.pop();
      }
      stack.push(calcResult(innerExpression));
    }
  });
  return calcResult(stack);
}

const calcResult = (expression) => {
  let result = parseInt(expression[0]);
  let operation = '';
  expression.forEach(character => {
    if ('*+'.includes(character)) {
      operation = character;
    } else {
      result = calculator[operation](result, parseInt(character))
    }
  });
  return result;
}

const calculator = {
  '*': (prev, curr) => prev * curr,
  '+': (prev, curr) => prev + curr,
  '': (prev, _) => prev,
}