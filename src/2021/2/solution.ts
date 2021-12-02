type directions = "forward" | "down" | "up";
export type input = { direction: directions; count: number };

export const solution = (input: input[]): number => {
  const result = input.reduce(reducer, { horizontal: 0, depth: 0 });
  return result.depth * result.horizontal;
};

type accumulator = { horizontal: number; depth: number };
const reducer = (
  previousValue: accumulator,
  currentValue: input
): accumulator => {
  switch (currentValue.direction) {
    case "forward":
      return {
        horizontal: currentValue.count + previousValue.horizontal,
        depth: previousValue.depth,
      };
    case "down":
      return {
        horizontal: previousValue.horizontal,
        depth: previousValue.depth + currentValue.count,
      };
    case "up":
      return {
        horizontal: previousValue.horizontal,
        depth: previousValue.depth - currentValue.count,
      };
    default:
      throw new Error("No direction");
  }
};

export const solution2 = (input: input[]): number => {
  const result = input.reduce(reducer2, { horizontal: 0, depth: 0, aim: 0 });
  return result.horizontal * result.depth;
};

type accumulator2 = { horizontal: number; depth: number; aim: number };
const reducer2 = (
  previousValue: accumulator2,
  currentValue: input
): accumulator2 => {
  switch (currentValue.direction) {
    case "forward":
      return {
        horizontal: currentValue.count + previousValue.horizontal,
        depth: previousValue.depth + previousValue.aim * currentValue.count,
        aim: previousValue.aim,
      };
    case "down":
      return {
        horizontal: previousValue.horizontal,
        depth: previousValue.depth,
        aim: previousValue.aim + currentValue.count,
      };
    case "up":
      return {
        horizontal: previousValue.horizontal,
        depth: previousValue.depth,
        aim: previousValue.aim - currentValue.count,
      };
    default:
      throw new Error("No direction");
  }
};
