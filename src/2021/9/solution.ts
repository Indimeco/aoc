import { number } from "fp-ts";

type HeightMap = number[][];
export const isPit = (num: number, surrounding: number[]) =>
  Math.min(num, ...surrounding) === num && !surrounding.includes(num);

export const adjacents = (
  row: number,
  col: number,
  heightMap: HeightMap
): { row: number; col: number }[] => {
  const colMax = heightMap[0].length - 1;
  const rowMax = heightMap.length - 1;

  const up = { row: row - 1, col };
  const right = { row: row, col: col + 1 };
  const left = { row: row, col: col - 1 };
  const down = { row: row + 1, col: col };

  if (row === 0) {
    if (col === 0) {
      return [right, down];
    }
    if (col === colMax) {
      return [left, down];
    }
    return [left, down, right];
  }
  if (row === rowMax) {
    if (col === 0) {
      return [up, right];
    }
    if (col === colMax) {
      return [up, left];
    }
    return [up, left, right];
  }
  if (col === 0) {
    return [up, down, right];
  }
  if (col === colMax) {
    return [up, down, left];
  }
  return [up, left, right, down];
};
export const possiblePits = (heightMap: HeightMap) =>
  heightMap.map((row, rowIndex) =>
    row.map((num, colIndex) => {
      const adj = adjacents(rowIndex, colIndex, heightMap);

      return {
        num,
        adj: adj.map(({ row, col }) => {
          if (heightMap[row][col] === undefined) {
            console.log({ rowIndex, colIndex, adj, num });
          }
          return heightMap[row][col];
        }),
      };
    })
  );

export const solution = (input: number[]) => {
  const heightMap = input.map((row) => String(row).split("").map(Number));

  return possiblePits(heightMap)
    .flat()
    .map(({ num, adj }) => (isPit(num, adj) ? num : null))
    .filter((x) => x !== null)
    .reduce((acc, cur) => acc + cur + 1, 0);
};

export const solution2 = (input: string[]) => {
  const heightMap = input.map((row) => String(row).split("").map(Number));

  const basins = [];
  const blacklist = [];

  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[0].length; col++) {
      const position = { row, col };
      if (blacklist.findIndex((a) => a.col === col && a.row === row) === -1) {
        const value = heightMap[row][col];
        if (value === 9) {
          blacklist.push(position);
          continue;
        }
        const basin = recursiveAdjacents(
          heightMap,
          [{ row, col }],
          [{ row, col }]
        );
        basins.push(basin);
        blacklist.push(...basin);
      }
    }
  }

  const lengths = basins.map((basin) => basin.length);
  // This is a hack and won't work if there are more than 2 of the same length
  const max1 = Math.max(...lengths);
  const max2 = Math.max(
    ...lengths.filter((a, index) => index !== lengths.indexOf(max1))
  );
  const max3 = Math.max(
    ...lengths.filter(
      (a, index) =>
        index !== lengths.indexOf(max1) && index !== lengths.indexOf(max2)
    )
  );
  return max1 * max2 * max3;
};

export const recursiveAdjacents = (
  heightMap: HeightMap,
  toFind: { row: number; col: number }[] = [],
  accumulatedAdjacents: { row: number; col: number }[] = []
): { row: number; col: number }[] => {
  if (toFind.length === 0) return accumulatedAdjacents;

  const adj = toFind
    .flatMap(({ row, col }) => adjacents(row, col, heightMap))
    .filter(({ row, col }) => heightMap[row][col] !== 9)
    .filter(
      (a) =>
        accumulatedAdjacents.findIndex(
          (x) => x.col === a.col && x.row === a.row
        ) === -1
    );

  const uniqAdj = adj.filter(
    (a, index) =>
      adj.findIndex((x) => x.row === a.row && x.col === a.col) === index
  );

  return recursiveAdjacents(
    heightMap,
    uniqAdj,
    accumulatedAdjacents?.concat(uniqAdj)
  );
};
