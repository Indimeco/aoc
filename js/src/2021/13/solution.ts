import { flow, pipe } from "fp-ts/lib/function";

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

  const folded = [...top, ...bottom.map(([x, y]) => [x, y - (y - fold) * 2])];
  const u = folded.filter(
    (coord, index) =>
      folded.findIndex(([x, y]) => x === coord[0] && y === coord[1]) === index
  );

  // process.stdout.write(`\n\n\nfold y ${fold}\n`);
  // visualise(coords);
  // process.stdout.write("\n\n\n\n");
  // visualise(u);
  // process.stdout.write("\n\n\n\n");
  return u;
};

export const foldX = (coords: coords, fold: number) => {
  const left = coords.filter(([x, y]) => x < fold);
  const right = coords.filter(([x, y]) => x > fold);

  const folded = [...left, ...right.map(([x, y]) => [x - (x - fold) * 2, y])];
  const u = folded.filter(
    (coord, index) =>
      folded.findIndex(([x, y]) => x === coord[0] && y === coord[1]) === index
  );

  // process.stdout.write(`\n\n\nfold x ${fold}\n`);
  // visualise(coords);
  // process.stdout.write("\n\n\n\n");
  // visualise(u);
  // process.stdout.write("\n\n\n\n");
  return u;
};

export const visualise = (coords: coords) => {
  const row = Math.max(...coords.map(([x, y]) => x));
  const col = Math.max(...coords.map(([x, y]) => y));
  const grid = Array.from(Array(col + 1))
    .fill([])
    .map(() => Array.from(Array(row + 1)).fill("_"));
  coords.forEach(([x, y]) => {
    grid[y][x] = "#";
  });
  process.stdout.write("\n\n\n");
  process.stdout.write(grid.map((a) => a.join(" ")).join("\n"));
  process.stdout.write("\n\n\n");
};

export const solution2 = (i: coords) =>
  pipe(
    i,
    (a) => foldX(a, 655),
    (a) => foldY(a, 447),
    (a) => foldX(a, 327),
    (a) => foldY(a, 223),
    (a) => foldX(a, 163),
    (a) => foldY(a, 111),
    (a) => foldX(a, 81),
    (a) => foldY(a, 55),
    (a) => foldX(a, 40),
    (a) => foldY(a, 27),
    (a) => foldY(a, 13),
    (a) => foldY(a, 6),
    visualise
  );

export const solution = (i: coords) => foldX(i, 655).length;
