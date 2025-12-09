import { readFileSync } from 'fs';

const rectangles = readFileSync('inputs/9.txt', 'utf8').split('\n')
  .map(line => line.split(',').map(Number));

const maxArea = () => {
  let max = -1;

  for (let i = 0; i < rectangles.length; i++) {
    for (let j = i + 1; j < rectangles.length; j++) {
      const [x1, y1] = rectangles[i];
      const [x2, y2] = rectangles[j];
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)
      if (area > max) {
        max = area;
      }
    }
  }

  return max;
};

export const day9 = () => {
  let p2 = -1;
  let sizes = [];

  for (let i = 0; i < rectangles.length - 1; i++) {
    for (let j = i + 1; j < rectangles.length; j++) {
      const size =
        (Math.abs(rectangles[i][0] - rectangles[j][0]) + 1) *
        (Math.abs(rectangles[i][1] - rectangles[j][1]) + 1);
      sizes.push({
        coords: { i, j },
        range: [
          Math.min(rectangles[i][0], rectangles[j][0]),
          Math.max(rectangles[i][0], rectangles[j][0]),
          Math.min(rectangles[i][1], rectangles[j][1]),
          Math.max(rectangles[i][1], rectangles[j][1]),
        ],
        size,
      });
    }
  }

  sizes = sizes.sort((a, b) => b.size - a.size);

  for (const ch of sizes) {
    let found = true;
    for (let i = 0; i < rectangles.length; i++) {
      const j = i === rectangles.length - 1 ? 0 : i + 1;
      // check if dot is within rectangle
      if (
        rectangles[i][0] > ch.range[0] &&
        rectangles[i][0] < ch.range[1] &&
        rectangles[i][1] > ch.range[2] &&
        rectangles[i][1] < ch.range[3]
      ) {
        found = false;
        break;
      }
      // check if line is passing though range
      // x coord
      if (
        Math.min(rectangles[i][0], rectangles[j][0]) <= ch.range[0] &&
        Math.max(rectangles[i][0], rectangles[j][0]) >= ch.range[1] &&
        rectangles[i][1] > ch.range[2] &&
        rectangles[i][1] < ch.range[3] &&
        rectangles[j][1] > ch.range[2] &&
        rectangles[j][1] < ch.range[3]
      ) {
        found = false;
        break;
      }
      // y coord
      if (
        Math.min(rectangles[i][1], rectangles[j][1]) <= ch.range[2] &&
        Math.max(rectangles[i][1], rectangles[j][1]) >= ch.range[3] &&
        rectangles[i][0] > ch.range[0] &&
        rectangles[i][0] < ch.range[1] &&
        rectangles[j][0] > ch.range[0] &&
        rectangles[j][0] < ch.range[1]
      ) {
        found = false;
        break;
      }
    }

    if (found) {
      p2 = ch.size;
      break;
    }
  }

  return [maxArea(), p2];
};
