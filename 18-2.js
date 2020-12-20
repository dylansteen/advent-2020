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
  let last = '';
  const stack = [];
  const expr = [...expression];

  // Add an extra empty element to make sure we complete the last operation on stack
  expr.push(undefined);
  expr.forEach((character) => {
    if (isAddable(stack)) {
      add(stack, character);
    }

    // we only want to do the adding if we've got an undefined, skip the rest
    if (character === undefined) { 
      return;
    }
    
    // base case, just add it to the stack
    if (character !== ')') {
      stack.push(character);
      // Deal with parenthesized expression
    } else {
      let nextChar = stack.pop();
      const innerExpression = [];
      while (nextChar !== '(') {
        if (isAddable(innerExpression)) {
          add(innerExpression, nextChar);
        } else {
          innerExpression.unshift(nextChar);
          nextChar = stack.pop();
        }
      }
      stack.push(calcResult(innerExpression));
    }
    last = character;
  });
  return calcResult(stack);
}

const calcResult = (expression) => expression.reduce((acc, curr) => curr === '*' ? acc : acc * curr);

// get the result of an expression like ['3' + '5'] and clear it from the stack
const add = (stack) => {
  const first = stack.pop();
  stack.pop();
  const second = stack.pop();
  const result = parseInt(first) + parseInt(second);
  stack.push(result);
}

// We can only add when the top of the stack is a number and the second is a plus sign
const isAddable = (stack) => !'*+()'.includes(stack[stack.length - 1]) && stack[stack.length - 2] === '+'