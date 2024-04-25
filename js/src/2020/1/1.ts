import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/number";

export const solution = (input: string[]): number => {
    return pipe(
        input,
        array.chain(toNumber),
        (arr) => arr.flatMap((x, i) => pipe(
            arrayWithoutIndex(arr, i),
            filter2020Sum(x)
        )),
        ([x, y]) => x * y
    );
}

const toNumber = (x: string | number) => [Number(x)]

const is2020 = (x: number) => Ord.equals(2020, x);

const filter2020Sum = (x: number) => (y: number[]) => y.filter(z => is2020(x + z))

const arrayWithoutIndex = <T>(array: T[], index: number): T[] => [...array.slice(0, index), ...array.slice(index + 1, -1)];

/**
 * attempt one
 */
export const solution2 = (input: string[]): number => {
    return pipe(
        input,
        array.chain(toNumber),
        (arr) => array.reduce([], (acc: number[], x: number) => {
            if (acc.length > 0) return acc;
            const match1 = arr.find((y: number) => arr.find((z: number) => is2020(x + y + z)))
            if (!match1) return [];
            const match2 = arr.find((z: number) => is2020(x + match1 + z))
            if (!match2) return [];
            return [x, match1, match2];
        })(arr),
        array.reduce(1, (acc, cur) => acc * cur)
    );
};