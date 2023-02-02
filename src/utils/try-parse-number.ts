export const tryParseNumber = (number?: string) => {
    if(!number) return null
    return Number(number)
}