import { getIntersectionSemigroup } from "fp-ts/lib/ReadonlyRecord";
import { sum } from "../../2021/15/solution";

export const parseInput = (i: string): string[] =>
  i.split("\n").map((x) => x.split(" "));

const rock = {
  id: "X",
  score: 1,
  beats: "C",
  beatBy: "B",
};
const paper = {
  id: "Y",
  score: 2,
  beats: "A",
  beatBy: "C",
};
const scissors = {
  id: "Z",
  score: 3,
  beats: "B",
  beatBy: "A",
};

const moves = [rock, paper, scissors];

const scores = {
  loss: 0,
  draw: 3,
  won: 6,
};

const getScore = ([opponent, reaction]): number => {
  const a = moves.find((a) => a.id === reaction);
  const victory = a?.beats === opponent ? scores.won : 0;
  const lossOrDraw =
    a?.beatBy === opponent ? scores.loss : victory ? 0 : scores.draw;

  const total = a?.score + victory + lossOrDraw;
  console.log({ opponent, reaction, total, victory });
  return total;
};

export const solution = (inp: string[]): number => {
  const scores = inp.map((a) => getScore(a));
  console.log(scores);
  return sum(scores);
};

const p2 = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const getMove = ([oppon, d]) => {
  const desiredOutcome = p2[d];
  switch (desiredOutcome) {
    case "lose":
      return [oppon, moves.find((a) => a.beatBy === oppon).id];
    case "draw":
      return [
        oppon,
        moves.find((a) => a.beatBy !== oppon && a.beats !== oppon).id,
      ];
    case "win":
      return [oppon, moves.find((a) => a.beats === oppon).id];
  }
};

export const solution2 = (inp: string[]): number => {
  const moves = inp.map((a) => getMove(a));
  const scores = moves.map((b) => getScore(b));
  return sum(scores);
};
