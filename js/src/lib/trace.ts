export const trace = (message: string) => <T>(thing: T): T => {
    console.log(message, thing);
    return thing;
}
