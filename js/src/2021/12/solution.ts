import { flow } from "fp-ts/lib/function";
import { map, reduce, filter, some } from "fp-ts/lib/Array";

export const parseCaveMap = flow(
  (input: [string, string][]) =>
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
    ),
  Object.entries,
  map(([key, set]) => [key, Array.from(set)]),
  Object.fromEntries
);

const isSmallCave = (cave: string) =>
  cave.toLowerCase() === cave && cave !== "start";

export const parseInput = flow(
  (input: string) => input.split("\n"),
  map((toFrom: string) => toFrom.trim().split("-") as [string, string])
);

export const pather = (
  currentPath: string[],
  caveMap: Record<string, Array<string>>,
  allPaths: string[][],
  sillyPart2Rule: boolean = false
): string[][] => {
  const currentCave = currentPath[currentPath.length - 1];
  if (currentCave === "end") return [...allPaths, currentPath];
  const pathableCaves = caveMap[currentCave].filter((destination) => {
    if (destination === "start") return false;
    const smallCaveAlreadyVisited =
      isSmallCave(destination) && currentPath.includes(destination);
    if (sillyPart2Rule) {
      return hasVisitedSmallCaveTwice(currentPath)
        ? !smallCaveAlreadyVisited
        : true;
    }
    return !smallCaveAlreadyVisited;
  });
  if (pathableCaves.length < 1) {
    return allPaths;
  }
  return pathableCaves.flatMap((pathable) =>
    pather([...currentPath, pathable], caveMap, allPaths, sillyPart2Rule)
  );
};

export const numPathsCaves = flow(
  parseInput,
  parseCaveMap,
  (caveMap) => pather(["start"], caveMap, []),
  (allPaths) => allPaths.length
);

const hasVisitedSmallCaveTwice = flow(
  map((x: string) => (isSmallCave(x) ? x : null)),
  filter((x): x is string => x !== null),
  reduce<string | number, Record<string, number>>(
    {},
    (accumulator, current) => ({
      ...accumulator,
      [current]: (accumulator[current] ?? 0) + 1,
    })
  ),
  Object.values,
  some((count) => count > 1)
);

export const numPathsCaves2 = flow(
  parseInput,
  parseCaveMap,
  (caveMap) => pather(["start"], caveMap, [], true),
  (allPaths) => allPaths.length
);
