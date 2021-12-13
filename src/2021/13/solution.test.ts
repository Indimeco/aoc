import { input } from "./input2";
import { solution, parseInput, foldY, foldX } from "./solution";

test("should work", () => {
  expect(
    parseInput(`6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0`).length
  ).toEqual(18);

  expect(
    foldY(
      parseInput(`6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0`),
      7
    ).length
  ).toEqual(17);

  expect(
    foldX(
      foldY(
        parseInput(`6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0`),
        7
      ),
      5
    ).length
  ).toEqual(16);

  expect(
    foldX(
      parseInput(`0,0
  2,0
  0,1
  0,3
  0,0
 2,3
 
  `),
      1
    ).length
  ).toEqual(3);

  expect(
    foldX(
      parseInput(`0,0
  1,0
  3,0
  0,3
  0,1
 
  `),
      2
    ).length
  ).toEqual(4);

  expect(solution(input)).toEqual(true);
});
