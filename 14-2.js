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

  instructions.forEach((instructionSet) => {
    const [stringMask, ...writes] = instructionSet;
    const mask = stringMask.trim();
    const parsedInstructions = writes.filter(write => !!write).map(write => {
      const [rawAddress, value] = write.split('=').map(str => str.trim(''));
      const address = parseInt(rawAddress.replace('mem[', '').replace(']', ''));

      return [address, value];
    });

    parsedInstructions.forEach(([address, value]) => {
      const writeAddresses = getWriteAddresses(address, mask);
      writeAddresses.forEach(writeAddress => memory[writeAddress] = parseInt(value));
    });
  });
  console.log(Object.values(memory).reduce((acc, curr) => curr + acc));
}

const memory = {};

const getWriteAddresses = (address, mask) => {
  const maskedBinaryArr = toBinaryString(address).split('').map((character, index) => {
    if (mask[index] === 'X') {
      return 'X';
    }
  
    if(mask[index] === '1') {
      return '1';
    }

    return character;
  });

  const toReturn = new Set();
  getPermutes(maskedBinaryArr.join(''), toReturn);

  return toReturn;
}

const toBinaryString = (num) => {
  const bin = (num >>> 0).toString(2)
  return bin.padStart(36, '0');
}

const getPermutes = (maskedString, possibleAddresses) => {
  if (!maskedString.includes('X')) {
    possibleAddresses.add(maskedString);
  } else {
    const one = maskedString.replace('X', '1');
    const zero = maskedString.replace('X', '0');
    getPermutes(one, possibleAddresses);
    getPermutes(zero, possibleAddresses);
  }
}

main();