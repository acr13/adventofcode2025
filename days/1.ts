import { readFileSync } from "fs";

const numbers = readFileSync('inputs/test.txt', 'utf8')
  .split('\n')
  .map(Number);

export const day1 = () => {
  return [
    numbers.reduce((a, b) => a + b, 0),
    numbers.reduce((a, b) => a + b, 0) + 1,
  ];
};