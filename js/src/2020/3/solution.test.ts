import { pipe } from 'fp-ts/lib/function';
import { parseLines, readPuzzleInput } from '../../lib';
import { solution1, solution2 } from './solution';
import path from 'path';

const sample = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
const sample1Answer = 7;
const sample2Answer = 336;
const solution1Answer = 189;
const solution2Answer = 1718180100;
const inputFile = path.resolve(__dirname, './input.txt');

describe('solution1', () => {
    it('should find the answer to the sample', async () => {
        const result = pipe(sample, parseLines, solution1);
        expect(result).toEqual(sample1Answer);
    })

    it('should find the answer to the input', async () => {
        const input = await readPuzzleInput(inputFile);
        const result = pipe(input, parseLines, solution1);
        expect(result).toEqual(solution1Answer);
    })
})

describe('solution2', () => {
    it('should find the answer to the sample', async () => {
        const result = pipe(sample, parseLines, solution2);
        expect(result).toEqual(sample2Answer);
    })

    it('should find the answer to the input', async () => {
        const input = await readPuzzleInput(inputFile);
        const result = pipe(input, parseLines, solution2);
        expect(result).toEqual(solution2Answer);
    })
})
