import { input, inputBoards, inputCall } from "./input";
import { linePoints, solution, solution2 } from "./solution";

test("should work", () => {
  expect(
    linePoints([
      [1, 1],
      [1, 3],
    ])
  ).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  expect(
    linePoints([
      [1, 3],
      [1, 1],
    ])
  ).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  expect(
    linePoints([
      [9, 7],
      [7, 7],
    ])
  ).toEqual([
    [7, 7],
    [8, 7],
    [9, 7],
  ]);
  expect(
    linePoints([
      [7, 7],
      [9, 7],
    ])
  ).toEqual([
    [7, 7],
    [8, 7],
    [9, 7],
  ]);

  expect(
    solution(
      [
        [
          [0, 9],
          [5, 9],
        ],
        [
          [8, 0],
          [0, 8],
        ],
        [
          [9, 4],
          [3, 4],
        ],
        [
          [2, 2],
          [2, 1],
        ],
        [
          [7, 0],
          [7, 4],
        ],
        [
          [6, 4],
          [2, 0],
        ],
        [
          [0, 9],
          [2, 9],
        ],
        [
          [3, 4],
          [1, 4],
        ],
        [
          [0, 0],
          [8, 8],
        ],
        [
          [5, 5],
          [8, 2],
        ],
      ],
      false
    )
  ).toEqual(5);

  // expect(solution(input)).toEqual(5084);
});

test("part 2 should work", () => {
  expect(
    linePoints(
      [
        [1, 1],
        [3, 3],
      ],
      true
    )
  ).toEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);

  expect(
    solution2(
      [
        [
          [0, 9],
          [5, 9],
        ],
        [
          [8, 0],
          [0, 8],
        ],
        [
          [9, 4],
          [3, 4],
        ],
        [
          [2, 2],
          [2, 1],
        ],
        [
          [7, 0],
          [7, 4],
        ],
        [
          [6, 4],
          [2, 0],
        ],
        [
          [0, 9],
          [2, 9],
        ],
        [
          [3, 4],
          [1, 4],
        ],
        [
          [0, 0],
          [8, 8],
        ],
        [
          [5, 5],
          [8, 2],
        ],
      ],
      true
    )
  ).toEqual(12);

  // expect(solution2(input)).toEqual(17882);
});
