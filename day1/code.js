const fs = require('fs');
const text = fs.readFileSync('data.txt', 'utf8');
const lines = text.split('\n');

const leftNumbers = [];
const rightNumbers = [];

lines.forEach((line) => {
  const [leftNumber, rightNumber] = line.split('   ');
  leftNumbers.push(parseInt(leftNumber, 10));
  rightNumbers.push(parseInt(rightNumber, 10));
});

leftNumbers.sort((a, b) => a - b);
rightNumbers.sort((a, b) => a - b);

// part 1
const distances = leftNumbers.map((leftNumber, index) => Math.abs(leftNumber - rightNumbers[index]));
const totalDistance = distances.reduce((a, b) => a + b, 0);
console.log(totalDistance);

// part 2
const leftNumberApperancesInRight = {};
rightNumbers.forEach((number) => {
  if (!leftNumbers.includes(number)) {
    return;
  }

  if (!leftNumberApperancesInRight[number]) {
    leftNumberApperancesInRight[number] = 0;
  }

  leftNumberApperancesInRight[number]++;
});
const similarityScore = Object.entries(leftNumberApperancesInRight).reduce((a, b) => {
  return a + parseInt(b[0], 10) * b[1];
}, 0);
console.log(similarityScore);
