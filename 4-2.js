const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getPassports() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('\n\n').filter(passport => !!passport));
}

async function main() {
  const passports = await getPassports();

  const result = passports.reduce((acc, passport) => {
    const fields = passport.split(/\b(\s)/).filter(field => !!field.trim());
    const fieldObject = toObject(fields);
    const keyArr = Object.keys(fieldObject);
    if((keyArr.length === 8 || (keyArr.length === 7 && keyArr.every(field => field !== 'cid'))) && keyArr.every(key => validators[key](fieldObject[key]))) {
      return acc + 1
    };

    return acc;
  }, 0);

  console.log(result);
}

const toObject = (fields) => {
  return fields.reduce((acc, field) => {
    const [fieldName, fieldValue] = field.split(':');
    return {
      ...acc,
      [fieldName]: fieldValue,
    }
  }, {});
}

const birthYearValid = (birthYear) => `${birthYear}`.length === 4 && birthYear >= 1920 && birthYear <= 2002
const issueYearValid = (issueYear) => `${issueYear}`.length === 4 && issueYear >= 2010 && issueYear <= 2020
const expirationYearValid = (expirationYear) => `${expirationYear}`.length === 4 && expirationYear >= 2020 && expirationYear <= 2030
const heightValid = (heightWithUnit) => {
  const [height, unit] = [heightWithUnit.substring(0, heightWithUnit.length-2), heightWithUnit.substring(heightWithUnit.length-2, heightWithUnit.length)];
  if (!['cm', 'in'].includes(unit)) {
    return false;
  }

  if (unit === 'cm') {
    return height >= 150 && height <= 193;
  }

  // cm
  return height >= 59 && height <= 76
}

const hairColourValid = (colour) => {
  [pound, ...rest] = colour;

  return pound === '#' && rest.length === 6 && rest.every(character => 'abcdef0123456789'.includes(character));
}

const eyeColourValid = (colour) => { 
  return 'amb blu brn gry grn hzl oth'.split(' ').includes(colour);
};

const pidValid = (pid) => { 
  return pid.length === 9 && Number.isInteger(Number.parseInt(pid));
};

const validators = {
  byr: birthYearValid,
  hcl: hairColourValid,
  hgt: heightValid,
  iyr: issueYearValid,
  eyr: expirationYearValid,
  pid: pidValid,
  ecl: eyeColourValid,
  cid: () => true,
};

main();
