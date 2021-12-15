export const adjacents = (
  row: number,
  col: number,
  map: number[][]
): { row: number; col: number }[] => {
  const colMax = map[0].length - 1;
  const rowMax = map.length - 1;

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

type Coord = { row: number; col: number };
const hasSamePosition = (first: Coord, second: Coord) =>
  first.row === second.row && first.col === second.col;

function aStarReconstructPath(
  node: AStarMeta,
  nodeList: AStarMeta[] = []
): Coord[] {
  if (!node.parent) {
    // console.log(nodeList);
    return nodeList?.map((node) => node.position).reverse();
  }
  return aStarReconstructPath(node.parent, [...nodeList, node]);
}

type AStarMeta = {
  position: { row: number; col: number };
  value: number;
  f: number;
  h: number;
  g: number;
  parent: AStarMeta | null;
};
// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
export function aStar(
  grid: number[][],
  start: Coord,
  goal: Coord,
  h: (current: AStarMeta, goal: Coord) => number
) {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  const openSet: AStarMeta[] = [
    {
      value: grid[start.row][start.col],
      // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
      // how short a path from start to finish can be if it goes through n.
      f: 0,
      // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
      g: 0,
      h: 0,
      parent: null,
      position: start,
    },
  ];
  const closedSet: AStarMeta[] = [];

  while (openSet.length !== 0) {
    // Grab the lowest f(x) to process next
    const minF = Math.min(...openSet.map((x) => x.f));
    const currentIndex = openSet.findIndex((node) => node.f === minF);
    const current = openSet[currentIndex];

    if (hasSamePosition(current.position, goal)) {
      console.log("goal reached! constructing path...");
      return aStarReconstructPath(current);
    }

    openSet.splice(currentIndex, 1);
    closedSet.push(current);
    const adjPositions = adjacents(
      current.position.row,
      current.position.col,
      grid
    );
    adjPositions.forEach((adjPosition) => {
      if (
        // node has already been processed
        closedSet.findIndex((node) =>
          hasSamePosition(node.position, adjPosition)
        ) !== -1
      ) {
        return;
      }

      const existingNode = openSet.find((node) =>
        hasSamePosition(node.position, adjPosition)
      );
      const newNode: AStarMeta = {
        value: grid[adjPosition.row][adjPosition.col],
        // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
        // how short a path from start to finish can be if it goes through n.
        f: 0,
        // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
        g: current.g + grid[adjPosition.row][adjPosition.col],
        h: 0,
        parent: current,
        position: adjPosition,
      };
      const fScore = newNode.g + h(newNode, goal);
      if (!existingNode) {
        // first occurrence
        newNode.h = h(newNode, goal);
        openSet.push(newNode);
      }

      if (!existingNode || fScore > existingNode.f) {
        // This path to neighbor is better than any previous one. Record it!
        newNode.parent = current;
        newNode.f = newNode.g + h(newNode, goal);
        return;
      }
    });
  }

  // Open set is empty but goal was never reached
  throw new Error("Never reached goal");
}

export const solution = (input: string, part2?: boolean) => {
  const grid = part2 ? constructFullGrid(parseInput(input)) : parseInput(input);
  const h = (current: AStarMeta, goal: Coord): number => {
    // i dont need anything, only the g score to include the total sum cost
    return 0;
  };

  const resultingPath = aStar(
    grid,
    { row: 0, col: 0 },
    { col: grid.length - 1, row: grid[0].length - 1 },
    h
  );
  pathVisualizer(resultingPath, grid);

  const pathRisk = sum(getPathVals(resultingPath, grid));
  return pathRisk;
};

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((x) => x.split("").map(Number));

export const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);

const pathVisualizer = (
  path: { row: number; col: number }[],
  map: number[][]
): void => {
  const lastPath = path[path.length - 1];
  process.stdout.write("\n\n\n");
  process.stdout.write(
    map
      .map((a, rowIndex) =>
        a
          .map((val, colIndex) =>
            path.findIndex((x) => x.row === rowIndex && x.col === colIndex) !==
            -1
              ? rowIndex === lastPath.row && colIndex === lastPath.col
                ? "O"
                : "X"
              : "-"
          )
          .join(" ")
      )
      .join("\n")
  );
  process.stdout.write("\n\n\n");
};

const getPathVals = (
  path: { row: number; col: number }[],
  map: number[][]
): number[] => path.map(({ row, col }) => map[row][col]);

export const constructFullGrid = (grid: number[][]): number[][] => {
  const nextRow = (arr: number[], num: number) =>
    arr.map((n) => (n + num > 9 ? (n + num) % 9 : n + num));
  const transDown = (arr: number[][], num: number) =>
    arr.map((row) => nextRow(row, num));
  let newRows = grid;
  let lastTile;
  for (let i = 1; i < 5; i++) {
    lastTile = grid.map((row) => nextRow(row, i));
    newRows = newRows.map((r, index) => r.concat(lastTile[index]));
  }
  let newGrid = newRows;
  for (let y = 1; y < 5; y++) {
    newGrid = newGrid.concat(transDown(newRows, y));
  }
  return newGrid;
};
