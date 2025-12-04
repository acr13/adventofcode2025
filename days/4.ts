import { readFileSync } from 'fs';

const grid = readFileSync('inputs/4.txt', 'utf8').split('\n')
  .map(line => line.split(''));
const R = grid.length;
const C = grid[0].length;

const adj = (grid, r, c) =>
  [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]
  .map(([rr, cc]) => [rr + r, cc + c])
  .filter(([rr, cc]) => rr >= 0 && rr < R && cc >= 0 && cc < C);

export const day4 = () => {
  let p1 = 0;
  let p2 = 0;
  let valid = [];
  let i = 0;

  do {
    valid.forEach(([rr, cc]) => {
      grid[rr][cc] = 'x';
    });
    valid = []; 

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (grid[r][c] === '@') {
          const n = adj(grid, r, c).filter(([rr, cc]) => grid[rr][cc] === '@').length;
          if (n < 4) {
            valid.push([r, c]);
            if (i === 0) p1++;
          }
        }
      }
    }

    i++;
    p2 += valid.length;
  } while (valid.length > 0)

  return [p1, p2];
};

