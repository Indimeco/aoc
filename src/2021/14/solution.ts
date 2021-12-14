import { frequency } from "../3/solution";
import { Transform, Readable } from "stream";

export const parseInstructions = (input: string): [string, string][] =>
  // @ts-ignore
  input
    .trim()
    .split("\n")
    .map((x) => x.split("->").map((x) => x.trim()));

export const applyInstruction = async (
  template: string,
  instructions: [string, string][]
) => {
  const insObj = Object.fromEntries(instructions);
  const inStream = new Readable();
  console.log("constructing stream");
  for (let i = 0; i <= template.length; i++) {
    inStream.push(template[i]);
  }
  inStream.push(null);
  console.log("done constructing stream");

  let lastVal: string;
  const insertIns = new Transform({
    transform(chunk, encoding, callback) {
      if (lastVal !== undefined) {
        const pair = lastVal + chunk;
        this.push(insObj[pair] ? insObj[pair] + chunk : chunk);
      }
      if (lastVal === undefined) {
        this.push(chunk);
      }
      lastVal = chunk;

      callback();
    },
  });
  return readableToString(inStream.pipe(insertIns));
};

export const applyInstructionsTimes = async (
  template: string,
  instructions: [string, string][],
  times: number
): Promise<string> => {
  if (times === 0) {
    return template;
  }
  console.log("times remaining: ", times);
  const next = await applyInstruction(template, instructions);
  return applyInstructionsTimes(next, instructions, times - 1);
};

export const maxMinusMin = (str: string) => {
  // @ts-ignore
  const freq = frequency(str);
  const min = Math.min(...freq.map(([key, count]) => count));
  const max = Math.max(...freq.map(([key, count]) => count));

  return max - min;
};

async function readableToString(readable) {
  console.log("reading stream");
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  console.log("done reading stream");
  return result;
}

// const goDo = async () => {
//   console.log(
//     maxMinusMin(
//       await applyInstructionsTimes(
//         template,
//         parseInstructions(instructions),
//         40
//       )
//     )
//   );
// };
// goDo();
