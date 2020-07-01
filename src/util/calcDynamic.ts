export type CalcDynamicOps = {
    '+': () => number
    '-': () => number
}

export const calcDynamic = (operator: keyof CalcDynamicOps, index: number) => {
    const ops: CalcDynamicOps = {
        '+': (): number => index + 1,
        '-': (): number => index - 1,
    };

    return ops[operator]();
};