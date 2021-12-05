import { boolean } from "fp-ts";
import { map, reduce, reduceWithIndex } from "fp-ts/lib/Array";
import { flow, pipe } from "fp-ts/lib/function";
import { findIndex } from "fp-ts/lib/ReadonlyArray";

type Solution = (called: number[], boards: number[][]) => number;

const getCol = (index: number, nestedArr: any[]) =>
  nestedArr.map((v) => v[index]);
// Part 1
export const doesBoardWin = (called: number[], board: number[][]): boolean => {
  const boardIncCols = [...board, ...board.map((v, i) => getCol(i, board))];
  const results = boardIncCols.map((possibleWin) => {
    if (
      possibleWin.map((num) => called.includes(num)).filter((x) => x === false)
        .length === 0
    ) {
      return true;
    }
    return false;
  });
  return results.includes(true);
};
export const getWinningBoard = (
  called: number[],
  boards: number[][][]
): number => {
  const acc: number[] = [];
  for (let i = 0; i < called.length; i++) {
    acc.push(called[i]);
    for (let y = 0; y < boards.length; y++) {
      if (doesBoardWin(acc, boards[y])) {
        return {
          winningBoard: y,
          winningNumber: acc[acc.length - 1],
          called: acc,
        };
      }
    }
  }
  return { winningBoard: null, winningNumber: null };
};

export const unmarkedSum = (called: number[], board: number[][]) =>
  board
    .flat()
    .filter((i) => called.indexOf(i) === -1)
    .reduce((prev, curr) => prev + curr, 0);

export const solution = (toCall: number[], boards: number[][][]): number => {
  const { winningBoard, winningNumber, called } = getWinningBoard(
    toCall,
    boards
  );
  return unmarkedSum(called, boards[winningBoard]) * winningNumber;
};

// part 2
export const getLosingBoard = (
  called: number[],
  boards: number[][][]
): number => {
  const acc: number[] = [];
  let slowestWinner = { winningBoard: null, winningNumber: null };
  const previousWinners: number[] = [];
  for (let i = 0; previousWinners.length < boards.length; i++) {
    acc.push(called[i]);
    for (let y = 0; y < boards.length; y++) {
      if (
        previousWinners.includes(y) === false &&
        doesBoardWin(acc, boards[y])
      ) {
        previousWinners.push(y);
        slowestWinner = {
          winningBoard: y,
          winningNumber: acc[acc.length - 1],
          called: acc,
        };
      }
    }
  }
  return slowestWinner;
};

export const solution2 = (toCall: number[], boards: number[][][]): number => {
  const { winningBoard, winningNumber, called } = getLosingBoard(
    toCall,
    boards
  );
  return unmarkedSum(called, boards[winningBoard]) * winningNumber;
};
