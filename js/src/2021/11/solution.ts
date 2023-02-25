type OctopusMap = number[][];

export const adjacents = (
  row: number,
  col: number,
  octopusMap: OctopusMap
): { row: number; col: number }[] => {
  const colMax = octopusMap[0].length - 1;
  const rowMax = octopusMap.length - 1;

  const up = { row: row - 1, col };
  const right = { row: row, col: col + 1 };
  const left = { row: row, col: col - 1 };
  const down = { row: row + 1, col: col };
  const upLeft = { row: up.row, col: left.col };
  const downLeft = { row: down.row, col: left.col };
  const upRight = { row: up.row, col: right.col };
  const downRight = { row: down.row, col: right.col };

  if (row === 0) {
    if (col === 0) {
      return [right, down, downRight];
    }
    if (col === colMax) {
      return [left, down, downLeft];
    }
    return [left, down, right, downLeft, downRight];
  }
  if (row === rowMax) {
    if (col === 0) {
      return [up, right, upRight];
    }
    if (col === colMax) {
      return [up, left, upLeft];
    }
    return [up, left, right, upLeft, upRight];
  }
  if (col === 0) {
    return [up, down, right, upRight, downRight];
  }
  if (col === colMax) {
    return [up, down, left, upLeft, downLeft];
  }
  return [up, left, right, down, upLeft, upRight, downLeft, downRight];
};

const transferFlash = (
  m: OctopusMap,
  flashes: number = 0
): [OctopusMap, number] => {
  const flashedMap: OctopusMap = m;
  let toTransfer: { row: number; col: number }[] = [];
  for (let row = 0; row < m.length; row++) {
    for (let col = 0; col < m[0].length; col++) {
      if (m[row][col] > 9) {
        toTransfer = toTransfer.concat(adjacents(row, col, m));
        flashedMap[row][col] = 0;
        flashes = flashes + 1;
      }
      flashedMap[row][col] = m[row][col];
    }
  }
  if (toTransfer.length === 0) {
    // console.log("returning flashes: ", flashes);
    return [m, flashes];
  }
  toTransfer.forEach(({ row, col }) => {
    flashedMap[row][col] =
      flashedMap[row][col] === 0 ? 0 : flashedMap[row][col] + 1;
  });
  return transferFlash(flashedMap, flashes);
};
export const step = (m: OctopusMap): [OctopusMap, number] => {
  // console.log("before step: ", m);
  const r = transferFlash(m.map((row) => row.map((num) => num + 1)));
  return r;
};
const stepper = (
  m: OctopusMap,
  stepsRemaining: number,
  flashes: number
): number => {
  if (stepsRemaining === 0) {
    return flashes;
  }
  const [nextStepMap, nextFlashes] = step(m);
  // console.log(`step ${101 - stepsRemaining}`, nextStepMap);
  return stepper(nextStepMap, stepsRemaining - 1, flashes + nextFlashes);
};
export const fixInput = (input: string[]): OctopusMap =>
  input.map((x) => x.split("").map((x) => Number(x)));
export const unfixInput = (m: OctopusMap): string[] =>
  m.map((row) => row.join(""));

export const solution = (input: string[], steps: number) => {
  return stepper(fixInput(input), steps, 0);
};

export const solution2 = (input: string[]) => {
  return stepper2(fixInput(input), 0);
};

const stepper2 = (m: OctopusMap, stepNumber: number): number => {
  const [nextStepMap, nextFlashes] = step(m);
  if (nextFlashes === m.length * m[0].length) {
    return stepNumber + 1;
  }
  return stepper2(nextStepMap, stepNumber + 1);
};
