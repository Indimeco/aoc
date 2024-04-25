import { flow, pipe } from "fp-ts/lib/function";
import { filter } from "fp-ts/lib/ReadonlyArray";
import { map, ReadonlyNonEmptyArray } from "fp-ts/lib/ReadonlyNonEmptyArray";
import { split } from "fp-ts/lib/string";

export const parseInputToEntries = (
  input: string
): ReadonlyNonEmptyArray<Entry> => pipe(input, split("\n"), map(parseEntry));

type Entry = { min: number; max: number; target: string; data: string };
export const parseEntry = (entry: string): Entry => {
  const [_, min, max, target, data] =
    entry.match(/(\d+)\-(\d+)\s(\w)\:\s(.*)/) || [];
  return {
    min: Number(min),
    max: Number(max),
    target,
    data,
  };
};

const countTrue = flow(
  filter((a) => a === true),
  (arr) => arr.length
);

export const isValidOldTobogganEntry = (entry: Entry): boolean =>
  pipe(
    [...entry.data.matchAll(new RegExp(entry.target, "g"))].length,
    (matches) => matches >= entry.min && matches <= entry.max
  );

export const countOldTobogganPasswords = flow(
  parseInputToEntries,
  map(isValidOldTobogganEntry),
  countTrue
);

export const isValidCorporateTobogganEntry = (entry: Entry): boolean =>
  pipe([...entry.data], (arr) =>
    arr[entry.min - 1] === entry.target
      ? arr[entry.max - 1] !== entry.target
      : arr[entry.max - 1] === entry.target
  );

export const countValidCorporatePasswords = flow(
  parseInputToEntries,
  map(isValidCorporateTobogganEntry),
  countTrue
);
