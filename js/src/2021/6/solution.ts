import { reduce } from "fp-ts/lib/ReadonlyArray";
import { input } from "./input";

type fishes = number[];

const FISH_BABY = 8;
const FISH_NEW_MOTHER = 6;
export const day = reduce(
  [],
  (acc: fishes, cur: number): fishes =>
    cur - 1 === -1
      ? acc.concat([FISH_NEW_MOTHER, FISH_BABY])
      : acc.concat([cur - 1])
);

export const solution = (
  initialFishes: fishes,
  daysRemaining: number
): number => {
  console.log("---");
  console.log("DAYS REMAINING: ", daysRemaining);
  console.log("FISH COUNT:", initialFishes.length);
  if (daysRemaining === 0) return initialFishes.length;
  const nextDay = day(initialFishes);
  return solution(nextDay, daysRemaining - 1);
};

const FISH_NEW_BREEDER_RATE = 9;
const FISH_AGED_BREEDER_RATE = 7;

export const fishOverDays = (fishTimer: number, days: number): number => {
  const breedingDays = days - fishTimer;
  if (breedingDays <= 0) return 1;

  const cohorts: Record<string, number> = { "-9": 1 };
  for (let day = 0; day < breedingDays; day++) {
    const dobs = Object.keys(cohorts);
    dobs.forEach((dob) => {
      const daysOld = day - Number(dob);
      const isNewBreeder = daysOld === FISH_NEW_BREEDER_RATE;
      const isAgedBreeder =
        (daysOld - FISH_NEW_BREEDER_RATE) % FISH_AGED_BREEDER_RATE === 0 &&
        daysOld >= FISH_NEW_BREEDER_RATE + FISH_AGED_BREEDER_RATE;

      if (isNewBreeder) {
        cohorts[day] = (cohorts[day] ?? 0) + cohorts[dob];
      }
      if (isAgedBreeder) {
        cohorts[day] = (cohorts[day] ?? 0) + cohorts[dob];
      }
    });
  }
  return Object.values(cohorts).reduce((acc, size) => acc + size, 0);
};

export const solutionAlternative = (
  initialFishes: fishes,
  days: number
): number => {
  return initialFishes.reduce((acc, currentFish, index) => {
    // console.log(
    //   "Progress: ",
    //   Math.round((index / initialFishes.length) * 100),
    //   "%"
    // );
    return acc + fishOverDays(currentFish, days);
  }, 0);
};
