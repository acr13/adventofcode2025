import { readFileSync } from 'fs';

const map: Record<string, string[]> = {};
readFileSync('inputs/11.txt', 'utf8').split('\n')
  .forEach(line => {
    const [x, ys] = line.split(': ');
    const ysArr = ys.split(' ');
    map[x] = ysArr;
  });

const part1 = (x: string): number => {
  if (x === 'out') return 1;

  const moves = map[x].map(y => part1(y));
  return moves.reduce((sum, m) => sum + m, 0);
};

const DP: Record<string, number> = {};

const part2 = (x: string, seenDac: boolean, seenFft: boolean) => {
  if (x === 'out') {
    return (seenDac && seenFft) ? 1 : 0;
  }

  const k = `${x},${!!seenDac},${!!seenFft}`;
  if (k in DP) return DP[k];

  let p2 = 0;
  map[x].forEach(y => {
    const newSeenDac = seenDac || y === 'dac';
    const newSeenFft = seenFft || y === 'fft';
    p2 += part2(y, newSeenDac, newSeenFft);
  });
  DP[k] = p2;
  return p2;
};

export const day11 = () => {
  return [part1('you'), part2('svr', false, false)];
};
