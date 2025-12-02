import { readFileSync } from "fs";

const steps = readFileSync('inputs/2.txt', 'utf8').split('\n');

const parse = (steps: string[]) => {
  const ranges = [];

  for (let i = 0; i < steps.length; i++) {
    const parts = steps[i].split(',');
    for (let j = 0; j < parts.length; j++) {
      if (parts[j] !== '') {
        const [left, right] = parts[j].split('-').map(Number);
        ranges.push([left, right]);
      }
    }
  }

  return ranges;
};

const isP1 = (i: number) => {
  if (i.toString().length % 2 === 0) {
    const s = i.toString();
    const left = s.substring(0, s.length / 2);
    const right = s.substring(s.length / 2);
    if (left === right) {
      return true;
    }
  }

  return false;
};

const isP2 = (i: number) => {
  const s = i.toString();
  const regex = /^(\d+)\1{1,}$/;
  return s.match(regex);
};

export const day2 = () => {
  let p1 = 0;
  let p2 = 0;
  const ranges = parse(steps);

  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      if (isP1(i)) {
        p1 += i;
      }
      if (isP2(i)) {
        p2 += i;
      }
    }
  }

  return [p1, p2];
};

const p2 = () => {

}