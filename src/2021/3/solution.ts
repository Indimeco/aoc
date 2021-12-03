import { map, reduce, reduceWithIndex } from "fp-ts/lib/Array";
import { flow, pipe } from "fp-ts/lib/function";

const binaryToDec = (input: string) => parseInt(input, 2);

type frequencyAccumulator = Record<string, number>;
type frequencyResultant = [string, number][];
const frequency: (arr: number[]) => frequencyResultant = flow(
  reduce<string | number, frequencyAccumulator>({}, (accumulator, current) => ({
    ...accumulator,
    [current]: (accumulator[current] ?? 0) + 1,
  })),
  Object.entries
);

const mode = (arr: number[], def: number = 0): number =>
  pipe(
    frequency(arr),
    reduce<[string, number], [string, number]>(
      ["", -Infinity],
      ([accNum, accFreq], [num, freq]) => {
        if (freq > accFreq) return [num, freq];
        if (freq === accFreq) return [String(def), freq];
        return [accNum, accFreq];
      }
    ),
    ([num]) => Number(num)
  );

const antimode = (arr: number[], def: number = 0): number =>
  pipe(
    frequency(arr),
    reduce<[string, number], [string, number]>(
      ["", Infinity],
      ([accNum, accFreq], [num, freq]) => {
        if (freq < accFreq) return [num, freq];
        if (freq === accFreq) return [String(def), freq];
        return [accNum, accFreq];
      }
    ),
    ([num]) => Number(num)
  );

const getCol = (index: number, arr: string[]): number[] =>
  map<string, number>((v) => Number(v[index]))(arr);

// Main
export type input = string[];
type Solution = (input: input) => number;

// Part 1
export const solution: Solution = (input) =>
  gammaSolution(input) * epsilonSolution(input);

export const gammaSolution = flow(
  (input: input) => [...Array(input[0].length)].map((v, i) => getCol(i, input)),
  map(mode),
  (modes) => modes.join(""),
  binaryToDec
);

export const epsilonSolution = flow(
  (input: input) => [...Array(input[0].length)].map((v, i) => getCol(i, input)),
  map(antimode),
  (modes) => modes.join(""),
  binaryToDec
);

// Part 2
export const solution2: Solution = (input) =>
  oxygenSolution(input) * co2Solution(input);

export const oxygenSolution = (input: input) =>
  pipe(
    [...Array(input[0].length)],
    reduceWithIndex<any, string[]>(input, (index, accumulator) =>
      pipe(mode(getCol(index, accumulator), 1), (m) =>
        accumulator.filter((x) => x[index] === String(m))
      )
    ),
    ([head]) => head,
    binaryToDec
  );

export const co2Solution = (input: input) =>
  pipe(
    [...Array(input[0].length)],
    reduceWithIndex<any, string[]>(input, (index, accumulator) =>
      pipe(antimode(getCol(index, accumulator), 0), (m) =>
        accumulator.filter((x) => x[index] === String(m))
      )
    ),
    ([head]) => head,
    binaryToDec
  );
