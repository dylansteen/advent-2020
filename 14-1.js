const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('mask =')
  .filter(line => !!line));
}

async function main() {

  const instructions = (await getData()).map(str => str.split('\n'));

  instructions.forEach(instructionSet => {
    const [stringMask, ...writes] = instructionSet;
    const mask = stringMask.trim();
    const parsedInstructions = writes.filter(write => !!write).map(write => {
      const [rawAddress, value] = write.split('=').map(str => str.trim(''));
      const address = parseInt(rawAddress.replace('mem[', '').replace(']', ''));

      return [address, value];
    });

    parsedInstructions.forEach(([address, value]) => {
      const maskedVal = masked(mask, value);
      const val = BigInt(`0b0${maskedVal}`);
      memory[address] = val;
    });
  });
  console.log(Object.values(memory).reduce((acc, curr) => curr + acc).toString());
}

const memory = {};

const masked = (mask, value) => {
  const binaryArr = toBinaryString(value).split('');
  return binaryArr.map((character, index) => mask[index] === 'X' ? character : mask[index]).join('');
}

const toBinaryString = (num) => {
  const bin = (num >>> 0).toString(2)
  return bin.padStart(36, '0');
}

main();