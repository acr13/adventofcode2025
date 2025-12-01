import { readFileSync } from "fs";

const steps = readFileSync('inputs/1.txt', 'utf8').split('\n')

export const day1 = () => {
  let p1 = 0;
  let p2 = 0;
  let dial = 50;

  const DIR: Record<string, number> = { 'L': -1, 'R': 1 };

  for (const step of steps) {
    const d = step[0];
    const turn = Number(step.slice(1)) * DIR[d];
    dial = (dial + turn) % 100;
    if (dial === 0) p1++;
  }

  dial = 50;

  for (const step of steps) {
    const d = DIR[step[0]];
    const turn = Number(step.slice(1));

    for (let i = 0; i < turn; i++) {
      dial += d;

      if (dial < 0 || dial > 99) {
        dial = ((dial % 100) + 100) % 100;
      }
      if (dial === 0) p2++;
    }
  }

  return [p1, p2];
};