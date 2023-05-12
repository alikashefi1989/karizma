const strengthCalculator = (initNumber: number, numberInOperation: number, countOfTimes: number): {
    number: number,
    count: number,
    result: number
} => {
    if (numberInOperation < 10) return {
        number: initNumber,
        count: countOfTimes,
        result: numberInOperation,
    }
    return strengthCalculator(initNumber, multiplyTheDigitsOfNumber(Number(numberInOperation)), (countOfTimes + 1))
}

export default strengthCalculator;

const multiplyTheDigitsOfNumber = (number: number): number => {
    if (number < 10) return number;
    const digits: Array<number> = number.toString().split('').map((digit: string) => { return Number(digit) });
    if (digits.includes(0)) return 0;
    return digits.reduce((previousValue: number, currentValue: number) => previousValue * currentValue);
}