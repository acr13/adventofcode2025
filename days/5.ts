import { readFileSync } from 'fs';

export const day5 = () => {
  const input = readFileSync('inputs/5.txt', 'utf8').split('\n');
  const ranges: number[][] = [];
  let parseRanges = true;
  let p1 = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      parseRanges = false;
      continue;
    }

    if (parseRanges) {
      const [lo, hi] = input[i].split('-').map(Number);
      ranges.push([lo, hi]);
    } else {
      const n = Number(input[i]);
      if (ranges.some(([lo, hi]) => n >= lo && n <= hi)) {
        p1++;
      }
    }
  }

  let p2 = 0;
  ranges.sort((a, b) => a[0] - b[0]);
  const overlapRanges: number[][] = [];

  ranges.forEach(([lo, hi]) => {
    const overlap = overlapRanges.find(([lo2, hi2]) => hi2 >= lo);
    if (!overlap) {
      overlapRanges.push([lo, hi]);
    } else {
      if (hi > overlap[1]) {
        overlap[1] = hi;
      }
    }
  });

  overlapRanges.forEach(([lo, hi]) => {
    p2 += hi - lo + 1;
  });

 
  return [p1, p2];
};
