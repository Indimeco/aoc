import { input } from "./input";
import {
  solution,
  gammaSolution,
  epsilonSolution,
  oxygenSolution,
  co2Solution,
  solution2,
} from "./solution";

test("should work", () => {
  expect(
    gammaSolution([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(22);

  expect(
    epsilonSolution([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(9);

  expect(
    solution([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(198);

  expect(solution(input)).toEqual(2972336);
});

test("part 2 should work", () => {
  expect(
    oxygenSolution([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(23);

  expect(
    co2Solution([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(10);

  expect(
    solution2([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toEqual(230);

  expect(solution2(input)).toEqual(3368358);
});
