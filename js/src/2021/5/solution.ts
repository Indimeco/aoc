type point = [x: number, y: number];
export const linePoints = (
  [start, end]: [point, point],
  diagonals: boolean = false
): point[] => {
  const x1 = start[0];
  const x2 = end[0];
  const y1 = start[1];
  const y2 = end[1];

  const lineDirection: "vertical" | "horizontal" | "diagonal" =
    x1 - x2 === 0 ? "vertical" : y1 - y2 === 0 ? "horizontal" : "diagonal";

  const points: number[] = [];

  if (lineDirection === "diagonal") {
    if (!diagonals) {
      return [];
    }

    if (y1 < y2) {
      for (let a = 0; a <= y2 - y1; a++) {
        if (x1 < x2) {
          points.push([x1 + a, y1 + a]);
        } else {
          points.push([x1 - a, y1 + a]);
        }
      }
    } else {
      for (let a = 0; a <= y1 - y2; a++) {
        if (x1 < x2) {
          points.push([x1 + a, y1 - a]);
        } else {
          points.push([x1 - a, y1 - a]);
        }
      }
    }
  }

  if (lineDirection === "vertical") {
    if (y1 < y2) {
      for (let a = y1; a <= y2; a++) {
        points.push(a);
      }
    } else {
      for (let a = y2; a <= y1; a++) {
        points.push(a);
      }
    }
  }
  if (lineDirection === "horizontal") {
    if (x1 < x2) {
      for (let a = x1; a <= x2; a++) {
        points.push(a);
      }
    } else {
      for (let a = x2; a <= x1; a++) {
        points.push(a);
      }
    }
  }

  const result = [
    ...points.map(
      (xOrY): point =>
        lineDirection === "vertical"
          ? [x1, xOrY]
          : lineDirection === "horizontal"
          ? [xOrY, y1]
          : xOrY
    ),
  ];
  return result;
};

export const solution = (lines: [point, point][]): number => {
  const allLinePoints = lines.map((line) => linePoints(line, false)).flat();
  const dupes: point[] = [];
  for (let i = 0; i < allLinePoints.length; i++) {
    if (
      allLinePoints.filter(
        ([x, y]) => x === allLinePoints[i][0] && y === allLinePoints[i][1]
      ).length > 1 &&
      dupes.filter(
        ([x, y]) => x === allLinePoints[i][0] && y === allLinePoints[i][1]
      ).length === 0
    ) {
      dupes.push(allLinePoints[i]);
    }
  }
  return dupes.length;
};

export const solution2 = (lines: [point, point][]): number => {
  const allLinePoints = lines.map((line) => linePoints(line, true)).flat();
  const dupes: point[] = [];
  for (let i = 0; i < allLinePoints.length; i++) {
    if (
      allLinePoints.filter(
        ([x, y]) => x === allLinePoints[i][0] && y === allLinePoints[i][1]
      ).length > 1 &&
      dupes.filter(
        ([x, y]) => x === allLinePoints[i][0] && y === allLinePoints[i][1]
      ).length === 0
    ) {
      dupes.push(allLinePoints[i]);
    }
  }
  return dupes.length;
};
