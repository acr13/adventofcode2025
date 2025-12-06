import { readFileSync } from 'fs';

const input = readFileSync('inputs/6.txt', 'utf8').split('\n');
const grid = input.map(line => line.trim().split(/\s+/));

const rotate = arr => [...arr[0]].map((_, i) => arr.map(row => row[i]))

const parse = () => {
  const sheet = [];

  for (let i = 0; i < input.length; i++) {
    const parts = input[i].split(' ').filter(x => !!x)

    if (i === input.length - 1) {
      parts.forEach((op, i) => sheet[i].push(op));
      break;
    }

    const numbers = parts.map(Number);
    numbers.forEach((n, i) => {
      if (!sheet[i]) sheet[i] = [];
      sheet[i].push(n);
    });
  }

  return sheet;
};

const part1 = (sheet) => {
  let sum = 0;

  for (const task of sheet) {
    const op = task.pop();
    if (op === '*') {
      sum += task.reduce((mul, n) => mul * n, 1);
    } else {
      sum += task.reduce((sum, n) => sum + n, 0);
    }
  }

  return sum;
};

const part2 = () => {
  const ops = grid.pop()
  input.pop();

  return rotate(input)
    .map(row => +row.join(""))
    .join()
    .split(",0,")
    .map((row, i) => eval(row.replaceAll(",", ops[i])))
    .reduce((a, b) => a + b)
};

export const day6 = () => {
  const sheet = parse();
  let p1 = part1(sheet);
  let p2 = part2();

  return [p1, p2];
};