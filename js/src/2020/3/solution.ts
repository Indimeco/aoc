import { array, nonEmptyArray } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { trace } from "../../lib";

const hasTree = (treeline: string) => (index: number): boolean => {
    // special case for skipping row
    if (index === -1) return false;

    const patternedIndex = index % treeline.length;
    return treeline[patternedIndex] === '#';
}

const createPatternIndex = (len: number, formula: (i: number) => number): number[] => {
    return pipe(
        len,
        nonEmptyArray.makeBy(formula)
    )
}

function findTreesOnSlope(input: string[], slope: number[]): number {
    return pipe(
        input,
        array.map(hasTree),
        (treeline) => array.zipWith(slope, treeline, (f, s) => s(f)),
        array.filter(x => x === true),
        (a) => a.length
    )
}

export function solution1(input: string[]): number {
    return findTreesOnSlope(input, createPatternIndex(input.length, (i) => i * 3))
}

export function solution2(input: string[]) {
    return pipe(
        [
            createPatternIndex(input.length, (i) => i),
            createPatternIndex(input.length, (i) => i * 3),
            createPatternIndex(input.length, (i) => i * 5),
            createPatternIndex(input.length, (i) => i * 7),
            createPatternIndex(input.length, (i) => i % 2 > 0 ? -1 : i / 2),
        ],
        array.map((slope) => findTreesOnSlope(input, slope)),
        array.reduce(1, (a, b) => a * b)
    )
}
