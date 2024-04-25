import { pipe } from 'fp-ts/lib/function';
import { parseLines, readPuzzleInput } from '../../lib';
import { solution, solution2 } from './1';

const sample = `1721
979
366
299
675
1456`;

describe('1', () => {
    it('should find the first two entries that sum to 2020 and multiply them', () => {
        const parsed = parseLines(sample)
        const solved = solution(parsed);
        expect(solved).toEqual(514579);
    })

    it('should find the answer to the input', async () => {
        const input = await readPuzzleInput('./src/2020/1.input');
        const result = pipe(parseLines(input), solution);
        expect(result).toEqual(545379);
    })

    it.only('should find the part2 answer to the sample', async () => {
        const result = pipe(parseLines(sample), solution2);
        expect(result).toEqual(241861950);
    });
})

