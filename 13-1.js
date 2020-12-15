const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n')
  );
}

async function main() {
  const [departureString, busIdString] = await getData();
  const busIds = busIdString.split(',').map(id => parseInt(id)).filter(departure => !isNaN(departure));
  const departureTime = parseInt(departureString)
  const firstDeparture = busIds[0] + Math.floor(departureTime / busIds[0]) * busIds[0];

  const result = busIds
    .reduce((acc, busId) => {
      const departure = busId + Math.floor(departureTime / busId) * busId;
      return departure < acc.dep ? { id: busId, dep: departure } : acc;
    }, { id: 0, dep: firstDeparture });

    console.log(result)
    console.log(result.id * (result.dep - departureTime));
}

main();
