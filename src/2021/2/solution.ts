import { reduce } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";

type directions = "forward" | "down" | "up";
export type input = { direction: directions; count: number };

type Solution = (input: input[]) => number;
export const solution: Solution = flow(
  reduce<input, accumulator>({ horizontal: 0, depth: 0 }, reducer),
  (result) => result.depth * result.horizontal
);

type accumulator = { horizontal: number; depth: number };
function reducer(previousValue: accumulator, currentValue: input): accumulator {
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
}

export const solution2: Solution = flow(
  reduce<input, accumulator2>({ horizontal: 0, depth: 0, aim: 0 }, reducer2),
  (result) => result.depth * result.horizontal
);

type accumulator2 = { horizontal: number; depth: number; aim: number };
function reducer2(
  previousValue: accumulator2,
  currentValue: input
): accumulator2 {
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
}
