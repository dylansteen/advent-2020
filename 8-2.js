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
  const originalInstructions = await getInstructions();
  let resultFound = false;

  for (const [index, instruction] of originalInstructions.entries()) {

    // Acc instructions are never changed
    if (instruction.includes('acc')) {
      continue;
    }
    
    // Exit condition
    if (resultFound) {
      break;
    }

    // Reset all data for the new list of instructions
    seenInstructionPositions.clear();
    resetRegisters(registers);
    let instructionRepeated = false;

    // Update the instruction
    const instructions = [...originalInstructions];
    const updatedInstruction = instructionUpdater(instruction);
    instructions[index] = updatedInstruction;

    // Start loading and executing instructions
    while(!instructionRepeated && !resultFound) {
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

      // Check for ending condition
      if (registers.pcr === instructions.length) {
        resultFound = true;
      }
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

const resetRegisters = (registers) => {
  Object.keys(registers).forEach(key => registers[key] = 0);
}

const instructionUpdater = (instruction) => instruction.includes('jmp') ? instruction.replace('jmp', 'nop') : instruction.replace('nop', 'jmp')


