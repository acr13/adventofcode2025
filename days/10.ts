import { readFileSync } from 'fs';
import { init } from 'z3-solver/build/node.js';

const input = readFileSync('inputs/10.txt', 'utf8').split('\n');

export const day10 = async () => {
  let p1 = 0;
  let p2 = 0;

  for (const line of input) {
    const parts = line.split(' ');
    const goal = parts.shift().replace('[', '').replace(']', '');
    const joltage = parts.pop();
    const buttons = [...parts];
    const goalNum = goal.split('').reduce((sum, c, idx) => {
      if (c === '#') {
        return sum + 2 ** idx;
      } else {
        return sum;
      }
    }, 0);

    const B = [];
    const NS = [];

    for (const button of buttons) {
      const ns = button.substring(1, button.length - 1).split(',').map(Number);
      NS.push(ns);
      const buttonNum = ns.reduce((sum, n) => sum + 2**n, 0);
      B.push(buttonNum);
    }

    let score = buttons.length;
    const L = 2**score;
    for (let a = 0; a < L; a++) {
      let an = 0;
      let aScore = 0;

      for (let i = 0; i < buttons.length; i++) {
        if ((a >> i) % 2 === 1) {
          an ^= B[i];
          aScore++;
        }
      }

      if (an == goalNum) {
        score = Math.min(score, aScore);
      }
    }
    
    p1 += score;

    const { Context } = await init();
    const { Optimize, Int } = new Context('main');
    const joltages = joltage?.substring(1, joltage.length - 1).split(',').map(Number);
    const solver = new Optimize();
    const variables = [];

    for (let i = 0; i < buttons.length; i++) {
      const value = Int.const(String.fromCodePoint(i + 97));
      solver.add(value.ge(0));
      variables.push(value);
    }

    for (let i = 0; i < joltages.length; i++) {
      let condition = Int.val(0);
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j].includes(i)) condition = condition.add(variables[j]);
      }

      condition = condition.eq(Int.val(joltages[i]));
      solver.add(condition);
    }

    const sum = variables.reduce((a, x) => a.add(x), Int.val(0));
    solver.minimize(sum);
    if ((await solver.check()) == "sat") {
      p2 += parseInt(solver.model().eval(sum).toString());
    }
  }
  

  return [p1, p2];
};
