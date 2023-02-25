import { pipe, flow, identity } from "fp-ts/lib/function";
import * as RoA from "fp-ts/lib/ReadonlyNonEmptyArray";
import {
  concat,
  map,
  mapWithIndex,
  ReadonlyNonEmptyArray,
} from "fp-ts/lib/ReadonlyNonEmptyArray";

const getCol = (
  colNum: number,
  nestedArr: RoA.ReadonlyNonEmptyArray<RoA.ReadonlyNonEmptyArray<number>>
): RoA.ReadonlyNonEmptyArray<number> =>
  map((v: RoA.ReadonlyNonEmptyArray<number>) => v[colNum])(nestedArr);

// Part 1
type BingoBoard = RoA.ReadonlyNonEmptyArray<RoA.ReadonlyNonEmptyArray<number>>;
export const doesBoardWin = (
  calledNumbers: ReadonlyNonEmptyArray<number>,
  board: BingoBoard
): boolean => {
  return pipe(
    board,
    concat(
      pipe(
        board.length,
        RoA.makeBy(identity),
        mapWithIndex((i) => getCol(i, board))
      )
    ),
    map(
      flow(
        map((boardPosition) => calledNumbers.includes(boardPosition)),
        (possibleWin) => !possibleWin.some((x) => x === false)
      )
    ),
    (result) => result.includes(true)
  );
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
