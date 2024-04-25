import { pipe } from 'fp-ts/lib/function';
import { parseLines, readPuzzleInput } from '../../lib';
import { solution1, solution2 } from './solution';
import path from 'path';

const sample = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;
const sample1Answer = 2;
const sample2Answer = 1;
const solution1Answer = 393;
const solution2Answer = 690;
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
