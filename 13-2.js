const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n')
  );
}

async function main() {
  const [_, busIdString] = await getData();
  const others = busIdString.split(',');

  const busIdObjects = others.map((id, index) => ({ id: parseInt(id), mod: id - index })).filter(obj => !isNaN(obj.id));

  busIdObjects.forEach(obj => {
    console.log(obj.mod % obj.id, 'mod', obj.id); 
  });

  console.log('\x1b[36m%s\x1b[0m', 'now plug that into an online CRT calculator cause its 1am');
}

main();
