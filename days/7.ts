import { readFileSync } from 'fs';

const grid = readFileSync('inputs/7.txt', 'utf8')
  .split('\n')
  .map(line => line.split(''));
const R = grid.length;
const C = grid[0].length;

const p1 = () => {
  let split = 0;
  let BEAMS = new Set<string>();

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 'S') {
        BEAMS.add(`${r},${c}`);
        break
      }
    }
  }

  while (BEAMS.size) {
    const bs = [...BEAMS.values()];
    const BEAMS2 = new Set<string>();

    bs.forEach(key => {
      const [r, c] = key.split(',').map(Number);
      const rr = r + 1;

      if (rr > 0 && rr < R) {
        if (grid[rr][c] === '^') {
          const c1 = c - 1;
          const c2 = c + 1;

          if (c1 >= 0 && c1 < C) {
            BEAMS2.add(`${rr},${c1}`);
          }
          if (c2 >= 0 && c2 < C) {
            BEAMS2.add(`${rr},${c2}`);
          }

          split++;
        } else {
          BEAMS2.add(`${rr},${c}`);
        }
      }
    });

    BEAMS = BEAMS2;
  }

  return split;
};

const p2 = () => {
  let BEAMS = new Map<number, number>();

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 'S') {
        BEAMS.set(c, 1);
        break;
      }
    }
  }

  for (let r = 1; r < R; r++) {
    let BEAMS2 = new Map<number, number>();
    for (const [c, n] of BEAMS.entries()) {

      if (grid[r][c] === '^') {
        const c1 = c - 1;
        const c2 = c + 1;

        if (c1 >= 0 && c1 < C) {
          BEAMS2.set(c1, (BEAMS2.get(c1) || 0) + n);
        }
        if (c2 >= 0 && c2 < C) {
          BEAMS2.set(c2, (BEAMS2.get(c2) || 0) + n);
        }

      } else {
        BEAMS2.set(c, (BEAMS2.get(c) || 0) + n);
      }

      BEAMS = BEAMS2;
    }
  }

  return [...BEAMS.values()].reduce((sum, c) => sum + c, 0);
};



export const day7 = () => {
  return [p1(), p2()];
};
