export const fuelCost = (positions: number[], toPosition: number): number => {
  return positions
    .map((x) => Math.abs(x - toPosition))
    .reduce((acc, cur) => acc + cur, 0);
};

export const solution = (
  positions: number[]
): { cost: number; position: number } => {
  const allPositions = Array.from(new Set(positions));
  const allCosts = allPositions.map((pos) => fuelCost(positions, pos));
  const lowestCost = Math.min(...allCosts);
  return {
    cost: lowestCost,
    position: allPositions[allCosts.indexOf(lowestCost)],
  };
};

export const fuelCostCumulative = (
  positions: number[],
  toPosition: number
): number => {
  return positions
    .map((x) =>
      [...Array.from(Array(Math.abs(x - toPosition) + 1).keys())].reduce(
        (acc, cur) => {
          return acc + cur;
        },
        0
      )
    )
    .reduce((acc, cur) => acc + cur, 0);
};

export const solution2 = (
  positions: number[]
): { cost: number; position: number } => {
  const positionMax = Math.max(...positions);
  const positionMin = Math.min(...positions);

  const allPositions = [];
  for (let i = positionMin; i <= positionMax; i++) {
    allPositions.push(i);
  }

  const allCosts = allPositions.map((pos) =>
    fuelCostCumulative(positions, pos)
  );
  const lowestCost = Math.min(...allCosts);
  return {
    cost: lowestCost,
    position: allPositions[allCosts.indexOf(lowestCost)],
  };
};
