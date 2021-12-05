import { input, inputBoards, inputCall } from "./input";
import {
  solution,
  getWinningBoard,
  unmarkedSum,
  doesBoardWin,
  getLosingBoard,
  solution2,
} from "./solution";

test("should work", () => {
  const called = [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ];

  const boards = [
    [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],

    [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],

    [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
  ];
  expect(doesBoardWin(called, boards[2])).toEqual(true);
  expect(getWinningBoard(called, boards)).toEqual({
    winningBoard: 2,
    winningNumber: 24,
    called: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24],
  });
  expect(
    unmarkedSum([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24], boards[2])
  ).toEqual(188);
  expect(solution(called, boards)).toEqual(4512);

  expect(solution(inputCall, inputBoards)).toEqual(49686);
});

test("part 2 should work", () => {
  const called = [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ];

  const boards = [
    [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],

    [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],

    [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
  ];
  expect(doesBoardWin(called, boards[1])).toEqual(true);
  expect(getLosingBoard(called, boards)).toEqual({
    winningBoard: 1,
    winningNumber: 13,
    called: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13],
  });
  expect(
    unmarkedSum(
      [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13],
      boards[1]
    )
  ).toEqual(148);
  expect(solution2(called, boards)).toEqual(1924);

  expect(solution2(inputCall, inputBoards)).toEqual(26878);
});
