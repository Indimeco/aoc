import { strong } from "fp-ts";

export const solution = () => true;

export const parseCaveMap = (
  input: [string, string][]
): Record<string, Array<string>> =>
  Object.fromEntries(
    Object.entries(
      input.reduce(
        (acc: Record<string, Set<string>>, [start, end]: [string, string]) => {
          if (!acc[start]) {
            acc[start] = new Set();
          }
          if (!acc[end]) {
            acc[end] = new Set();
          }
          acc[start].add(end);
          acc[end].add(start);
          return acc;
        },
        {}
      )
    ).map(([key, set]) => [key, Array.from(set)])
  );

const isSmallCave = (cave: string) =>
  cave.toLowerCase() === cave && cave !== "start";

export const parseInput = (input: string): [string, string][] =>
  input.split("\n").map((x) => x.split("-").map((x) => x.trim()));

export const pather = (
  currentPath: string[],
  caveMap: Record<string, Array<string>>,
  allPaths: string[][]
): string[][] => {
  const currentCave = currentPath[currentPath.length - 1];
  if (currentCave === "end") return [...allPaths, currentPath];
  const pathableCaves = caveMap[currentCave].filter(
    (destination) =>
      destination !== "start" &&
      !(isSmallCave(destination) && currentPath.includes(destination))
  );
  if (pathableCaves.length < 1) {
    return allPaths;
  }
  return pathableCaves.flatMap((pathable) =>
    pather([...currentPath, pathable], caveMap, allPaths)
  );
};

export const numPathsCaves = (input: string) => {
  const map = parseCaveMap(parseInput(input));
  const paths = pather(["start"], map, []);
  return paths.length;
};

const hasVisitedSmallCaveTwice = (path: string[]) =>
  Object.values(
    path
      .map((a) => (isSmallCave(a) ? a : null))
      .reduce((acc, cur) => {
        if (cur == null) return acc;
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {})
  ).some((val) => val > 1);

export const pather2 = (
  currentPath: string[],
  caveMap: Record<string, Array<string>>,
  allPaths: string[][]
): string[][] => {
  const currentCave = currentPath[currentPath.length - 1];
  if (currentCave === "end") return [...allPaths, currentPath];

  const pathableCaves = caveMap[currentCave].filter(
    (destination) =>
      destination !== "start" &&
      (hasVisitedSmallCaveTwice(currentPath)
        ? !(isSmallCave(destination) && currentPath.includes(destination))
        : true)
  );

  if (pathableCaves.length < 1) {
    return allPaths;
  }
  return pathableCaves.flatMap((pathable) =>
    pather2([...currentPath, pathable], caveMap, allPaths)
  );
};

export const numPathsCaves2 = (input: string) => {
  const map = parseCaveMap(parseInput(input));
  const paths = pather2(["start"], map, []);
  return paths.length;
};
