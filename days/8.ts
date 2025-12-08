import { readFileSync } from 'fs';

const boxes = readFileSync('inputs/8.txt', 'utf8')
  .split('\n')
  .map(line => line.split(',').map(Number));

const parse = () => {
  const D = [];

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const d = Math.sqrt(
        Math.pow(boxes[i][0] - boxes[j][0], 2) +
        Math.pow(boxes[i][1] - boxes[j][1], 2) +
        Math.pow(boxes[i][2] - boxes[j][2], 2),
      );
      D.push([d, i, j]);
    }
  }

  D.sort((a, b) => a[0] - b[0]);
  return D;
}

// trying my own Union-Find...
const find = (UF, x) => {
  if (x === UF[x]) {
    return x;
  }

  UF[x] = find(UF, UF[x]);
  return UF[x];
};

const mix = (UF, x, y) => {
  UF[find(UF, x)] = find(UF, y);
};

export const day8 = () => {
  let p1 = -1;
  let p2 = -1;
  const D = parse();
  const UF: Record<number, number> = {};

  for (let i = 0; i < boxes.length; i++) {
    UF[i] = i;
  }

  let connections = 0;
  for (let t = 0; t < D.length; t++) {
    const [_d, i, j] = D[t];

    if (t === 1000) {
      const sizes = new Map();
      
      for (let x = 0; x < boxes.length; x++) {
        const i = find(UF, x);
        if (!sizes.get(i)) sizes.set(i, 0);
        const curr = sizes.get(i);
        sizes.set(i, curr + 1);
      }

      const sorted = [...sizes.values()].sort((a, b) => b - a)
      p1 = sorted[0] * sorted[1] * sorted[2];
    }

    if (find(UF, i) !== find(UF, j)) {
      connections++;
      if (connections === boxes.length - 1) { // no more connections to make
        p2 = boxes[i][0] * boxes[j][0];
      }
      mix(UF, i, j);
    }
  }

  return [p1, p2];
};