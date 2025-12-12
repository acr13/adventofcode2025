import { readFileSync } from 'fs';

const input = readFileSync('inputs/12.txt', 'utf8').split('\n\n');
const SIZES: Record<string, number> = {};
  
export const day12 = () => {
  let p1 = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if (i < input.length - 1) {
      const parts = line.split('\n');
      const name = Number(parts[0].replaceAll(':', ''));
      let size = 0;
    
      for (let r = 1; r < parts.length; r++) {
        const cs = parts[r].split('');
        for (let c = 0; c < cs.length; c++) {
          if (cs[c] === '#') {
            size++;
          }
        }
      }

      SIZES[name] = size;
    } else {
      const regions = line.split('\n');
      for (const region of regions) {
        const [sz, ns] = region.split(': ')
        const [R, C] = sz.split('x').map(Number);
        const numbers = ns.split(' ').map(Number)
        const presentSize = numbers.reduce((sum, n, idx) => sum + (n * SIZES[idx]), 0);
        const gridSize = R * C;
        
        // 70% ???
        if (presentSize * 1.3 < gridSize) p1++;
      }
    }
  }

  return [p1]
};