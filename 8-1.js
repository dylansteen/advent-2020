const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getInstructions() { 
  return readFile('input.txt', 'utf8').then((data) => 
    data.split('\n')
      .filter(instruction => !!instruction)
  );
}

async function main() {
  const seenInstructionPositions = new Set();
  const instructions = await getInstructions();
  let instructionRepeated = false;

  while(!instructionRepeated) {
    // Get next instruction
    seenInstructionPositions.add(registers.pcr);
    const instructionWithValue = instructions[registers.pcr];

    // Parse next instruction
    const [instruction, stringValue] = instructionWithValue.split(' ');
    const numericValue = parseInt(stringValue);

    // Get operation for instruction and destination register
    const operation = operations[instruction];
    const resultRegister = instructionToResultRegisterMap[instruction];

    // Execute instruction
    registers[resultRegister] = operation(registers[resultRegister], numericValue);

    // Increment Program Counter
    if (instruction !== 'jmp') {
      registers.pcr = registers.pcr + 1;
    }

    // Mark instruction as visited
    if (seenInstructionPositions.has(registers.pcr)) {
      instructionRepeated = true;
    }
  }

  console.log(registers.acc);
}

main();

const operations = {
  acc: (curr, toAdd) => curr + toAdd,
  jmp: (curr, toMove) => curr + toMove,
  nop: () => {},
}

const registers = {
  pcr: 0,
  acc: 0,
};

const instructionToResultRegisterMap = {
  jmp: 'pcr',
  acc: 'acc',
};
