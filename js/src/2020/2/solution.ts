import { array, nonEmptyArray, option } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import { trace } from "../../lib";
import { Option } from "fp-ts/lib/Option";
import { max } from "fp-ts/lib/ReadonlyNonEmptyArray";

type PasswordPolicy = { min: number, max: number, char: string, password: string };

function passwordIsValid({ min, max, char, password }: PasswordPolicy): boolean {
    const count = password.length - password.replaceAll(char, '').length;
    return count >= min && count <= max;
}

function parsePolicy(input: string): Option<PasswordPolicy> {
    const match = input.match(/(\d+)\-(\d+) (\w): (\w+)/);
    if (!match) return option.none;
    const [_, min, max, char, password] = match;
    return option.of({ min: Number(min), max: Number(max), char, password });
}

const validatePasswords = (strategy: (p: PasswordPolicy) => boolean) => flow(parsePolicy, option.chain(option.fromPredicate(strategy)));

export function solution1(input: string[]): number {
    return pipe(
        input,
        array.map(validatePasswords(passwordIsValid)),
        array.filter(option.isSome),
        (a) => a.length
    )
}

function passwordIsValid2({ min, max, char, password }: PasswordPolicy): boolean {
    const atMin = password[min - 1] === char;
    const atMax = password[max - 1] === char;
    return (atMin || atMax) && !(atMin && atMax)
}

export function solution2(input: string[]) {
    return pipe(
        input,
        array.map(validatePasswords(passwordIsValid2)),
        array.filter(option.isSome),
        (a) => a.length
    )
}

