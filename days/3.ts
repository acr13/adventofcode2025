import { readFileSync } from 'fs';

const input = readFileSync('inputs/3.txt', 'utf8').split('\n')

const getHighestNumber = (array: number[], digits: number, carry = 0) => {
  const maxIndex = array.length - digits + 1;
  let index = 0;
  let value = 0;

  for (let i = 0; i < maxIndex; i++) {
    const battery = array[i];
    if (battery > value) {
      value = battery;
      index = i;
    }
  }

  carry += value * Math.pow(10, digits - 1);
  if (digits == 1) return carry;

  const remaining = array.slice(index + 1, array.length);
  return getHighestNumber(remaining, digits - 1, carry);
}


export const day3 = () => {
  const batteries = input.map(line => line.split('').map(Number));
  const p1 = batteries.map(arr => getHighestNumber(arr, 2))
    .reduce((sum, n) => sum + n, 0);
  const p2 = batteries.map(arr => getHighestNumber(arr, 12))
    .reduce((sum, n) => sum + n, 0);

  return [p1, p2];
};

