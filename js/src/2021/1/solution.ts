import { reduce, mapWithIndex, filter } from "fp-ts/Array";
import { flow } from "fp-ts/lib/function";

type Solution = (input: number[]) => number;
export const solution: Solution = flow(
  (input) =>
    reduce<number, accumulator>({ num: input[0], count: 0 }, reducer)(input),
  (reduced) => reduced.count
);

type accumulator = { num: number; count: number };
const reducer = (prev: accumulator, current: number) => ({
  num: current,
  count: current > prev.num ? prev.count + 1 : prev.count,
});

export const sum3: (input: number[]) => number[] = flow(
  (input) =>
    mapWithIndex((index: number) => {
      if (input[index - 2] !== undefined)
        return input[index] + input[index - 1] + input[index - 2];
    })(input),
  filter((a: number | undefined): a is number => typeof a === "number")
);
