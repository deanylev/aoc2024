const fs = require('fs');
const text = fs.readFileSync('data.txt', 'utf8');
const lines = text.split('\n');

const valuesAreSafe = (values) => {
  return (values.every((value, index) => index === 0 || values[index - 1] > value) || values.every((value, index) => index === 0 || values[index - 1] < value))
    && values.every((value, index) => {
      if (index === 0) {
        return true;
      }

      const prev = values[index - 1];
      if (prev === value) {
        return false;
      }

      const diff = Math.abs(prev - value);
      return diff >= 1 && diff <= 3;
    });
};

// part 1
const safeReports = lines.filter((line) => {
  const values = line.split(' ').map((value) => parseInt(value, 10));
  return valuesAreSafe(values);
}).length;
console.log(safeReports);

// part 2
const safeReportsWithProblemDampener = lines.filter((line) => {
  const values = line.split(' ').map((value) => parseInt(value, 10));
  if (valuesAreSafe(values)) {
    return true;
  }

  // this is horribly inefficient but I'm lazy
  for (let i = 0; i < values.length; i++) {
    if (valuesAreSafe(values.filter((_, index) => index !== i))) {
      return true;
    }
  }
}).length;
console.log(safeReportsWithProblemDampener);
