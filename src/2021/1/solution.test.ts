import { input } from "./input";
import { solution, sum3 } from "./solution";

test("should work", () => {
  expect(solution([1, 2, 3, 2])).toEqual(2);
  expect(solution([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toEqual(
    7
  );
  expect(solution(input)).toEqual(1466);
});

test("should break array into windows of three", () => {
  expect(sum3([1, 1, 1])).toEqual([3]);
  expect(sum3([1, 1, 1, 1])).toEqual([3, 3]);
  expect(sum3([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toEqual([
    607, 618, 618, 617, 647, 716, 769, 792,
  ]);
});

test("should work for part 2", () => {
  expect(
    solution(sum3([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
  ).toEqual(5);
  expect(solution(sum3(input))).toEqual(1491);
});
