export const parseInput = (input: string) =>
  input
    .split(`\n`)
    .filter((x) => x !== "")
    .map((i) => i.split(",").map((n) => Number(n)))
    .filter(([x, y]) => x >= 0 && y >= 0);

type coords = [number, number][];
export const foldY = (coords: coords, fold: number) => {
  const bottom = coords.filter(([x, y]) => y > fold);
  const top = coords.filter(([x, y]) => y < fold);

  const max = Math.max(...coords.map(([x, y]) => y));

  const folded = [...top, ...bottom.map(([x, y]) => [x, Math.abs(y - max)])];
  return folded.filter(
    (coord, index) =>
      folded.findIndex(([x, y]) => x === coord[0] && y === coord[1]) === index
  );
};

export const foldX = (coords: coords, fold: number) => {
  const left = coords.filter(([x, y]) => x < fold);
  const right = coords.filter(([x, y]) => x > fold);
  const max = Math.max(...coords.map(([x, y]) => x));

  const folded = [...left, ...right.map(([x, y]) => [Math.abs(x - max), y])];
  const u = folded.filter(
    (coord, index) =>
      folded.findIndex(([x, y]) => x === coord[0] && y === coord[1]) === index
  );
  return u;
};

export const visualise = (coords: coords) => {
  const row = Math.max(...coords.map(([x, y]) => x));
  const col = Math.max(...coords.map(([x, y]) => y));
  console.log({ row, col });
  const grid = Array.from(Array(col + 1))
    .fill([])
    .map(() => Array.from(Array(row + 1)).fill("_"));
  coords.forEach(([x, y]) => {
    grid[y][x] = "#";
  });
  console.log(grid);
};

export const solution = (i: coords) => foldX(i, 655).length;
