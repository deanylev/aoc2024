const fs = require('fs');
const text = fs.readFileSync('data.txt', 'utf8');

// part 1
const matches = text.match(/mul\(\d+,\d+\)/g);
const firstTotal = matches.reduce((total, match) => {
  const [_, num1, num2] = match.match(/^mul\((\d+),(\d+)\)$/);
  const parsedNum1 = parseInt(num1, 10);
  const parsedNum2 = parseInt(num2, 10);
  return total + parsedNum1 * parsedNum2;
}, 0);
console.log(firstTotal);

// part 2
let chunk = '';
let secondTotal = 0;
let on = true;

for (let i = 0; i < text.length; i++) {
  chunk += text[i];
  const partialMatches = chunk.match(/^mul\((\d+),?(\d+)?\)?$/);
  const fullMatches = chunk.match(/^mul\((\d+),(\d+)\)$/);

  // an abomination
  if (
    (chunk === 'm' || chunk === 'mu' || chunk === 'mul' || chunk === 'mul(' || partialMatches && !fullMatches)
    || chunk === 'd' || chunk === 'do' || chunk === 'do(' || chunk === 'don' || chunk === "don'" || chunk === "don't" || chunk === "don't("
  ) {
    continue;
  }

  if (chunk === 'do()') {
    on = true;
  } else if (chunk === "don't()") {
    on = false;
  }

  if (fullMatches && on) {
    const [_, num1, num2] = fullMatches;
    if (typeof num1 === 'string' && typeof num2 === 'string') {
      const parsedNum1 = parseInt(num1, 10);
      const parsedNum2 = parseInt(num2, 10);
      secondTotal += parsedNum1 * parsedNum2;
    }
  }

  chunk = '';
}
console.log(secondTotal);
