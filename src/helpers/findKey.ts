function findKey(obj: Record<string, unknown>, value: unknown): string { // sorry for the string
    const keysWithGivenValue = Object.keys(obj).filter(k => JSON.stringify(obj[k]) === JSON.stringify(value))

    const neededKey: string = keysWithGivenValue.length != 0 ? keysWithGivenValue[0] : "nothing"
    return neededKey
}

export { findKey }