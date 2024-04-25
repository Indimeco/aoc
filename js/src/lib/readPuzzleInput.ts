import { readFile } from "fs/promises";
import path from "path";

export const readPuzzleInput = async (path: string): Promise<string> => {
    const result = await readFile(path);
    return result.toString();
};